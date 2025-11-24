import { NextResponse } from 'next/server';

// 示例数据
const examples = {
  'direct-to-polite': {
    title: '直白转委婉示例',
    cases: [
      {
        original: '这个方案不行，需要重新做',
        converted: '这个方案可能还有进一步优化的空间，我们是否可以一起探讨一下改进的方向？',
        style: 'gentle',
        relationship: 'leader',
      },
      {
        original: '你这样做是错的',
        converted: '这样做可能不太合适，我建议我们可以换个思路试试',
        style: 'gentle',
        relationship: 'colleague',
      },
      {
        original: '马上给我',
        converted: '麻烦您现在给我一下，谢谢',
        style: 'gentle',
        relationship: 'colleague',
      },
    ],
  },
  'polite-to-direct': {
    title: '委婉转直白示例',
    cases: [
      {
        original: '我觉得这个方案可能还有讨论的空间',
        converted: '这个方案不行，需要重新做',
        relationship: 'leader',
      },
      {
        original: '或许我们可以考虑其他的方式',
        converted: '这个方法不行，用另一种方式',
        relationship: 'colleague',
      },
    ],
  },
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: examples,
  });
}
