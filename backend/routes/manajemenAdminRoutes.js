const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const verifyToken = require("../middleware/authMiddleware");

// Semua route dilindungi JWT
router.use(verifyToken);

router.get("/", adminController.list);
router.get("/:id", adminController.getById);
router.post("/", adminController.create);
router.put("/:id", adminController.update);
router.delete("/:id", adminController.remove);

module.exports = router;
