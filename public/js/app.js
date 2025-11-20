// 全局状态管理
let currentConversionType = 'direct-to-polite';

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 初始化应用
function initializeApp() {
    setupTypeSelection();
    setupStyleSelection();
    setupConvertButton();
    setupActionButtons();
    setupKeyboardShortcuts();
    
    console.log('🎯 AI智能沟通助手已初始化');
}

// 设置转换类型选择
function setupTypeSelection() {
    const typeButtons = document.querySelectorAll('.type-btn');
    
    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            typeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 更新当前转换类型
            currentConversionType = btn.getAttribute('data-type');
            
            // 更新转换按钮文本
            updateConvertButtonText();
            
            // 控制风格选项的显示/隐藏
            toggleStyleSelector();
            
            console.log('转换类型已切换:', currentConversionType);
        });
    });
}

// 设置表达风格选择 (依赖原生radio button)
function setupStyleSelection() {
    const styleRadios = document.querySelectorAll('input[name="style"]');
    
    styleRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            // 原生radio button会自动处理单选逻辑
            console.log('风格已切换到:', radio.value);
        });
    });
}

// 控制风格选择器的显示/隐藏
function toggleStyleSelector() {
    const styleSection = document.getElementById('style-section');
    
    if (currentConversionType === 'polite-to-direct') {
        // 委婉转直白时隐藏风格选择器
        styleSection.style.display = 'none';
    } else {
        // 直白转委婉时显示风格选择器
        styleSection.style.display = 'block';
    }
}

// 更新转换按钮文本
function updateConvertButtonText() {
    const btnText = document.querySelector('.btn-text');
    const convertBtn = document.getElementById('convert-btn');
    
    if (currentConversionType === 'direct-to-polite') {
        btnText.textContent = '✨ 优化为温和表达';
        convertBtn.setAttribute('title', '将直白表达转换为温和优雅的表达');
    } else {
        btnText.textContent = '⚡ 优化为直接表达';
        convertBtn.setAttribute('title', '将委婉表达转换为直接明确的表达');
    }
}

// 设置转换按钮
function setupConvertButton() {
    document.getElementById('convert-btn').addEventListener('click', handleConversion);
}

// 设置操作按钮
function setupActionButtons() {
    // 复制结果按钮
    document.getElementById('copy-btn').addEventListener('click', copyResult);
    
    // 清空内容按钮
    document.getElementById('clear-btn').addEventListener('click', clearContent);
}

// 设置键盘快捷键
function setupKeyboardShortcuts() {
    // Ctrl/Cmd + Enter 快速转换
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            handleConversion();
        }
    });
    
    // ESC 清空内容
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            clearContent();
        }
    });
}

// 处理转换逻辑
async function handleConversion() {
    const inputText = document.getElementById('input-text').value.trim();
    const relationship = document.getElementById('relationship').value;
    const style = document.querySelector('input[name="style"]:checked')?.value || 'gentle';
    
    // 验证输入
    if (!inputText) {
        showNotification('📝 请输入需要优化的文本', 'error');
        document.getElementById('input-text').focus();
        return;
    }
    
    // 获取UI元素
    const convertBtn = document.getElementById('convert-btn');
    const loadingState = document.getElementById('loading-state');
    const resultContent = document.getElementById('result-content');
    
    // 显示加载状态
    convertBtn.disabled = true;
    loadingState.style.display = 'flex';
    resultContent.style.display = 'none';
    
    // 更新按钮文本
    const btnText = document.querySelector('.btn-text');
    const originalText = btnText.textContent;
    btnText.textContent = '🤖 AI思考中...';
    
    try {
        // 确定API端点
        const endpoint = currentConversionType === 'direct-to-polite' 
            ? '/api/convert/direct-to-polite' 
            : '/api/convert/polite-to-direct';
        
        // 构建请求体
        const requestBody = {
            text: inputText,
            relation: relationship  // 注意：后端期望的是 'relation' 参数
        };
        
        // 只有直白转委婉时才传递style参数
        if (currentConversionType === 'direct-to-polite') {
            requestBody.style = style;
        }
        
        // 发送转换请求
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        const result = await response.json();
        
        if (result.success) {
            displayResult(result.data.result);
        } else {
            throw new Error(result.error || '转换失败，请稍后重试');
        }
        
    } catch (error) {
        console.error('转换错误:', error);
        displayError(error.message);
    } finally {
        // 恢复UI状态
        convertBtn.disabled = false;
        loadingState.style.display = 'none';
        resultContent.style.display = 'block';
        btnText.textContent = originalText;
    }
}

// 显示转换结果
function displayResult(result) {
    const resultContent = document.getElementById('result-content');
    
    // 格式化结果文本
    const formattedResult = formatResultText(result);
    
    resultContent.innerHTML = `
        <div class="result-text">${formattedResult}</div>
    `;
    
    // 滚动到结果区域
    resultContent.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
    
    showNotification('✨ 优化完成！', 'success');
}

// 显示错误信息
function displayError(message) {
    const resultContent = document.getElementById('result-content');
    
    resultContent.innerHTML = `
        <div class="error-state">
            <div class="error-icon">
                <div class="error-emoji">😔</div>
            </div>
            <h4>转换失败</h4>
            <p>${message}</p>
            <button class="retry-btn" onclick="handleConversion()">🔄 重试</button>
        </div>
    `;
    
    showNotification('❌ 转换失败', 'error');
}

// 格式化结果文本
function formatResultText(text) {
    if (!text) return '转换结果为空';
    
    // 处理Markdown格式的文本
    return text
        // 粗体文本
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // 斜体文本
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // 换行
        .replace(/\n/g, '<br>')
        // 处理选项标记
        .replace(/\*\*(选项\d+)[：:]\s*/g, '<div class="option-header"><strong>$1：</strong></div>');
}

// 复制结果
async function copyResult() {
    const resultContent = document.getElementById('result-content');
    const resultText = resultContent.querySelector('.result-text');
    
    if (!resultText) {
        showNotification('📋 没有可复制的内容', 'info');
        return;
    }
    
    const textToCopy = resultText.textContent || resultText.innerText;
    
    if (!textToCopy.trim()) {
        showNotification('📋 转换结果为空', 'info');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(textToCopy.trim());
        showNotification('📋 已复制到剪贴板', 'success');
    } catch (error) {
        console.error('复制失败:', error);
        // 降级方案：创建临时文本域
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy.trim();
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('📋 已复制到剪贴板', 'success');
    }
}

// 清空内容
function clearContent() {
    // 清空输入框
    document.getElementById('input-text').value = '';
    
    // 重置选择器
    document.getElementById('relationship').value = 'leader';
    
    // 重置风格选择器
    const styleRadios = document.querySelectorAll('input[name="style"]');
    styleRadios.forEach(radio => {
        radio.checked = radio.value === 'gentle';
    });
    // 原生radio button会自动处理选中状态，不需要手动操作.selected类
    
    // 恢复默认状态
    document.querySelector('.type-btn.active').classList.remove('active');
    document.querySelector('.type-btn[data-type="direct-to-polite"]').classList.add('active');
    currentConversionType = 'direct-to-polite';
    updateConvertButtonText();
    
    // 恢复UI状态（显示风格选择器）
    toggleStyleSelector();
    
    // 恢复结果区域为空状态
    const resultContent = document.getElementById('result-content');
    resultContent.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">
                <div class="empty-emoji">💭</div>
            </div>
            <h4>🎯 开始使用</h4>
            <p>输入需要优化的文本，选择合适的沟通对象和表达风格，点击优化按钮即可获得更优雅的表达方式。</p>
            <div class="usage-tips">
                <h5>💡 使用小贴士：</h5>
                <ul>
                    <li>🌟 输入越具体，优化效果越好</li>
                    <li>🎯 选择准确的沟通对象很重要</li>
                    <li>🎨 不同风格适合不同场景</li>
                </ul>
            </div>
        </div>
    `;
    
    // 聚焦到输入框
    document.getElementById('input-text').focus();
    
    showNotification('🧹 内容已清空', 'success');
}

// 显示通知
function showNotification(message, type = 'info') {
    // 移除已存在的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建新通知
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconMap = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <span class="notification-icon">${iconMap[type] || iconMap.info}</span>
        <span class="notification-message">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // 自动隐藏
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 自动保存输入内容
function autoSave() {
    const inputText = document.getElementById('input-text').value;
    const relationship = document.getElementById('relationship').value;
    const style = document.querySelector('input[name="style"]:checked')?.value || 'gentle';
    
    const data = {
        text: inputText,
        relationship: relationship,
        style: style,
        conversionType: currentConversionType,
        timestamp: Date.now()
    };
    
    try {
        localStorage.setItem('language-converter-data', JSON.stringify(data));
    } catch (error) {
        console.warn('保存数据失败:', error);
    }
}

// 恢复自动保存的内容
function restoreSavedData() {
    try {
        const savedData = localStorage.getItem('language-converter-data');
        if (!savedData) return;
        
        const data = JSON.parse(savedData);
        
        // 检查数据是否过期（24小时）
        if (Date.now() - data.timestamp > 24 * 60 * 60 * 1000) {
            localStorage.removeItem('language-converter-data');
            return;
        }
        
        // 恢复数据
        if (data.text) document.getElementById('input-text').value = data.text;
        if (data.relationship) document.getElementById('relationship').value = data.relationship;
        if (data.style) {
            // 恢复radio button选择
            const styleRadio = document.querySelector(`input[name="style"][value="${data.style}"]`);
            if (styleRadio) {
                styleRadio.checked = true;
            }
        }
        if (data.conversionType) {
            document.querySelector('.type-btn.active').classList.remove('active');
            document.querySelector(`.type-btn[data-type="${data.conversionType}"]`).classList.add('active');
            currentConversionType = data.conversionType;
            updateConvertButtonText();
        }
        
    } catch (error) {
        console.warn('恢复保存数据失败:', error);
    }
}

// 监听输入变化，自动保存
let saveTimeout;
document.addEventListener('input', (e) => {
    if (e.target.matches('#input-text, #relationship, input[name="style"]')) {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(autoSave, 500);
    }
});

// 页面加载时恢复数据
window.addEventListener('load', restoreSavedData);

// 错误处理
window.addEventListener('error', (e) => {
    console.error('页面错误:', e.error);
});

// 未处理的Promise错误
window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise错误:', e.reason);
    e.preventDefault();
});

// 性能监控
if (typeof performance !== 'undefined') {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`📊 页面加载时间: ${loadTime}ms`);
    });
}

// 添加增强的通知样式
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        color: white;
        font-weight: 500;
        font-size: 0.875rem;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 320px;
        box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        background: linear-gradient(135deg, #059669, #10b981);
    }
    
    .notification-error {
        background: linear-gradient(135deg, #dc2626, #ef4444);
    }
    
    .notification-info {
        background: linear-gradient(135deg, #2563eb, #3b82f6);
    }
    
    .notification-icon {
        font-size: 1rem;
        font-weight: bold;
    }
    
    .error-state {
        text-align: center;
        padding: 3rem 1rem;
        color: var(--text-secondary);
    }
    
    .error-icon {
        margin-bottom: 1rem;
    }
    
    .error-emoji {
        font-size: 3rem;
        opacity: 0.7;
    }
    
    .error-state h4 {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }
    
    .error-state p {
        font-size: 0.875rem;
        margin-bottom: 1.5rem;
        color: var(--text-secondary);
    }
    
    .retry-btn {
        padding: 0.5rem 1rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    
    .retry-btn:hover {
        background: var(--primary-dark);
    }
    
    .result-text {
        white-space: pre-wrap;
        font-size: 0.875rem;
        line-height: 1.6;
        color: var(--text-primary);
    }
    
    .option-header {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
    
    .option-header:first-child {
        margin-top: 0;
    }
    
    // 移除.style-card.selected样式，现在依赖原生radio button:checked状态
`;

// 动态添加样式
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// 添加页面进入动画
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.control-card, .result-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
});

console.log('🚀 AI智能沟通助手JavaScript已加载完成');