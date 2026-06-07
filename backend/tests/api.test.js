const { spawn } = require("node:child_process");
const path = require("node:path");

const BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";
const ADMIN_USERNAME = process.env.TEST_ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD || "admin123";

let token = "";
let pass = 0;
let fail = 0;
let skip = 0;
let serverProcess = null;
const created = {
  artikelId: null,
  kegiatanId: null,
  faqId: null,
  statistikId: null,
  informasiId: null,
  pimpinanId: null,
  adminId: null,
};

const suffix = Date.now().toString(36);

function log(status, name, detail = "") {
  const line = detail ? `${status} ${name} - ${detail}` : `${status} ${name}`;
  console.log(line);
}

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        ...(options.headers || {}),
      },
    });
    const text = await response.text();
    let body = null;

    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }
    }

    return { response, body };
  } finally {
    clearTimeout(timeout);
  }
}

async function waitForServer() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const { response } = await request("/api/public/faq");
      if (response.status < 500) return;
    } catch {
      // Retry while the local server is starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error("Backend server is not reachable on http://localhost:5000");
}

async function ensureServer() {
  try {
    await request("/api/public/faq");
    return;
  } catch {
    // Start a local server below.
  }

  serverProcess = spawn("node", ["server.js"], {
    cwd: path.join(__dirname, ".."),
    stdio: "ignore",
    windowsHide: true,
  });
  await waitForServer();
}

async function jsonRequest(path, method, data, extraHeaders = {}) {
  return request(path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body: JSON.stringify(data),
  });
}

function authHeaders(extra = {}) {
  return {
    Authorization: `Bearer ${token}`,
    ...extra,
  };
}

async function test(name, fn) {
  try {
    await fn();
    pass += 1;
    log("PASS", name);
  } catch (error) {
    fail += 1;
    log("FAIL", name, error.message);
  }
}

async function optional(name, fn) {
  try {
    const skipped = await fn();
    if (skipped) {
      skip += 1;
      log("SKIP", name, skipped);
      return;
    }
    pass += 1;
    log("PASS", name);
  } catch (error) {
    fail += 1;
    log("FAIL", name, error.message);
  }
}

async function expectStatus(path, expected, options = {}) {
  const { response, body } = await request(path, options);
  expect(response.status === expected, `expected ${expected}, got ${response.status}`);
  return body;
}

async function cleanup() {
  const headers = authHeaders();
  const jobs = [];

  if (created.artikelId) jobs.push(request(`/api/admin/artikel/${created.artikelId}`, { method: "DELETE", headers }));
  if (created.kegiatanId) jobs.push(request(`/api/admin/kegiatan/${created.kegiatanId}`, { method: "DELETE", headers }));
  if (created.faqId) jobs.push(request(`/api/admin/bantuan/${created.faqId}`, { method: "DELETE", headers }));
  if (created.statistikId) jobs.push(request(`/api/admin/statistik/${created.statistikId}`, { method: "DELETE", headers }));
  if (created.informasiId) jobs.push(request(`/api/admin/informasi-universitas/${created.informasiId}`, { method: "DELETE", headers }));
  if (created.pimpinanId) jobs.push(request(`/api/pimpinan/${created.pimpinanId}`, { method: "DELETE", headers }));
  if (created.adminId) jobs.push(request(`/api/admin/manajemen/${created.adminId}`, { method: "DELETE", headers }));

  await Promise.allSettled(jobs);

  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
}

async function main() {
  await ensureServer();

  await test("Server reachable", async () => {
    const { response } = await request("/api/public/faq");
    expect(response.status < 500, `server returned ${response.status}`);
  });

  await test("AUTH-02 login wrong password returns 401", async () => {
    await expectStatus("/api/auth/login", 401, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: ADMIN_USERNAME, password: "wrong-password" }),
    });
  });

  await test("AUTH-03 login empty fields returns 400", async () => {
    await expectStatus("/api/auth/login", 400, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "", password: ADMIN_PASSWORD }),
    });
  });

  await test("AUTH-01 login success returns token", async () => {
    const { response, body } = await jsonRequest("/api/auth/login", "POST", {
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });

    expect(response.status === 200, `expected 200, got ${response.status}`);
    expect(body && body.success === true, "success must be true");
    expect(typeof body.token === "string" && body.token.length > 20, "token missing");
    token = body.token;
  });

  await test("AUTH-05 verify token", async () => {
    const body = await expectStatus("/api/auth/verify", 200, { headers: authHeaders() });
    expect(body.success === true, "verify should return success");
  });

  const publicArtikel = await testAndReturn("PUB-01 list artikel public", async () => {
    const body = await expectStatus("/api/public/artikel", 200);
    expect(body.success === true, "success must be true");
    expect(Array.isArray(body.data), "data must be array");
    return body.data;
  });

  await test("PUB-02 artikel pagination limit 3", async () => {
    const body = await expectStatus("/api/public/artikel?page=1&limit=3", 200);
    expect(Array.isArray(body.data), "data must be array");
    expect(body.data.length <= 3, "data should be max 3 items");
  });

  await test("PUB-03 artikel search", async () => {
    const body = await expectStatus("/api/public/artikel?q=depresi", 200);
    expect(Array.isArray(body.data), "data must be array");
  });

  await optional("PUB-05 detail artikel valid id", async () => {
    if (!publicArtikel || publicArtikel.length === 0) return "no published artikel data";
    const body = await expectStatus(`/api/public/artikel/${publicArtikel[0].id}`, 200);
    expect(body.success === true, "success must be true");
  });

  await test("PUB-06 detail artikel invalid id", async () => {
    await expectStatus("/api/public/artikel/99999999", 404);
  });

  for (const [name, path] of [
    ["PUB-07 list kegiatan", "/api/public/kegiatan"],
    ["PUB-09 list FAQ", "/api/public/faq"],
    ["PUB-10 get kontak", "/api/public/kontak"],
    ["PUB-11 list statistik", "/api/public/statistik"],
    ["PUB-12 list visi-misi", "/api/public/visi-misi"],
    ["PUB-13 list struktur", "/api/public/struktur-organisasi"],
    ["PUB-14 list informasi universitas", "/api/public/informasi-universitas"],
    ["PUB-15 list pimpinan", "/api/pimpinan/public"],
  ]) {
    await test(name, async () => {
      const body = await expectStatus(path, 200);
      expect(body.success === true, "success must be true");
    });
  }

  for (const path of [
    "/api/admin/artikel",
    "/api/admin/kegiatan",
    "/api/admin/bantuan",
    "/api/admin/statistik",
    "/api/admin/informasi-universitas",
    "/api/pimpinan",
    "/api/admin/manajemen",
  ]) {
    await test(`SEC admin without token ${path}`, async () => {
      await expectStatus(path, 403);
    });

    await test(`SEC admin invalid token ${path}`, async () => {
      await expectStatus(path, 401, { headers: { Authorization: "Bearer invalidtoken123" } });
    });
  }

  await test("ADM-ART CRUD artikel", async () => {
    const create = await jsonRequest("/api/admin/artikel", "POST", {
      judul: `Test Artikel ${suffix}`,
      kategori: "Test",
      excerpt: "Excerpt test",
      konten: "Konten test otomatis",
      status: "Draft",
    }, authHeaders());
    expect(create.response.status === 201, `expected 201, got ${create.response.status}`);
    created.artikelId = create.body.data.id;

    await expectStatus(`/api/admin/artikel/${created.artikelId}`, 200, { headers: authHeaders() });

    const update = await jsonRequest(`/api/admin/artikel/${created.artikelId}`, "PUT", {
      judul: `Test Artikel Updated ${suffix}`,
      kategori: "Test",
      excerpt: "Excerpt update",
      konten: "Konten update otomatis",
      status: "Published",
    }, authHeaders());
    expect(update.response.status === 200, `expected 200, got ${update.response.status}`);

    await expectStatus(`/api/admin/artikel/${created.artikelId}`, 200, { headers: authHeaders() });
    await expectStatus(`/api/admin/artikel/${created.artikelId}`, 200, { method: "DELETE", headers: authHeaders() });
    created.artikelId = null;
  });

  await test("ADM-ART validation without judul", async () => {
    await expectStatus("/api/admin/artikel", 400, {
      method: "POST",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ konten: "Konten tanpa judul" }),
    });
  });

  await test("ADM-KGT CRUD kegiatan", async () => {
    const create = await jsonRequest("/api/admin/kegiatan", "POST", {
      nama_kegiatan: `Test Kegiatan ${suffix}`,
      tanggal: "01 Jan 2027",
      lokasi: "Aula Test",
      deskripsi: "Deskripsi test",
      status: "Akan Datang",
    }, authHeaders());
    expect(create.response.status === 201, `expected 201, got ${create.response.status}`);
    created.kegiatanId = create.body.data.id;

    const update = await jsonRequest(`/api/admin/kegiatan/${created.kegiatanId}`, "PUT", {
      nama_kegiatan: `Test Kegiatan Updated ${suffix}`,
      tanggal: "02 Jan 2027",
      lokasi: "Aula Update",
      deskripsi: "Deskripsi update",
      status: "Selesai",
    }, authHeaders());
    expect(update.response.status === 200, `expected 200, got ${update.response.status}`);

    await expectStatus(`/api/admin/kegiatan/${created.kegiatanId}`, 200, { method: "DELETE", headers: authHeaders() });
    created.kegiatanId = null;
  });

  await test("ADM-KGT validation nama too short", async () => {
    await expectStatus("/api/admin/kegiatan", 400, {
      method: "POST",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ nama_kegiatan: "A", tanggal: "01 Jan 2027", lokasi: "Aula" }),
    });
  });

  await test("ADM-BTN CRUD FAQ and kontak", async () => {
    const kontak = await expectStatus("/api/admin/bantuan/kontak", 200, { headers: authHeaders() });
    const current = kontak.data || { telepon: "000", email: "test@example.com", jam_layanan: "Senin-Jumat" };
    const updateKontak = await jsonRequest("/api/admin/bantuan/kontak", "PUT", {
      telepon: current.telepon || "000",
      email: current.email || "test@example.com",
      jam_layanan: current.jam_layanan || "Senin-Jumat",
    }, authHeaders());
    expect(updateKontak.response.status === 200, `expected 200, got ${updateKontak.response.status}`);

    const create = await jsonRequest("/api/admin/bantuan", "POST", {
      pertanyaan: `Test pertanyaan ${suffix}?`,
      jawaban: "Jawaban test otomatis",
    }, authHeaders());
    expect(create.response.status === 201, `expected 201, got ${create.response.status}`);
    created.faqId = create.body.data.id;

    const update = await jsonRequest(`/api/admin/bantuan/${created.faqId}`, "PUT", {
      pertanyaan: `Test pertanyaan updated ${suffix}?`,
      jawaban: "Jawaban update otomatis",
    }, authHeaders());
    expect(update.response.status === 200, `expected 200, got ${update.response.status}`);

    await expectStatus(`/api/admin/bantuan/${created.faqId}`, 200, { method: "DELETE", headers: authHeaders() });
    created.faqId = null;
  });

  await test("ADM-STT CRUD statistik and duplicate", async () => {
    const prodi = `Test Prodi ${suffix}`;
    const create = await jsonRequest("/api/admin/statistik", "POST", {
      prodi,
      total: 10,
      konseling: 5,
      selesai: 4,
    }, authHeaders());
    expect(create.response.status === 201, `expected 201, got ${create.response.status}`);
    created.statistikId = create.body.data.id;

    await expectStatus("/api/admin/statistik", 409, {
      method: "POST",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ prodi, total: 1, konseling: 1, selesai: 1 }),
    });

    const update = await jsonRequest(`/api/admin/statistik/${created.statistikId}`, "PUT", {
      prodi: `${prodi} Updated`,
      total: 11,
      konseling: 6,
      selesai: 5,
    }, authHeaders());
    expect(update.response.status === 200, `expected 200, got ${update.response.status}`);

    await expectStatus(`/api/admin/statistik/${created.statistikId}`, 200, { method: "DELETE", headers: authHeaders() });
    created.statistikId = null;
  });

  await test("ADM-PRF update visi-misi with existing data", async () => {
    const current = await expectStatus("/api/public/visi-misi", 200);
    const rows = Array.isArray(current.data) ? current.data : [];
    const visi = rows.find((item) => item.kategori === "visi")?.konten || "Visi test";
    const misi = rows.filter((item) => item.kategori === "misi").map((item) => item.konten);
    const tujuan = rows.filter((item) => item.kategori === "tujuan").map((item) => item.konten);

    const update = await jsonRequest("/api/admin/profil/visi-misi", "PUT", {
      visi,
      misi: misi.length ? misi : ["Misi test"],
      tujuan: tujuan.length ? tujuan : ["Tujuan test"],
    }, authHeaders());
    expect(update.response.status === 200, `expected 200, got ${update.response.status}`);
  });

  await test("ADM-PRF update kepala without file", async () => {
    const current = await expectStatus("/api/public/struktur-organisasi", 200);
    const kepala = (current.data || []).find((item) => item.kategori === "kepala") || {};
    const form = new FormData();
    form.append("nama", kepala.nama || "Kepala Test");
    form.append("spesialisasi", kepala.spesialisasi || "Spesialisasi Test");
    form.append("bio", kepala.bio || "Bio test");
    form.append("foto_url_lama", kepala.foto_url || "");

    const { response, body } = await request("/api/admin/profil/kepala", {
      method: "PUT",
      headers: authHeaders(),
      body: form,
    });
    expect(response.status === 200, `expected 200, got ${response.status}`);
    expect(body.success === true, "success must be true");
  });

  await test("ADM-INF CRUD informasi universitas", async () => {
    const create = await jsonRequest("/api/admin/informasi-universitas", "POST", {
      judul: `Test Info ${suffix}`,
      deskripsi: "Deskripsi informasi test",
      kategori: "Pengumuman",
      link_edaran: "",
      status: "Aktif",
    }, authHeaders());
    expect(create.response.status === 201, `expected 201, got ${create.response.status}`);
    created.informasiId = create.body.data.id;

    const update = await jsonRequest(`/api/admin/informasi-universitas/${created.informasiId}`, "PUT", {
      judul: `Test Info Updated ${suffix}`,
      deskripsi: "Deskripsi informasi update",
      kategori: "Akademik",
      link_edaran: "",
      status: "Nonaktif",
    }, authHeaders());
    expect(update.response.status === 200, `expected 200, got ${update.response.status}`);

    await expectStatus(`/api/admin/informasi-universitas/${created.informasiId}`, 200, { method: "DELETE", headers: authHeaders() });
    created.informasiId = null;
  });

  await test("ADM-PMP CRUD pimpinan", async () => {
    const form = new FormData();
    form.append("nama", `Test Pimpinan ${suffix}`);
    form.append("role", "Test Role");
    form.append("urutan", "99");

    const create = await request("/api/pimpinan", {
      method: "POST",
      headers: authHeaders(),
      body: form,
    });
    expect(create.response.status === 201, `expected 201, got ${create.response.status}`);

    const list = await expectStatus("/api/pimpinan", 200, { headers: authHeaders() });
    const item = (list.data || []).find((row) => row.nama === `Test Pimpinan ${suffix}`);
    expect(item, "created pimpinan not found");
    created.pimpinanId = item.id;

    const updateForm = new FormData();
    updateForm.append("nama", `Test Pimpinan Updated ${suffix}`);
    updateForm.append("role", "Test Role Updated");
    updateForm.append("urutan", "98");
    updateForm.append("foto_url_lama", item.foto_url || "");

    const update = await request(`/api/pimpinan/${created.pimpinanId}`, {
      method: "PUT",
      headers: authHeaders(),
      body: updateForm,
    });
    expect(update.response.status === 200, `expected 200, got ${update.response.status}`);

    await expectStatus(`/api/pimpinan/${created.pimpinanId}`, 200, { method: "DELETE", headers: authHeaders() });
    created.pimpinanId = null;
  });

  await test("ADM-MGN create duplicate and delete admin", async () => {
    const username = `testadmin_${suffix}`;
    const create = await jsonRequest("/api/admin/manajemen", "POST", {
      username,
      password: "pass123456",
      nama: "Admin Test",
    }, authHeaders());
    expect(create.response.status === 201, `expected 201, got ${create.response.status}`);
    created.adminId = create.body.data.id;

    await expectStatus("/api/admin/manajemen", 409, {
      method: "POST",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ username, password: "pass123456", nama: "Admin Test Duplicate" }),
    });

    await expectStatus(`/api/admin/manajemen/${created.adminId}`, 200, { method: "DELETE", headers: authHeaders() });
    created.adminId = null;
  });

  await cleanup();

  console.log("");
  console.log(`Result: ${pass} PASS, ${fail} FAIL, ${skip} SKIP`);
  if (fail > 0) process.exitCode = 1;
}

async function testAndReturn(name, fn) {
  try {
    const value = await fn();
    pass += 1;
    log("PASS", name);
    return value;
  } catch (error) {
    fail += 1;
    log("FAIL", name, error.message);
    return null;
  }
}

main()
  .catch(async (error) => {
    fail += 1;
    log("FAIL", "Test runner", error.message);
    await cleanup();
    console.log("");
    console.log(`Result: ${pass} PASS, ${fail} FAIL, ${skip} SKIP`);
    process.exitCode = 1;
  });
