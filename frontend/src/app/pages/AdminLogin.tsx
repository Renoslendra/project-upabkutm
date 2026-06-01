import { Link } from 'react-router';

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--background)] relative">
      <div className="card-soft max-w-sm w-full p-8 relative z-10">
        <h1 className="text-2xl mb-2 text-center text-[var(--primary-dark)]">Admin Login</h1>
        <p className="text-sm text-center mb-6 text-[var(--text-secondary)]">Akses khusus pengelola sistem UPA-BK</p>
        
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-1">Username Admin</label>
            <input className="input-field w-full" type="text" placeholder="Masukkan username" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input className="input-field w-full" type="password" placeholder="••••••••" />
          </div>
          <Link to="/admin" className="btn-primary w-full text-center mt-4">Login Admin</Link>
        </form>
        <Link to="/" className="block mt-6 flex justify-center text-sm">Kembali ke Beranda</Link>
      </div>
    </div>
  );
}