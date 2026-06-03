const express = require("express");
const router = express.Router();
const artikelController = require("../controllers/artikelController");
const verifyToken = require("../middleware/authMiddleware");

// Semua route dilindungi JWT
router.use(verifyToken);

router.get("/", artikelController.list);
router.get("/:id", artikelController.getById);
router.post("/", artikelController.create);
router.put("/:id", artikelController.update);
router.delete("/:id", artikelController.remove);

module.exports = router;
