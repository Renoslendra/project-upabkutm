import { Navigate, Outlet } from 'react-router';

export default function ProtectedRoute() {
  // 1. Cek apakah ada token di localStorage
  const token = localStorage.getItem("token");

  // 2. Jika token TIDAK ADA, langsung arahkan (tendang) ke halaman login
  if (!token) {
    return <Navigate to="/admin-rahasia" replace />;
  }

  // 3. Jika token ADA, izinkan akses ke halaman admin (Outlet merender komponen anak)
  return <Outlet />;
}