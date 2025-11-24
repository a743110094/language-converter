import { NextRequest, NextResponse } from 'next/server';
import { convertDirectToPolite } from '@/lib/llm-client';

export async function POST(request: NextRequest) {
  try {
    const { text, style, relation } = await request.json();
    const relationship = relation || 'leader';

    if (!text || !style) {
      return NextResponse.json(
        {
          success: false,
          error: '缺少必要参数：text和style',
        },
        { status: 400 }
      );
    }

    const result = await convertDirectToPolite(text, style, relationship);

    return NextResponse.json({
      success: true,
      data: {
        original: text,
        style,
        relationship,
        result,
      },
    });
  } catch (error: any) {
    console.error('直白转委婉转换失败:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || '转换失败，请稍后重试',
      },
      { status: 500 }
    );
  }
}
