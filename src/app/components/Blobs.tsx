export function Blobs({ variant = 'hero' }: { variant?: 'hero' | 'header' | 'footer' }) {
  if (variant === 'hero') {
    return (
      <>
        <div className="blob" style={{ width: 480, height: 480, background: '#FFD7F3', top: -160, right: -120 }} />
        <div className="blob" style={{ width: 420, height: 420, background: '#C77DBA', bottom: -180, left: -140, opacity: 0.35 }} />
        <div className="blob" style={{ width: 280, height: 280, background: '#7B68AE', top: '30%', left: '40%', opacity: 0.18 }} />
      </>
    );
  }
  if (variant === 'header') {
    return (
      <>
        <div className="blob" style={{ width: 360, height: 360, background: '#FFD7F3', top: -120, right: -80 }} />
        <div className="blob" style={{ width: 260, height: 260, background: '#C77DBA', bottom: -120, left: -60, opacity: 0.3 }} />
      </>
    );
  }
  return (
    <>
      <div className="blob" style={{ width: 320, height: 320, background: '#89467F', top: -120, right: -80, opacity: 0.35 }} />
      <div className="blob" style={{ width: 260, height: 260, background: '#7B68AE', bottom: -120, left: -60, opacity: 0.25 }} />
    </>
  );
}
