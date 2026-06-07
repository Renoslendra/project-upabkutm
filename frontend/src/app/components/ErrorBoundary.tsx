import { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--background)' }}>
          <div className="card-soft max-w-lg w-full p-8 text-center">
            <h1 className="text-2xl font-semibold mb-3" style={{ color: 'var(--primary-dark)' }}>
              Terjadi Kesalahan
            </h1>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Halaman tidak dapat ditampilkan saat ini. Muat ulang halaman untuk mencoba kembali.
            </p>
            <button
              className="btn-primary"
              onClick={() => window.location.reload()}
            >
              Muat Ulang
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
