// 配置文件 - 请勿将此文件提交到公开仓库
const CONFIG = {
    // 你的自定义OpenAI兼容API配置
    AI_API: {
        BASE_URL: '你的自定义API地址',  // 例如: https://api.your-domain.com/v1
        API_KEY: '你的API密钥',         // 从环境变量或安全存储获取
        MODEL: 'gpt-3.5-turbo'          // 或你自定义的模型名称
    },
    
    // 应用配置
    APP: {
        WORDS_PER_SESSION: 10,          // 每次学习/复习的单词数量
        DAILY_GOAL: 15                  // 每日学习目标
    }
};

// 注意：在实际部署时，建议使用环境变量或后端服务存储API密钥
// 避免在前端代码中硬编码敏感信息
