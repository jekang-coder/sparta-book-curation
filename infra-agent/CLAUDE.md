# 🏗 Infra Agent — 스파르타 북큐레이션

## 역할
Supabase DB 스키마, 환경변수, Vercel 배포, GitHub 설정 전담.
코드는 건드리지 않고 인프라와 설정 파일만 관리한다.

---

## 담당 범위
```
BookCuration/
├── .env.example               ← 환경변수 템플릿
├── .gitignore                 ← Git 제외 파일
├── vercel.json                ← Vercel 배포 설정
└── supabase/
    └── migrations/
        └── 001_init.sql       ← DB 초기 스키마
```

---

## Supabase 스키마

### `recommendations` 테이블
```sql
CREATE TABLE recommendations (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  years_exp    VARCHAR(20) NOT NULL,
  concern      TEXT NOT NULL,
  books        JSONB NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 (공유 URL 조회 성능)
CREATE INDEX idx_recommendations_id ON recommendations(id);
CREATE INDEX idx_recommendations_created_at ON recommendations(created_at DESC);
```

### Row Level Security (RLS)
```sql
-- RLS 활성화
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- 누구나 읽기 가능 (공유 URL 접근)
CREATE POLICY "Anyone can read" ON recommendations
  FOR SELECT USING (true);

-- 서비스 롤로만 삽입 가능
CREATE POLICY "Service role insert" ON recommendations
  FOR INSERT WITH CHECK (true);
```

---

## 환경변수 목록

### 백엔드 (`apps/api/.env`)
```
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
PORT=3001
```

### 프론트엔드 (`apps/web/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
```

---

## Vercel 배포 설정

### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/web/package.json",
      "use": "@vercel/next"
    },
    {
      "src": "apps/api/src/main.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "apps/api/src/main.ts"
    },
    {
      "src": "/(.*)",
      "dest": "apps/web/$1"
    }
  ]
}
```

> **Note:** 단순 배포를 원한다면 Next.js의 API Routes로 백엔드를 통합하는 방식도 고려.
> 그 경우 `apps/api/`가 필요 없고 `apps/web/app/api/` 에 라우트 핸들러로 작성.

---

## GitHub 초기 설정

### `.gitignore`
```
node_modules/
.env
.env.local
.env.*.local
.next/
dist/
```

### 브랜치 전략
- `main`: 프로덕션 (Vercel 자동 배포)
- `dev`: 개발 통합 브랜치
- `feat/[기능명]`: 기능별 브랜치

---

## 세팅 순서 체크리스트

1. **GitHub 레포 생성**
   - [ ] `BookCuration` public/private 레포 생성
   - [ ] 로컬에서 `git init` → remote 연결

2. **Supabase 설정**
   - [ ] 새 프로젝트 생성 (region: Northeast Asia - Seoul)
   - [ ] `001_init.sql` 실행 (SQL Editor)
   - [ ] URL + anon key + service_role key 복사

3. **환경변수 설정**
   - [ ] `apps/api/.env` 생성 및 값 입력
   - [ ] `apps/web/.env.local` 생성 및 값 입력
   - [ ] Vercel 환경변수 등록

4. **Vercel 연결**
   - [ ] GitHub 레포 Vercel에 연결
   - [ ] 빌드 설정 확인
   - [ ] 환경변수 등록 후 배포

---

## 작업 원칙
- `.env` 파일은 절대 Git에 커밋하지 않는다
- `.env.example`에는 키 이름만 남기고 값은 비워둔다
- Supabase는 서비스 롤 키를 서버(백엔드)에서만 사용하고, 프론트에는 anon 키만 노출
