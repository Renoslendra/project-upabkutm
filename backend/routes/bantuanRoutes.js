const express = require("express");
const router = express.Router();
const bantuanController = require("../controllers/bantuanController");
const verifyToken = require("../middleware/authMiddleware");

// Semua route dilindungi JWT
router.use(verifyToken);

router.get("/", bantuanController.list);
router.get("/:id", bantuanController.getById);
router.post("/", bantuanController.create);
router.put("/:id", bantuanController.update);
router.delete("/:id", bantuanController.remove);

module.exports = router;
