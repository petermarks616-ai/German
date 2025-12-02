// config.js
export const AI_CONFIG = {
    baseURL: 'https://gemini.beijixingxing.com/v1/chat/completions',
    apiKey: 'sk-piAuLNkpYsL0EzpM9EcR0hN8sej9eBIwV3rgeDJzgKi2hoYh',
    model: 'gemini-2.5-pro[真流-50/次]'
};

export const CONFIG = {
    DEBUG: true,
    PROVIDER: 'gemini',
    USE_FALLBACK: true,
    
    API_CONFIG: {
        gemini: {
            baseURL: 'https://gemini.beijixingxing.com/v1/chat/completions',
            apiKey: 'sk-piAuLNkpYsL0EzpM9EcR0hN8sej9eBIwV3rgeDJzgKi2hoYh',
            model: 'gemini-2.5-pro[真流-50/次]'
        },
        openai: {
            baseURL: 'https://api.openai.com/v1/chat/completions',
            apiKey: 'YOUR_API_KEY',
            model: 'gpt-3.5-turbo'
        }
    }
};
