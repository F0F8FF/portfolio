/**
 * 포트폴리오 콘텐츠. 여기만 수정하면 사이트 전체가 바뀝니다.
 */

export const PROFILE = {
  // 한 줄 포지셔닝 — "AI 공부 중인 개발자"가 아니라 가진 무기를 내세웁니다.
  tagline: "프로덕션 AI 제품을 설계·배포·운영하는 엔지니어",
  subtitle:
    "4년차 풀스택 경험을 바탕으로 LLM·RAG 시스템을 실제 서비스로 출시합니다.",
  location: "Seoul, Korea",
  github: "https://github.com/F0F8FF",
  stack: [
    "TypeScript",
    "Next.js",
    "Python",
    "OpenAI / LLM",
    "RAG",
    "pgvector",
    "Supabase",
    "Langfuse",
    "Docker",
    "AWS",
  ],
};

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  status: "live" | "wip" | "planned";
  role: string;
  period: string;
  tags: string[];
  // 케이스 스터디 본문
  problem: string;
  approach: string[];
  decisions: { label: string; detail: string }[];
  // 정량 결과 — TODO: 실제 측정값으로 교체
  metrics: { label: string; value: string }[];
  links: { label: string; href: string }[];
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "askdocs",
    title: "askdocs — Production RAG SaaS",
    oneLiner: "문서를 업로드하면 출처와 함께 답하는 멀티유저 RAG 제품",
    status: "live",
    role: "Solo / Full-stack + AI",
    period: "2026",
    tags: [
      "Next.js",
      "TypeScript",
      "OpenAI",
      "pgvector",
      "Supabase",
      "Langfuse",
      "RAG",
    ],
    problem:
      "대부분의 LLM 토이 프로젝트는 노트북 데모에서 끝난다. 인증·보안·관측·비용관리를 갖춘 '실제로 운영 가능한' RAG 제품을 처음부터 끝까지 만들 수 있음을 증명하고자 했다.",
    approach: [
      "PDF/텍스트 → 청킹 → 임베딩 → pgvector 저장의 수집 파이프라인 구축",
      "벡터 + BM25 키워드 검색을 RRF로 융합한 하이브리드 검색 구현",
      "커스텀 NDJSON 스트리밍으로 토큰·출처·사용량을 한 스트림에 전달",
      "쿼리별 토큰/비용/지연을 기록하고 대시보드로 가시화",
    ],
    decisions: [
      {
        label: "pgvector(Supabase) 선택",
        detail:
          "별도 벡터 DB 없이 Postgres 한 곳에서 데이터·벡터·권한(RLS)을 통합 관리.",
      },
      {
        label: "Row Level Security",
        detail:
          "검색 함수가 auth.uid()로 필터 → 앱 버그가 있어도 타인 문서 유출 불가.",
      },
      {
        label: "하이브리드 검색 + RRF",
        detail:
          "임베딩이 놓치는 약어·고유명사를 키워드 검색이 보강. 점수 정규화 없이 순위만 융합.",
      },
      {
        label: "응답 캐싱",
        detail: "동일 질문은 LLM 호출 없이 즉시 응답해 비용을 절감.",
      },
    ],
    metrics: [
      { label: "P95 응답 지연", value: "TODO ms" },
      { label: "캐시 비용 절감", value: "TODO %" },
      { label: "하이브리드 Recall@5", value: "TODO %" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/F0F8FF/rag-saas" },
      { label: "Live Demo", href: "https://rag-saas.vercel.app" },
    ],
    featured: true,
  },
  {
    slug: "agent-system",
    title: "Observable Agent System",
    oneLiner: "도구를 사용해 작업을 해결하는 자율 LLM 에이전트 + 실시간 트레이스 + 회귀 평가",
    status: "live",
    role: "Solo / AI Engineering",
    period: "2026",
    tags: [
      "Next.js",
      "TypeScript",
      "OpenAI",
      "Tool-use",
      "ReAct",
      "Langfuse",
      "Evals",
    ],
    problem:
      "에이전트는 '동작한다'를 넘어 관측 가능하고, 실패해도 복구하며, 품질을 측정할 수 있어야 운영 가능하다. 그 세 가지를 모두 갖춘 tool-using 에이전트를 만들었다.",
    approach: [
      "OpenAI function calling 기반 ReAct 루프로 도구 선택을 모델에 위임",
      "모든 단계(생각·도구호출·관측)를 NDJSON으로 실시간 스트리밍",
      "도구 오류를 컨텍스트로 환류해 모델이 스스로 교정하는 실패 복구",
      "라벨링 작업셋으로 성공률·스텝·비용을 측정하는 회귀 평가 하니스",
    ],
    decisions: [
      {
        label: "ReAct (tool-calling 루프)",
        detail:
          "도구 선택을 모델에 위임하되 단계마다 관측 가능하게 트레이스를 스트리밍.",
      },
      {
        label: "throw 대신 error 환류",
        detail:
          "도구는 절대 예외를 던지지 않고 error 문자열 반환 → 모델이 보고 스스로 복구.",
      },
      {
        label: "MAX_STEPS 하드캡",
        detail:
          "무한 루프/비용 폭주를 막고 스텝·토큰·비용을 전부 계측.",
      },
      {
        label: "Langfuse trace + span",
        detail: "단계별 trace를 외부에 기록해 운영 디버깅 가능.",
      },
    ],
    metrics: [
      { label: "작업 성공률", value: "TODO %" },
      { label: "평균 스텝 수", value: "TODO" },
      { label: "작업당 비용", value: "$TODO" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/F0F8FF/agent-system" },
      { label: "Live Demo", href: "https://agent-system-cyan.vercel.app" },
    ],
    featured: true,
  },
  {
    slug: "llm-judge",
    title: "LLM-as-a-Judge 평가 파이프라인",
    oneLiner: "LLM 응답 품질을 자동 채점 — 기준별 독립 채점 · 위치편향 제거 · 사람 일치율 측정",
    status: "live",
    role: "Solo / AI Engineering",
    period: "2026",
    tags: [
      "Next.js",
      "TypeScript",
      "OpenAI",
      "Structured Output",
      "Evaluation",
      "LLMOps",
    ],
    problem:
      "LLM 제품은 '잘하고 있는지'를 측정할 수 있어야 한다. LLM을 심판으로 쓰되, 위치 편향과 후광 효과를 제거하고 판정의 신뢰도를 사람 평가와의 일치율로 검증했다.",
    approach: [
      "기준(정확성·관련성·완결성·명확성·안전성)별 독립 호출로 후광 효과 제거",
      "A/B 순서를 바꿔 두 번 평가, 양방향 일치 시에만 승자 인정(위치 편향 제거)",
      "json_schema strict 구조화 출력으로 파싱 실패 0",
      "사람 라벨링 데이터셋으로 judge-human 일치율 측정",
    ],
    decisions: [
      {
        label: "기준당 독립 호출",
        detail:
          "한 번에 여러 기준을 매기면 점수가 서로 끌려가는 후광 효과 발생 → 분리로 독립성 확보.",
      },
      {
        label: "순서 스왑 + 일치 검사",
        detail:
          "A/B 위치 편향을 구조적으로 탐지·제거. 결과가 뒤집히면 무승부 처리.",
      },
      {
        label: "Structured Output (strict)",
        detail: "점수·판정을 항상 유효한 JSON으로 강제해 파싱 안정성 확보.",
      },
      {
        label: "temperature=0",
        detail: "평가의 재현성(일관성) 확보.",
      },
    ],
    metrics: [
      { label: "사람 평가 일치율", value: "TODO %" },
      { label: "위치편향 일관성", value: "TODO %" },
      { label: "평가 기준 수", value: "5" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/F0F8FF/llm-judge" },
      { label: "Live Demo", href: "https://llm-judge-sigma.vercel.app" },
    ],
    featured: true,
  },
];
