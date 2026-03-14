# 🎯 스파르타 북큐레이션 — Orchestrator

## 프로젝트 개요
팀스파르타 내부 직원이 **연차**와 **고민**을 입력하면,
팀스파르타의 핵심가치(빠르게/와우하게/진정성있게) + 그라운드룰(10가지)을 기반으로
**Claude AI가 맞춤 책 3권**을 추천해주는 사내 웹 서비스.

---

## 아키텍처

```
BookCuration/
├── CLAUDE.md                  ← 오케스트레이터 (지금 파일)
├── 기획.md                    ← 서비스 기획서
├── index.html                 ← UI 프로토타입 (참고용)
├── result.html                ← UI 프로토타입 (참고용)
│
├── frontend-agent/
│   └── CLAUDE.md              ← 프론트엔드 에이전트
│
├── backend-agent/
│   └── CLAUDE.md              ← 백엔드 에이전트
│
├── infra-agent/
│   └── CLAUDE.md              ← 인프라 에이전트
│
└── apps/
    ├── web/                   ← Next.js 프론트엔드
    └── api/                   ← Nest.js 백엔드
```

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트엔드 | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| 백엔드 | Nest.js, TypeScript |
| 데이터베이스 | Supabase (PostgreSQL) |
| AI | Claude API (`claude-sonnet-4-6`) |
| 배포 | Vercel (프론트 + 백엔드 통합) |
| 버전 관리 | GitHub |

---

## 서브에이전트 역할 분담

### 🖥 frontend-agent
- `apps/web/` Next.js 앱 전담
- UI 컴포넌트, 페이지, 스타일링
- 백엔드 API 호출 연동
- 참고 디자인: `index.html`, `result.html` (프로토타입)

### ⚙️ backend-agent
- `apps/api/` Nest.js 앱 전담
- Claude API 연동 및 프롬프트 관리
- REST API 엔드포인트 제공
- Supabase 데이터 저장

### 🏗 infra-agent
- Supabase 스키마 설계 및 마이그레이션
- 환경변수 관리 (`.env.example`)
- Vercel 배포 설정
- GitHub 레포 초기화

---

## 핵심 사용자 플로우

```
[메인 페이지] → 연차 선택 + 고민 입력
      ↓
[POST /api/recommend]
      ↓
[Claude API] → 핵심가치 + 그라운드룰 기반 책 3권 생성
      ↓
[Supabase] → 결과 저장 (id 반환)
      ↓
[결과 페이지 /result/[id]] → 책 3권 + 태그 표시 + 공유
```

---

## 팀스파르타 문화 컨텍스트 (AI 프롬프트 기반)

### 핵심가치
- **빠르게**: 아이디어를 작고 빠르게 검증, 간결한 실행
- **와우하게**: 고객이 예측하지 못한 순간의 감동
- **진정성있게**: 고객보다 고객을 더 생각하는 자세

### 인재상 (함께 밥 먹고 싶은 사람)
1. 말을 예쁘게 하는 사람
2. 성장을 갈망하는 사람
3. 실패에서 배우는 사람
4. 유쾌한 사람
5. 만들고 싶은 세상이 있는 사람

### 그라운드룰
1. 슬랙 100번보다 잡담 1번이 낫다
2. 안돼요 대신 "이렇게 하면 어때요?"
3. 네 일 내 일 하다 내일(tomorrow) 된다
4. 하고 싶은 일이 아니라 팀에 필요한 일을 합니다
5. 리소스는 늘 부족하므로, 다른 방법을 찾습니다
6. ETA는 함께 정하고, 반드시 지킵니다
7. 이끌거나, 따르거나, 아니면 떠나거나!
8. 피드백은 자작(자주, 작게)하게
9. 존중하자. 내 일, 내 고객, 내 동료
10. 나의 작은 행동 하나가 문화의 씨앗이 됩니다

---

## 환경변수 목록

```
ANTHROPIC_API_KEY=        # Claude API 키
SUPABASE_URL=             # Supabase 프로젝트 URL
SUPABASE_ANON_KEY=        # Supabase anon key
NEXT_PUBLIC_API_URL=      # 백엔드 API URL
```

---

## 작업 원칙
- 모든 코드는 TypeScript로 작성
- 컴포넌트/모듈은 단일 책임 원칙
- API 응답은 일관된 형식 유지 `{ data, error }`
- 민감 정보는 절대 코드에 하드코딩 금지 (`.env` 사용)
- 모바일 반응형 필수
