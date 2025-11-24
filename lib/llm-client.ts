import axios from 'axios';
import { generatePrompt } from './prompts';

export interface ConversionResult {
  success: boolean;
  data?: {
    original: string;
    style?: string;
    relationship: string;
    result: string;
  };
  error?: string;
}

/**
 * 调用大语言模型API进行语言转换
 */
async function callLLM(
  prompt: string,
  modelName = 'gpt-3.5-turbo',
  apiKey?: string,
  baseUrl?: string
): Promise<string> {
  try {
    if (!apiKey) {
      throw new Error('API_KEY未配置，请检查环境变量');
    }

    const response = await axios.post(
      `${baseUrl}/chat/completions`,
      {
        model: modelName,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        timeout: 30000,
      }
    );

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('API响应格式异常');
    }
  } catch (error: any) {
    console.error('大模型API调用错误:', error.message);

    if (error.response) {
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
 */
export async function convertDirectToPolite(
  text: string,
  style: string,
  relationship = 'leader'
): Promise<string> {
  const config = {
    modelName: process.env.MODEL_NAME || 'gpt-3.5-turbo',
    apiKey: process.env.API_KEY,
    baseUrl: process.env.API_BASE_URL || 'https://api.openai.com/v1',
  };

  if (!config.apiKey) {
    throw new Error('API_KEY未配置，请检查环境变量');
  }

  const prompt = generatePrompt('direct-to-polite', style, relationship, text);
  return await callLLM(prompt, config.modelName, config.apiKey, config.baseUrl);
}

/**
 * 委婉转直白转换
 */
export async function convertPoliteToDirect(
  text: string,
  relationship = 'leader'
): Promise<string> {
  const config = {
    modelName: process.env.MODEL_NAME || 'gpt-3.5-turbo',
    apiKey: process.env.API_KEY,
    baseUrl: process.env.API_BASE_URL || 'https://api.openai.com/v1',
  };

  if (!config.apiKey) {
    throw new Error('API_KEY未配置，请检查环境变量');
  }

  const prompt = generatePrompt('polite-to-direct', 'gentle', relationship, text);
  return await callLLM(prompt, config.modelName, config.apiKey, config.baseUrl);
}
