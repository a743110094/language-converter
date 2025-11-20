// 使用示例数据
const examples = {
  directToPolite: [
    {
      original: "这个方案不行，需要重新做",
      category: "方案评价",
      difficulty: "medium",
      relationship: "leader"
    },
    {
      original: "你这项工作做得很差",
      category: "工作反馈",
      difficulty: "high",
      relationship: "subordinate"
    },
    {
      original: "领导，我想涨工资",
      category: "薪酬沟通",
      difficulty: "high",
      relationship: "leader"
    },
    {
      original: "这个任务很简单，你肯定能做",
      category: "任务分配",
      difficulty: "low",
      relationship: "subordinate"
    },
    {
      original: "会议室被你占了，我们没地方开会",
      category: "资源冲突",
      difficulty: "medium",
      relationship: "colleague"
    },
    {
      original: "你们的报价太高了",
      category: "商务谈判",
      difficulty: "medium",
      relationship: "supplier"
    },
    {
      original: "这个需求我们实现不了",
      category: "需求沟通",
      difficulty: "high",
      relationship: "client"
    }
  ],
  politeToDirect: [
    {
      original: "我觉得这个方案可能还有一些优化的空间",
      category: "方案评价",
      difficulty: "medium",
      relationship: "leader"
    },
    {
      original: "您这项工作还有很大的提升潜力",
      category: "工作反馈",
      difficulty: "medium",
      relationship: "subordinate"
    },
    {
      original: "希望能够在薪酬待遇方面有所调整",
      category: "薪酬沟通",
      difficulty: "high",
      relationship: "leader"
    },
    {
      original: "这个任务对您来说应该不会有什么问题",
      category: "任务分配",
      difficulty: "low",
      relationship: "subordinate"
    },
    {
      original: "会议室的使用时间可能需要重新协调一下",
      category: "资源冲突",
      difficulty: "medium",
      relationship: "colleague"
    },
    {
      original: "我们考虑一下这个价格的可行性",
      category: "商务谈判",
      difficulty: "medium",
      relationship: "supplier"
    },
    {
      original: "技术上存在一定的挑战性",
      category: "需求沟通",
      difficulty: "high",
      relationship: "client"
    }
  ]
};

const usageGuide = {
  title: "使用指南",
  sections: [
    {
      title: "工具功能",
      content: [
        "直白→委婉转换：将直接、生硬的表达转换为礼貌、委婉的语言",
        "委婉→直白转换：将含蓄、礼貌的表达转换为直接、易懂的表达",
        "双风格支持：温和型适合和蔼型领导，严格型适合专业型领导",
        "关系导向：根据与沟通对象的关系调整表达方式"
      ]
    },
    {
      title: "沟通对象关系",
      content: [
        "领导：需要尊重和礼貌的表达方式，使用敬语和谦逊措辞",
        "同事：平等友好的沟通风格，保持友好但不过度客气",
        "下属：清晰直接的指导表达，适当使用指导性语言",
        "客户：专业礼貌的服务态度，使用服务导向的表达",
        "供应商：商务合作的专业表达，使用合作导向的表达"
      ]
    },
    {
      title: "使用场景",
      content: [
        "向上级汇报工作进度和困难",
        "申请资源支持或薪酬调整",
        "反馈工作问题和改进建议",
        "处理团队冲突和协调",
        "客户沟通和商务合作"
      ]
    },
    {
      title: "使用技巧",
      content: [
        "根据沟通对象的关系选择合适的风格",
        "结合具体场景调整表达方式",
        "保留核心信息，优化表达技巧",
        "灵活运用转换结果，避免生硬套用"
      ]
    }
  ]
};

module.exports = {
  examples,
  usageGuide
};