import { NextRequest, NextResponse } from 'next/server';
import { convertPoliteToDirect } from '@/lib/llm-client';

export async function POST(request: NextRequest) {
  try {
    const { text, relation } = await request.json();
    const relationship = relation || 'leader';

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          error: '缺少必要参数：text',
        },
        { status: 400 }
      );
    }

    const result = await convertPoliteToDirect(text, relationship);

    return NextResponse.json({
      success: true,
      data: {
        original: text,
        relationship,
        result,
      },
    });
  } catch (error: any) {
    console.error('委婉转直白转换失败:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || '转换失败，请稍后重试',
      },
      { status: 500 }
    );
  }
}
