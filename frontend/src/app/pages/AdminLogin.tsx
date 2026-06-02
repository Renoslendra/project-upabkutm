import { useState } from "react";
import { useNavigate, Link } from "react-router";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("adminName", data.admin.nama);
        navigate("/admin"); 
      } else {
        setErrorMsg(data.message);
      }
    } catch (error) {
      console.error("Gagal terhubung ke server:", error);
      setErrorMsg("Gagal terhubung ke server. Pastikan backend menyala.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--background)] relative">
      <div className="card-soft max-w-sm w-full p-8 relative z-10">
        <h1 className="text-2xl mb-2 text-center text-[var(--primary-dark)]">Admin Login</h1>
        <p className="text-sm text-center mb-6 text-[var(--text-secondary)]">Akses khusus pengelola sistem UPA-BK</p>
                 
        <form className="space-y-4" onSubmit={handleLogin}>
          {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
          
          <div>
            <label className="block text-sm font-medium mb-1">Username Admin</label>
            <input 
              className="input-field w-full" 
              type="text" 
              placeholder="Masukkan username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              className="input-field w-full" 
              type="password" 
              placeholder="Masukkan password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full text-center mt-4">Login Admin</button>
        </form>
        <Link to="/" className="block mt-6 flex justify-center text-sm">Kembali ke Beranda</Link>
      </div>
    </div>
  );
}