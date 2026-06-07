import { Navigate, Outlet } from 'react-router';

const isTokenExpired = (token: string) => {
  try {
    const payload = token.split('.')[1];
    if (!payload) return true;

    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const decoded = JSON.parse(atob(padded));
    if (!decoded.exp) return true;

    return decoded.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};

const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("adminName");
};

export default function ProtectedRoute() {
  // 1. Cek apakah ada token di localStorage
  const token = localStorage.getItem("token");

  // 2. Jika token TIDAK ADA, langsung arahkan (tendang) ke halaman login
  if (!token) {
    return <Navigate to="/admin-rahasia" replace />;
  }

  if (isTokenExpired(token)) {
    clearAuthSession();
    return <Navigate to="/admin-rahasia" replace />;
  }

  // 3. Jika token ADA, izinkan akses ke halaman admin (Outlet merender komponen anak)
  return <Outlet />;
}
