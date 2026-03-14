# ⚙️ Backend Agent — 스파르타 북큐레이션

## 역할
`apps/api/` Nest.js 앱 전담.
Claude API를 통해 책을 추천하고, 결과를 Supabase에 저장하며, REST API를 프론트엔드에 제공한다.

---

## 담당 디렉토리
```
apps/api/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── recommend/
│   │   ├── recommend.module.ts
│   │   ├── recommend.controller.ts   ← POST /recommend 엔드포인트
│   │   ├── recommend.service.ts      ← 핵심 비즈니스 로직
│   │   └── recommend.dto.ts          ← 요청/응답 타입
│   ├── claude/
│   │   ├── claude.module.ts
│   │   └── claude.service.ts         ← Claude API 호출 + 프롬프트 관리
│   └── supabase/
│       ├── supabase.module.ts
│       └── supabase.service.ts       ← DB 저장/조회
├── .env
└── package.json
```

---

## 기술 스택
- **Nest.js** (Express 기반)
- **TypeScript**
- **@anthropic-ai/sdk** (Claude API)
- **@supabase/supabase-js** (Supabase 클라이언트)

---

## API 엔드포인트

### POST `/recommend`
책 추천 요청

**Request Body:**
```json
{
  "years_exp": "2~3년차",
  "concern": "팀원에게 피드백을 잘 주고 싶은데 어떻게 해야 할지 모르겠어요."
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid-v4",
    "books": [
      {
        "title": "피드백 임파서블",
        "author": "김성준",
        "reason": "그라운드룰 #8과 연결되는 이유...",
        "core_values": ["진정성있게"],
        "ground_rules": ["#8 피드백은 자작하게"]
      }
    ]
  },
  "error": null
}
```

### GET `/recommend/:id`
저장된 추천 결과 조회 (결과 페이지 공유용)

---

## Claude API 프롬프트 전략

### 시스템 프롬프트
```
당신은 팀스파르타의 도서 큐레이터입니다.

[팀스파르타 핵심가치]
- 빠르게: 아이디어를 작고 빠르게 검증, 간결한 실행
- 와우하게: 고객이 예측하지 못한 순간의 감동
- 진정성있게: 고객보다 고객을 더 생각하는 자세

[인재상 - 함께 밥 먹고 싶은 사람]
1. 말을 예쁘게 하는 사람
2. 성장을 갈망하는 사람
3. 실패에서 배우는 사람
4. 유쾌한 사람
5. 만들고 싶은 세상이 있는 사람

[그라운드룰]
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

위 팀스파르타 문화를 기반으로, 아래 직원의 고민에 딱 맞는 책 3권을 추천하세요.
반드시 실제로 존재하는 책만 추천하고, 다음 JSON 형식으로만 응답하세요:

{
  "books": [
    {
      "title": "책 제목",
      "author": "저자명",
      "reason": "이 책을 추천하는 이유 (팀스파르타 문화와 연결해서 2~3문장)",
      "core_values": ["연결되는 핵심가치"],
      "ground_rules": ["#번호 그라운드룰 이름"]
    }
  ]
}
```

### 유저 프롬프트
```
연차: {years_exp}
고민: {concern}
```

---

## Claude API 설정
```typescript
// claude.service.ts
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 2048,
  system: SYSTEM_PROMPT,
  messages: [{ role: 'user', content: userPrompt }],
});
```

---

## Supabase 연동
- `recommend.service.ts` 에서 Claude 응답 받은 후 Supabase에 저장
- 저장 성공 시 row `id` 반환 → 프론트에서 `/result/[id]` 라우팅에 사용

---

## 작업 원칙
- 모든 외부 API 호출은 try-catch로 감싸고, 에러 시 적절한 HTTP 상태 코드 반환
- Claude 응답의 JSON 파싱 실패 대비 fallback 처리
- CORS 설정: 프론트엔드 도메인만 허용 (개발: `localhost:3000`)
- 환경변수는 `ConfigModule` 으로 관리, 절대 하드코딩 금지
