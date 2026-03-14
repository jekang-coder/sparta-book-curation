'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { YearsExp } from '@/lib/types';

const YEARS_OPTIONS: { value: YearsExp; emoji: string; label: string }[] = [
  { value: '0~1년차', emoji: '🌱', label: '0~1년차' },
  { value: '2~3년차', emoji: '🚀', label: '2~3년차' },
  { value: '4~7년차', emoji: '⚡', label: '4~7년차' },
  { value: '8년차 이상', emoji: '🏆', label: '8년차 이상' },
];

const HINTS = ['리더십', '커뮤니케이션', '성장', '실행력', '팀워크', '피드백'];

export default function HomePage() {
  const router = useRouter();
  const [selectedYears, setSelectedYears] = useState<YearsExp | null>(null);
  const [concern, setConcern] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (!selectedYears) { setError('연차를 선택해주세요!'); return; }
    if (concern.trim().length < 10) { setError('고민을 10자 이상 입력해주세요!'); return; }

    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ years_exp: selectedYears, concern }),
      });
      const json = await res.json();
      if (json.error || !json.data) throw new Error(json.error || '오류가 발생했습니다.');
      router.push(`/result/${json.data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '추천 생성에 실패했습니다.');
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px 60px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#fff0f2', color: '#FA0030', fontSize: 13, fontWeight: 600,
            padding: '6px 14px', borderRadius: 100, marginBottom: 28, letterSpacing: '-0.2px',
          }}
        >
          <span style={{ width: 6, height: 6, background: '#FA0030', borderRadius: '50%', display: 'inline-block' }} />
          팀스파르타 내부 서비스
        </span>

        <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-1.5px', marginBottom: 20, color: '#222' }}>
          지금 내 고민,<br />
          <span style={{ color: '#FA0030' }}>팀문화로 풀어줄 책</span>
        </h1>

        <p style={{ fontSize: 17, color: '#8C8C8C', lineHeight: 1.7, maxWidth: 500, marginBottom: 48, letterSpacing: '-0.3px' }}>
          연차와 고민을 입력하면 팀스파르타의 핵심가치와<br />
          그라운드룰을 기반으로 AI가 딱 맞는 책 3권을 추천해드립니다.
        </p>

        {/* 폼 카드 */}
        <div style={{ width: '100%', maxWidth: 580, background: '#fff', border: '1.5px solid #E8E8E8', borderRadius: 16, padding: '40px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', textAlign: 'left' }}>
          {/* 연차 선택 */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
              연차를 선택해주세요 <span style={{ color: '#FA0030' }}>*</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {YEARS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedYears(opt.value)}
                  style={{
                    height: 52, border: `1.5px solid ${selectedYears === opt.value ? '#FA0030' : '#E8E8E8'}`,
                    borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    background: selectedYears === opt.value ? '#FA0030' : '#fff',
                    color: selectedYears === opt.value ? '#fff' : '#8C8C8C',
                    transition: 'all 0.15s', fontFamily: 'inherit',
                    boxShadow: selectedYears === opt.value ? '0 4px 12px rgba(250,0,48,0.25)' : 'none',
                  }}
                >
                  {opt.emoji} {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 고민 입력 */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
              지금 어떤 고민이 있나요? <span style={{ color: '#FA0030' }}>*</span>
            </label>
            <textarea
              value={concern}
              onChange={(e) => setConcern(e.target.value.slice(0, 300))}
              placeholder="예) 팀원에게 피드백을 잘 주고 싶은데 어떻게 해야 할지 모르겠어요. 항상 눈치가 보여서..."
              style={{
                width: '100%', height: 130, border: '1.5px solid #E8E8E8', borderRadius: 10,
                padding: 16, fontFamily: 'inherit', fontSize: 15, color: '#222',
                lineHeight: 1.6, resize: 'none', outline: 'none', letterSpacing: '-0.2px',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#FA0030')}
              onBlur={(e) => (e.target.style.borderColor = '#E8E8E8')}
            />
            <div style={{ textAlign: 'right', fontSize: 12, color: '#BBBBBB', marginTop: 6 }}>
              {concern.length} / 300
            </div>
          </div>

          {error && (
            <div style={{ marginBottom: 16, padding: '10px 14px', background: '#fff0f2', borderRadius: 8, fontSize: 13, color: '#FA0030', fontWeight: 600 }}>
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', height: 56,
              background: loading ? '#888' : '#222',
              color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit',
              fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '-0.3px', transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#FA0030'; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = '#222'; }}
          >
            {loading ? '🔍 AI가 책을 고르는 중...' : '📚 책 추천받기'}
          </button>
        </div>

        {/* 힌트 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: 12, color: '#8C8C8C' }}>이런 고민에 잘 맞아요 →</span>
          {HINTS.map((h) => (
            <span key={h} style={{ fontSize: 12, color: '#8C8C8C', background: '#F5F5F5', padding: '4px 10px', borderRadius: 100 }}>{h}</span>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
