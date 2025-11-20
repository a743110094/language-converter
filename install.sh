#!/bin/bash

echo "🚀 智能语言转换工具 - 快速安装脚本"
echo "========================================"

# 检查Node.js是否已安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js (>= 14.0)"
    echo "   下载地址: https://nodejs.org/"
    exit 1
fi

# 检查npm是否已安装
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装，请先安装 npm"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"
echo ""

# 检查是否存在package.json
if [ ! -f "package.json" ]; then
    echo "❌ 未找到 package.json 文件，请确保在项目根目录运行此脚本"
    exit 1
fi

echo "📦 正在安装依赖包..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ 依赖安装成功！"
else
    echo "❌ 依赖安装失败，请检查网络连接或手动运行 'npm install'"
    exit 1
fi

echo ""

# 检查是否需要配置环境变量
if [ ! -f ".env" ]; then
    echo "⚙️  正在创建环境配置文件..."
    cp .env.example .env
    echo "✅ 已创建 .env 文件"
    echo ""
    echo "🔧 请编辑 .env 文件，配置您的API密钥："
    echo "   - API_KEY: 您的大语言模型API密钥"
    echo "   - API_BASE_URL: API基础URL (可选)"
    echo "   - MODEL_NAME: 模型名称 (可选)"
    echo "   - PORT: 服务端口 (可选)"
    echo ""
else
    echo "✅ .env 文件已存在"
fi

echo "🎉 安装完成！"
echo ""
echo "🚀 启动服务："
echo "   开发模式: npm run dev"
echo "   生产模式: npm start"
echo ""
echo "📖 查看详细说明: cat README.md"
echo ""

# 询问是否立即启动
read -p "是否现在启动开发服务器？(y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 正在启动开发服务器..."
    npm run dev
fi