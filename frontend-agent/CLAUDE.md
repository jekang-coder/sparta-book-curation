# 🖥 Frontend Agent — 스파르타 북큐레이션

## 역할
`apps/web/` Next.js 앱의 UI/UX 전담.
백엔드 API를 호출해 결과를 렌더링하고, 팀스파르타 브랜딩을 적용한다.

---

## 담당 디렉토리
```
apps/web/
├── app/
│   ├── page.tsx           ← 메인 페이지 (연차 선택 + 고민 입력)
│   ├── result/
│   │   └── [id]/
│   │       └── page.tsx   ← 결과 페이지 (책 3권 표시)
│   ├── layout.tsx         ← 공통 레이아웃 (헤더, 푸터)
│   └── globals.css        ← 전역 스타일
├── components/
│   ├── YearSelector.tsx   ← 연차 선택 컴포넌트
│   ├── ConcernInput.tsx   ← 고민 입력 컴포넌트
│   ├── BookCard.tsx       ← 책 카드 컴포넌트
│   └── TagBadge.tsx       ← 핵심가치/그라운드룰 태그
└── lib/
    └── api.ts             ← 백엔드 API 호출 함수
```

---

## 기술 스택
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (스타일링)
- **Pretendard** 폰트 (CDN)

---

## 디자인 시스템

### 컬러
```css
--red: #FA0030;       /* 팀스파르타 브랜드 레드 */
--black: #222222;     /* 메인 텍스트 */
--gray: #8C8C8C;      /* 보조 텍스트 */
--light-gray: #F5F5F5;
--white: #FFFFFF;
```

### 타이포그래피
- 폰트: Pretendard
- 제목: font-weight 800, letter-spacing -1.5px
- 본문: font-weight 400~600, line-height 1.7

### 버튼
- Primary: `bg-black text-white` → hover `bg-[#FA0030]`
- Secondary: `border border-gray-200` → hover `border-black`

---

## 참고 프로토타입
`../../index.html` 및 `../../result.html` 을 기반으로 Next.js 컴포넌트로 변환.
레이아웃, 컬러, 폰트, 카드 스타일 그대로 유지.

---

## 주요 페이지 스펙

### 1. 메인 페이지 (`/`)
- 연차 선택: 0~1년차 / 2~3년차 / 4~7년차 / 8년차 이상 (라디오 버튼 스타일)
- 고민 입력: textarea (최대 300자, 실시간 글자 수 표시)
- 유효성 검사: 연차 미선택 / 고민 10자 미만 → 에러
- 제출: `POST /api/recommend` 호출 → 로딩 → `/result/[id]` 이동

### 2. 결과 페이지 (`/result/[id]`)
- URL의 `id`로 Supabase 결과 조회
- 로딩 스피너 (1.8초 or 실제 API 응답 대기)
- 책 카드 3개: 제목 / 저자 / 추천 이유 / 태그
- 공유 버튼: 현재 URL 클립보드 복사
- 다시하기 버튼: `/` 로 이동

---

## API 호출 스펙
```typescript
// POST /api/recommend
interface RecommendRequest {
  years_exp: string;   // "0~1년차" | "2~3년차" | "4~7년차" | "8년차 이상"
  concern: string;     // 고민 텍스트
}

interface RecommendResponse {
  data: {
    id: string;        // Supabase row id (UUID)
    books: Book[];
  };
  error: string | null;
}

interface Book {
  title: string;
  author: string;
  reason: string;
  core_values: string[];   // ["빠르게", "와우하게"]
  ground_rules: string[];  // ["#8 피드백은 자작하게"]
}
```

---

## 작업 원칙
- 서버 컴포넌트 우선, 클라이언트 컴포넌트는 `'use client'` 명시
- Tailwind 클래스로만 스타일링 (인라인 스타일 지양)
- 반응형 필수: 모바일(`< 640px`) 기준 먼저 설계
- 로딩/에러 상태 반드시 처리
