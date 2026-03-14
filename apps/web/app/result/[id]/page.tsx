'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { Recommendation } from '@/lib/types';

export default function ResultPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Recommendation | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/recommendation/${id}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.error || !json.data) throw new Error(json.error || '결과를 불러올 수 없습니다.');
        setData(json.data);
      })
      .catch((e) => setError(e.message));
  }, [id]);

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // 로딩
  if (!data && !error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <div style={{
            width: 48, height: 48, border: '3px solid #F5F5F5', borderTopColor: '#FA0030',
            borderRadius: '50%', animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.5px' }}>AI가 책을 고르는 중...</div>
          <div style={{ fontSize: 14, color: '#8C8C8C' }}>팀스파르타 핵심가치와 그라운드룰을 분석하고 있어요</div>
        </div>
        <Footer />
      </div>
    );
  }

  // 에러
  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div style={{ fontSize: 40 }}>😅</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{error}</div>
          <Link href="/" style={{ marginTop: 8, padding: '12px 24px', background: '#222', color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>
            다시 시도하기
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const concernPreview = data!.concern.length > 50 ? data!.concern.slice(0, 50) + '...' : data!.concern;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* 배너 */}
      <div style={{ background: '#222', color: '#fff', padding: '56px 40px 48px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <span style={{ background: '#FA0030', color: '#fff', fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 100 }}>
            {data!.years_exp}
          </span>
          <span style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 100 }}>
            AI 추천 완료
          </span>
        </div>
        <h2 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-1px', marginBottom: 12 }}>
          <span style={{ color: '#FA0030' }}>딱 맞는 책 3권</span>을<br />찾았어요
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', maxWidth: 540, margin: '0 auto', lineHeight: 1.6, letterSpacing: '-0.2px' }}>
          고민: <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{concernPreview}</strong>
        </p>
      </div>

      {/* 책 목록 */}
      <div style={{ maxWidth: 900, width: '100%', margin: '0 auto', padding: '56px 40px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#FA0030', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 32 }}>
          📚 추천 도서
        </div>
        {data!.books.map((book, i) => (
          <BookCard key={i} book={book} index={i} />
        ))}
      </div>

      {/* 액션 버튼 */}
      <div style={{ maxWidth: 900, width: '100%', margin: '0 auto', padding: '24px 40px 60px' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={handleCopy}
            style={{
              flex: 1, height: 52, background: '#fff', color: '#222',
              border: '1.5px solid #E8E8E8', borderRadius: 10, fontFamily: 'inherit',
              fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.background = '#F5F5F5'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E8E8E8'; e.currentTarget.style.background = '#fff'; }}
          >
            {copied ? '✅ 복사됐어요!' : '🔗 결과 공유하기'}
          </button>
          <Link
            href="/"
            style={{
              flex: 1, height: 52, background: '#222', color: '#fff',
              borderRadius: 10, textDecoration: 'none', fontFamily: 'inherit',
              fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#FA0030'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#222'; }}
          >
            ↩ 다시 추천받기
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
