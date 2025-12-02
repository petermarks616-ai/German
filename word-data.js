// 单词数据库和管理函数
class WordManager {
    constructor() {
        this.words = this.loadWords();
        this.masteredWords = this.loadProgress('masteredWords', []);
        this.todayLearned = this.loadProgress('todayLearned', []);
        this.streakDays = this.loadProgress('streakDays', 0);
        this.lastStudyDate = this.loadProgress('lastStudyDate', null);
    }
    
    // 加载单词数据（可从本地或远程加载）
    async loadWords() {
        // 基础单词库
        const baseWords = [
            {
                id: 1,
                german: 'Haus',
                chinese: '房子',
                pos: 'n',
                example: 'Das Haus ist groß.'
            },
            // 更多单词...
        ];
        
        // 如果单词库为空，可以通过AI生成
        if (baseWords.length < 50) {
            await this.generateWordsWithAI(50 - baseWords.length);
        }
        
        return baseWords;
    }
    
    // 使用AI生成单词示例
    async generateWordsWithAI(count) {
        // 调用AI服务生成单词
        // 实现细节在ai-service.js中
    }
    
    // 获取今日要学习的新词
    getNewWords(count = CONFIG.APP.WORDS_PER_SESSION) {
        const unlearned = this.words.filter(w => 
            !this.masteredWords.includes(w.id) && 
            !this.todayLearned.includes(w.id)
        );
        return unlearned.slice(0, count);
    }
    
    // 获取需要复习的单词
    getReviewWords(count = CONFIG.APP.WORDS_PER_SESSION) {
        return this.masteredWords
            .map(id => this.words.find(w => w.id === id))
            .filter(w => w)
            .slice(0, count);
    }
    
    // 更新学习进度
    updateProgress(wordId, mastered = false) {
        if (mastered && !this.masteredWords.includes(wordId)) {
            this.masteredWords.push(wordId);
        }
        
        if (!this.todayLearned.includes(wordId)) {
            this.todayLearned.push(wordId);
        }
        
        this.saveProgress();
        this.updateStreak();
    }
    
    // 更新连续学习天数
    updateStreak() {
        const today = new Date().toDateString();
        if (this.lastStudyDate !== today) {
            if (this.lastStudyDate && 
                new Date(today) - new Date(this.lastStudyDate) === 86400000) {
                this.streakDays++;
            } else {
                this.streakDays = 1;
            }
            this.lastStudyDate = today;
            this.saveProgress();
        }
    }
    
    // 获取统计数据
    getStats() {
        return {
            mastered: this.masteredWords.length,
            todayLearned: this.todayLearned.length,
            streakDays: this.streakDays,
            totalWords: this.words.length
        };
    }
    
    // 本地存储相关方法
    saveProgress() {
        localStorage.setItem('wordData', JSON.stringify({
            masteredWords: this.masteredWords,
            todayLearned: this.todayLearned,
            streakDays: this.streakDays,
            lastStudyDate: this.lastStudyDate
        }));
    }
    
    loadProgress(key, defaultValue) {
        const data = JSON.parse(localStorage.getItem('wordData') || '{}');
        return data[key] !== undefined ? data[key] : defaultValue;
    }
}

// 导出单例实例
export const wordManager = new WordManager();
