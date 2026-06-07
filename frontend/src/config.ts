// Konfigurasi API URL — otomatis membaca dari environment variable Vite
// Untuk production: buat file .env di root frontend dengan VITE_API_URL=https://your-domain.com
// Untuk development: default ke http://localhost:5000

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
