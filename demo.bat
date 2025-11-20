@echo off
chcp 65001 >nul
echo 🎯 智能语言转换工具 - 功能演示
echo ===================================
echo.

echo 🔍 检查服务状态...
curl -s http://localhost:3000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ 服务正在运行
) else (
    echo ⚠️  服务未运行，请先启动服务：npm run dev
    echo.
    set /p START_NOW="是否现在启动服务并继续演示？(Y/N): "
    if /i "%START_NOW%"=="Y" (
        echo 🚀 启动服务...
        start cmd /k "npm run dev"
        echo ⏳ 等待服务启动...
        timeout /t 5 /nobreak >nul
    ) else (
        echo 演示结束
        exit /b 0
    )
)

echo.
echo 📝 演示用例 1: 直白转委婉
echo 输入: 这个方案不行，需要重新做
echo 转换中...

REM 模拟直白转委婉转换
curl -s -X POST http://localhost:3000/api/convert/direct-to-polite -H "Content-Type: application/json" -d "{\"text\": \"这个方案不行，需要重新做\", \"style\": \"gentle\"}"

echo.
echo ==================================
echo 📝 演示用例 2: 委婉转直白
echo 输入: 我觉得这个方案还有进一步讨论的空间
echo 转换中...

REM 模拟委婉转直白转换
curl -s -X POST http://localhost:3000/api/convert/polite-to-direct -H "Content-Type: application/json" -d "{\"text\": \"我觉得这个方案还有进一步讨论的空间\", \"style\": \"gentle\"}"

echo.
echo ==================================
echo 🎯 演示完成！
echo.
echo 📖 详细使用说明请访问: http://localhost:3000
echo 📚 查看API文档: type README.md
echo.

pause