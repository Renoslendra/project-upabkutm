const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// --- IMPORT ROUTES ---
const authRoutes = require("./routes/authRoutes");
const artikelRoutes = require("./routes/artikelRoutes");
const kegiatanRoutes = require("./routes/kegiatanRoutes");
const bantuanRoutes = require("./routes/bantuanRoutes");
const adminRoutes = require("./routes/manajemenAdminRoutes");
const publicRoutes = require("./routes/publicRoutes");

// --- ROUTE MIDDLEWARES ---
app.use("/api/auth", authRoutes);
app.use("/api/admin/artikel", artikelRoutes);
app.use("/api/admin/kegiatan", kegiatanRoutes);
app.use("/api/admin/bantuan", bantuanRoutes);
app.use("/api/admin/manajemen-admin", adminRoutes);
app.use("/api/public", publicRoutes);

app.get("/", (req, res) => {
  res.send("Backend UPA-BK berjalan");
});

const db = require("./config/db");
db.query("SELECT 1")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});