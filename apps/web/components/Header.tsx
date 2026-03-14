import Link from 'next/link';

export default function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '60px',
        background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.11)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
      }}
    >
      <Link
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          color: '#222',
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            background: '#FA0030',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 14,
            fontWeight: 900,
          }}
        >
          S
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px' }}>
          <span style={{ color: '#FA0030' }}>SPARTA</span> BOOK
        </span>
      </Link>
    </header>
  );
}
