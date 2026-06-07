const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

// Rute POST untuk login admin
router.post("/login", authController.login);
router.get("/verify", verifyToken, authController.verify);

module.exports = router;
