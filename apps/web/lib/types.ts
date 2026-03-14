export type YearsExp = '0~1년차' | '2~3년차' | '4~7년차' | '8년차 이상';

export interface Book {
  title: string;
  author: string;
  reason: string;
  core_values: string[];
  ground_rules: string[];
}

export interface Recommendation {
  id: string;
  years_exp: YearsExp;
  concern: string;
  books: Book[];
  created_at: string;
}

export interface RecommendRequest {
  years_exp: YearsExp;
  concern: string;
}

export interface RecommendResponse {
  data: { id: string; books: Book[] } | null;
  error: string | null;
}
