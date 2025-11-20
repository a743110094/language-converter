const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const { generatePrompt, getRelationshipConfig } = require('../prompts/templates');
const { examples, usageGuide } = require('../prompts/examples');
const { convertDirectToPolite, convertPoliteToDirect } = require('./llm-client');

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// 大模型API调用已在 llm-client.js 中实现

// API路由

// 获取示例数据
app.get('/api/examples', (req, res) => {
  res.json({
    success: true,
    data: examples
  });
});

// 获取使用指南
app.get('/api/usage-guide', (req, res) => {
  res.json({
    success: true,
    data: usageGuide
  });
});

// 直白转委婉
app.post('/api/convert/direct-to-polite', async (req, res) => {
  try {
    const { text, style, relation } = req.body;
    const relationship = relation || 'leader'; // 支持relation或relationship参数
    
    if (!text || !style) {
      return res.status(400).json({
        success: false,
        error: '缺少必要参数：text和style'
      });
    }
    
    if (!['gentle', 'strict', 'neutral', 'emotional'].includes(style)) {
      return res.status(400).json({
        success: false,
        error: 'style必须是gentle、strict、neutral或emotional'
      });
    }
    
    if (!['leader', 'colleague', 'subordinate', 'client', 'supplier'].includes(relationship)) {
      return res.status(400).json({
        success: false,
        error: 'relationship必须是leader、colleague、subordinate、client或supplier之一'
      });
    }
    
    const response = await convertDirectToPolite(text, style, relationship);
    
    res.json({
      success: true,
      data: {
        original: text,
        style,
        relationship,
        result: response
      }
    });
    
  } catch (error) {
    console.error('转换错误:', error);
    res.status(500).json({
      success: false,
      error: error.message || '转换失败，请稍后重试'
    });
  }
});

// 委婉转直白
app.post('/api/convert/polite-to-direct', async (req, res) => {
  try {
    const { text, relation } = req.body;
    const relationship = relation || 'leader'; // 支持relation或relationship参数
    
    if (!text) {
      return res.status(400).json({
        success: false,
        error: '缺少必要参数：text'
      });
    }
    
    if (!['leader', 'colleague', 'subordinate', 'client', 'supplier'].includes(relationship)) {
      return res.status(400).json({
        success: false,
        error: 'relationship必须是leader、colleague、subordinate、client或supplier之一'
      });
    }
    
    const response = await convertPoliteToDirect(text, relationship);
    
    res.json({
      success: true,
      data: {
        original: text,
        relationship,
        result: response
      }
    });
    
  } catch (error) {
    console.error('转换错误:', error);
    res.status(500).json({
      success: false,
      error: error.message || '转换失败，请稍后重试'
    });
  }
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '服务运行正常'
  });
});

// 根路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 语言转换服务启动成功！`);
  console.log(`📱 访问地址: http://localhost:${PORT}`);
  console.log(`🔧 开发模式: ${process.env.NODE_ENV === 'development'}`);
});