const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// --- IMPORT ROUTES ---
const authRoutes = require("./routes/authRoutes");

// --- ROUTE MIDDLEWARES ---
app.use("/api/auth", authRoutes);

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