import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabaseAdmin } from '@/lib/supabase';
import { SYSTEM_PROMPT, buildUserPrompt } from '@/lib/prompt';
import { Book, RecommendRequest } from '@/lib/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body: RecommendRequest = await req.json();
    const { years_exp, concern } = body;

    if (!years_exp || !concern || concern.trim().length < 10) {
      return NextResponse.json(
        { data: null, error: '연차와 고민을 올바르게 입력해주세요.' },
        { status: 400 }
      );
    }

    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(years_exp, concern) },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 2048,
    });

    const responseText = completion.choices[0].message.content;
    if (!responseText) throw new Error('OpenAI 응답이 비어있습니다.');

    // JSON 파싱
    let books: Book[];
    try {
      const parsed = JSON.parse(responseText);
      books = parsed.books;
    } catch {
      throw new Error('응답 파싱에 실패했습니다.');
    }

    // Supabase 저장
    const db = supabaseAdmin();
    const { data, error } = await db
      .from('recommendations')
      .insert({ years_exp, concern, books })
      .select('id')
      .single();

    if (error) throw new Error(`DB 저장 실패: ${error.message}`);

    return NextResponse.json({ data: { id: data.id, books }, error: null });
  } catch (err) {
    console.error('[recommend API error]', err);
    return NextResponse.json(
      { data: null, error: '추천 생성에 실패했습니다. 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
