#!/bin/bash

echo "🎯 智能语言转换工具 - 功能演示"
echo "================================="
echo ""

# 检查服务是否运行
echo "🔍 检查服务状态..."
if curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ 服务正在运行"
else
    echo "⚠️  服务未运行，请先启动服务：npm run dev"
    echo ""
    read -p "是否现在启动服务并继续演示？(y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🚀 启动服务..."
        npm run dev &
        echo "⏳ 等待服务启动..."
        sleep 5
    else
        echo "演示结束"
        exit 0
    fi
fi

echo ""
echo "📝 演示用例 1: 直白转委婉"
echo "输入: 这个方案不行，需要重新做"
echo "转换中..."

# 模拟直白转委婉转换
curl -s -X POST http://localhost:3000/api/convert/direct-to-polite \
  -H "Content-Type: application/json" \
  -d '{"text": "这个方案不行，需要重新做", "style": "gentle"}' | jq -r '.data.result' 2>/dev/null || echo "请确保安装了jq工具或手动查看JSON响应"

echo ""
echo "=================================="
echo "📝 演示用例 2: 委婉转直白"
echo "输入: 我觉得这个方案还有进一步讨论的空间"
echo "转换中..."

# 模拟委婉转直白转换
curl -s -X POST http://localhost:3000/api/convert/polite-to-direct \
  -H "Content-Type: application/json" \
  -d '{"text": "我觉得这个方案还有进一步讨论的空间", "style": "gentle"}' | jq -r '.data.result' 2>/dev/null || echo "请确保安装了jq工具或手动查看JSON响应"

echo ""
echo "=================================="
echo "🎯 演示完成！"
echo ""
echo "📖 详细使用说明请访问: http://localhost:3000"
echo "📚 查看API文档: cat README.md"
echo ""