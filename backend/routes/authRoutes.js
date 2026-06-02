const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rute POST untuk login admin
router.post("/login", authController.login);

module.exports = router;