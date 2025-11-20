# 语言表达优化工具

一个AI智能沟通顾问，帮助用户优化语言表达，提供委婉转直白和直白转委婉的智能转换服务。

## ✨ 功能特色

### 核心功能
- **直白转委婉**：将直接、生硬的表达转换为礼貌、委婉的高情商语言
- **委婉转直白**：将含蓄、礼貌的表达转换为直接、易懂的表达
- **智能风格适配**：根据沟通对象关系自动调整表达方式
- **多选项输出**：提供多个转换选项，便于选择最合适的表达

### 专业特性
- **4种表达风格**：
  - **温和型**：和蔼友好，避免冲突
  - **严格型**：专业严肃，权威明确  
  - **中性型**：客观平衡，理性表达
  - **情绪价值型**：温暖贴心，富有共鸣

- **5种沟通关系**：
  - **领导**：尊重礼貌的表达方式
  - **同事**：平等友好的沟通风格
  - **下属**：清晰直接的指导表达
  - **客户**：专业礼貌的服务态度
  - **供应商**：商务合作的专业表达

## 🚀 快速开始

### 环境要求
- Node.js 16+ 
- npm 或 yarn

### 安装步骤

1. **安装依赖**
```bash
npm install
```

2. **配置环境变量**
```bash
cp .env.example .env
```

编辑 `.env` 文件，配置您的API密钥：
```env
API_KEY=your_openai_api_key_here
API_BASE_URL=https://api.openai.com/v1
MODEL_NAME=gpt-3.5-turbo
PORT=3000
```

3. **启动服务**
```bash
npm run dev
```

4. **访问应用**
打开浏览器访问：`http://localhost:3000`

## 📱 界面预览

### 主要界面
- **简洁清爽**：去除花哨的紫色背景，采用专业的蓝白配色方案
- **左右布局**：左侧控制面板，右侧结果展示，操作直观便捷
- **响应式设计**：完美适配桌面和移动设备

### 操作流程
1. 选择转换类型（直白→委婉 / 委婉→直白）
2. 输入需要转换的文本内容
3. 选择沟通对象关系
4. 选择合适的表达风格
5. 点击转换按钮获得优化结果

## 🛠️ 技术架构

### 前端技术
- **HTML5 + CSS3 + Vanilla JavaScript**：轻量级实现，无框架依赖
- **现代CSS Grid布局**：响应式设计，适配各种屏幕
- **CSS变量系统**：统一的设计语言，易于维护

### 后端技术
- **Node.js + Express**：轻量级服务器架构
- **OpenAI API集成**：大语言模型驱动的智能转换
- **RESTful API设计**：清晰的接口规范

### 核心技术特性
- **提示词工程**：精心设计的提示词模板，确保输出质量
- **严格输出控制**：要求模型只返回转换结果，无冗余内容
- **关系导向转换**：根据沟通对象自动调整表达策略

## 📋 API文档

### 转换接口

#### 直白转委婉
```http
POST /api/convert/direct-to-polite
Content-Type: application/json

{
  "text": "这个方案不行，需要重新做",
  "style": "gentle", // gentle, strict, neutral, emotional
  "relation": "leader" // leader, colleague, subordinate, client, supplier
}
```

#### 委婉转直白
```http
POST /api/convert/polite-to-direct
Content-Type: application/json

{
  "text": "我觉得这个方案还有进一步讨论的空间",
  "style": "gentle",
  "relation": "leader"
}
```

### 响应格式
```json
{
  "success": true,
  "data": {
    "original": "原始文本",
    "style": "gentle",
    "relationship": "leader",
    "result": "转换结果..."
  }
}
```

### 错误响应
```json
{
  "success": false,
  "error": "错误描述信息"
}
```

## 🎯 使用场景

### 职场沟通
- **向上级汇报**：将直接的问题反馈转换为委婉的请示
- **申请资源**：礼貌地表达需求和困难
- **团队协调**：处理工作分歧和冲突

### 商务合作  
- **客户沟通**：专业礼貌地处理客户需求
- **供应商协调**：商务合作中的专业表达
- **商务谈判**：灵活运用不同表达策略

### 日常办公
- **邮件写作**：优化工作邮件的表达方式
- **会议发言**：提升口头表达的专业性
- **文档撰写**：优化正式文档的语言风格

## 🎨 设计理念

### 用户体验优先
- **简洁界面**：去除不必要的视觉元素，专注于功能本身
- **操作直观**：清晰的功能布局，降低学习成本
- **即时反馈**：实时的操作反馈和状态提示

### 专业性导向
- **商务配色**：采用专业的蓝白配色方案
- **现代字体**：Inter字体族，提升阅读体验
- **一致性设计**：统一的设计语言和交互模式

### 技术可靠性
- **错误处理**：完善的错误捕获和用户提示
- **数据持久化**：本地存储用户输入历史
- **性能优化**：代码压缩和资源优化

## 📝 开发说明

### 项目结构
```
language-converter/
├── public/                 # 前端静态文件
│   ├── index.html         # 主页面
│   ├── css/
│   │   └── style.css      # 主样式文件
│   └── js/
│       └── app.js         # 主JavaScript文件
├── server/                # 后端服务
│   ├── app.js            # Express应用入口
│   └── llm-client.js     # LLM API客户端
├── prompts/              # 提示词模板
│   ├── templates.js      # 提示词模板
│   └── examples.js       # 示例数据
├── package.json          # 项目配置
└── README.md            # 项目文档
```

### 配置说明
- **API_KEY**: OpenAI或其他兼容API的密钥
- **API_BASE_URL**: API基础URL（默认为OpenAI官方地址）
- **MODEL_NAME**: 使用的模型名称（默认为gpt-3.5-turbo）
- **PORT**: 服务器端口（默认为3000）

## 🔧 自定义扩展

### 添加新的风格类型
在 `prompts/templates.js` 中添加新的风格定义：
```javascript
const newStylePrompts = {
  // ... 现有风格
  custom: `自定义风格的提示词模板...`
};
```

### 添加新的关系类型
在 `relationshipConfig` 中添加新的关系定义：
```javascript
const relationshipConfig = {
  // ... 现有关系
  newRelation: {
    name: '新关系',
    description: '描述',
    style: '表达风格'
  }
};
```

## 🐛 故障排除

### 常见问题

**Q: 转换失败怎么办？**
A: 检查网络连接和API配置，确保API密钥有效且未超出调用限制

**Q: 转换结果不理想怎么办？**
A: 尝试调整输入文本的清晰度，或选择不同的风格类型和沟通关系

**Q: 如何提高转换质量？**
A: 提供更具体、明确的输入文本，避免歧义表达，适当调整风格和关系设置

**Q: 支持其他语言吗？**
A: 当前主要支持中文，可通过修改提示词模板支持其他语言

### 调试模式
启用详细日志：
```env
NODE_ENV=development
```

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献指南

欢迎提交Issue和Pull Request来帮助改进这个项目！

---

**MiniMax Agent** - 专业的AI助手，致力于提供高质量的工具和服务