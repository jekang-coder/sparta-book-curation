import { Book } from '@/lib/types';

const COVER_COLORS = [
  'linear-gradient(135deg, #FA0030, #ff6b6b)',
  'linear-gradient(135deg, #0D1B2A, #1e3a5f)',
  'linear-gradient(135deg, #2d6a4f, #52b788)',
];

interface BookCardProps {
  book: Book;
  index: number;
}

export default function BookCard({ book, index }: BookCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 28,
        padding: '32px',
        border: '1.5px solid #E8E8E8',
        borderRadius: 16,
        marginBottom: 20,
        position: 'relative',
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      {/* 배경 번호 */}
      <span
        style={{
          position: 'absolute',
          top: 16,
          right: 24,
          fontSize: 64,
          fontWeight: 900,
          color: 'rgba(0,0,0,0.04)',
          lineHeight: 1,
          letterSpacing: -2,
          userSelect: 'none',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* 커버 */}
      <div
        style={{
          flexShrink: 0,
          width: 90,
          height: 120,
          borderRadius: 8,
          background: COVER_COLORS[index % COVER_COLORS.length],
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
        }}
      >
        📖
      </div>

      {/* 정보 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: '-0.5px',
            lineHeight: 1.3,
            marginBottom: 4,
            color: '#222',
          }}
        >
          {book.title}
        </div>
        <div
          style={{
            fontSize: 13,
            color: '#8C8C8C',
            marginBottom: 14,
            letterSpacing: '-0.2px',
          }}
        >
          {book.author}
        </div>
        <div
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: '#444',
            letterSpacing: '-0.2px',
            marginBottom: 16,
          }}
        >
          {book.reason}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {book.core_values.map((v) => (
            <span
              key={v}
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: 100,
                background: '#fff0f2',
                color: '#FA0030',
              }}
            >
              {v}
            </span>
          ))}
          {book.ground_rules.map((r) => (
            <span
              key={r}
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: 100,
                background: '#F5F5F5',
                color: '#555',
              }}
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
