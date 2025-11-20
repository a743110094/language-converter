const axios = require('axios');
const { generatePrompt } = require('../prompts/templates');

/**
 * 调用大语言模型API进行语言转换
 * @param {string} prompt - 提示词
 * @param {string} modelName - 模型名称
 * @param {string} apiKey - API密钥
 * @param {string} baseUrl - API基础URL
 * @returns {Promise<string>} 转换结果
 */
async function callLLM(prompt, modelName = 'gpt-3.5-turbo', apiKey, baseUrl) {
    try {
        const response = await axios.post(`${baseUrl}/chat/completions`, {
            model: modelName,
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            timeout: 30000 // 30秒超时
        });

        if (response.data && response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0].message.content.trim();
        } else {
            throw new Error('API响应格式异常');
        }

    } catch (error) {
        console.error('大模型API调用错误:', error.message);
        
        if (error.response) {
            // API返回错误状态码
            const status = error.response.status;
            const message = error.response.data?.error?.message || '未知错误';
            
            if (status === 401) {
                throw new Error('API密钥无效，请检查配置');
            } else if (status === 429) {
                throw new Error('API调用频率过高，请稍后重试');
            } else if (status === 500) {
                throw new Error('服务器内部错误，请稍后重试');
            } else {
                throw new Error(`API调用失败 (${status}): ${message}`);
            }
        } else if (error.code === 'ECONNABORTED') {
            throw new Error('API调用超时，请检查网络连接');
        } else {
            throw new Error(`网络请求失败: ${error.message}`);
        }
    }
}

/**
 * 直白转委婉转换
 * @param {string} text - 输入文本
 * @param {string} style - 风格类型 (gentle/strict)
 * @param {string} relationship - 关系类型 (leader/colleague/subordinate/client/supplier)
 * @returns {Promise<string>} 转换结果
 */
async function convertDirectToPolite(text, style, relationship = 'leader') {
    const config = {
        modelName: process.env.MODEL_NAME || 'gpt-3.5-turbo',
        apiKey: process.env.API_KEY,
        baseUrl: process.env.API_BASE_URL || 'https://api.openai.com/v1'
    };

    if (!config.apiKey) {
        throw new Error('API_KEY未配置，请检查环境变量');
    }

    // 生成完整的提示词
    const prompt = generatePrompt('direct-to-polite', style, relationship, text);
    
    return await callLLM(prompt, config.modelName, config.apiKey, config.baseUrl);
}

/**
 * 委婉转直白转换
 * @param {string} text - 输入文本
 * @param {string} relationship - 关系类型 (leader/colleague/subordinate/client/supplier)
 * @returns {Promise<string>} 转换结果
 */
async function convertPoliteToDirect(text, relationship = 'leader') {
    const config = {
        modelName: process.env.MODEL_NAME || 'gpt-3.5-turbo',
        apiKey: process.env.API_KEY,
        baseUrl: process.env.API_BASE_URL || 'https://api.openai.com/v1'
    };

    if (!config.apiKey) {
        throw new Error('API_KEY未配置，请检查环境变量');
    }

    // 生成完整的提示词（委婉转直白不需要style参数）
    const prompt = generatePrompt('polite-to-direct', 'gentle', relationship, text);
    
    return await callLLM(prompt, config.modelName, config.apiKey, config.baseUrl);
}

module.exports = {
    callLLM,
    convertDirectToPolite,
    convertPoliteToDirect
};