const express = require("express");
const router = express.Router();
const publicController = require("../controllers/publicController");

router.get("/artikel", publicController.listPublishedArtikel);
router.get("/artikel/:id", publicController.getArtikelById);
router.get("/kegiatan", publicController.listKegiatan);
router.get("/faq", publicController.listFaq);
router.get("/kontak", publicController.getKontak);
router.get("/statistik", publicController.listStatistik);
router.get("/visi-misi", publicController.listVisiMisi);
router.get("/struktur-organisasi", publicController.listStruktur);
router.get("/informasi-universitas", publicController.listInformasiUniversitas);

module.exports = router;