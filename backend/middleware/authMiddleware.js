const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Mengambil token dari header 'Authorization' (Format: Bearer <token>)
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Akses ditolak. Token tidak ditemukan.",
    });
  }

  try {
    // Verifikasi keabsahan token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // Menyimpan data admin yang login ke object request
    next(); // Lanjut ke controller utama
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token tidak valid atau telah kedaluwarsa.",
    });
  }
};

module.exports = verifyToken;