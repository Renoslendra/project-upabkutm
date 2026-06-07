const express = require("express");
const router = express.Router();
const statistikController = require("../controllers/statistikController");
const verifyToken = require("../middleware/authMiddleware");

// Semua route admin dilindungi JWT. Endpoint publik statistik tersedia di /api/public/statistik.
router.use(verifyToken);

router.get("/", statistikController.list);
router.post("/", statistikController.create);
router.put("/:id", statistikController.update);
router.delete("/:id", statistikController.delete);

module.exports = router;
