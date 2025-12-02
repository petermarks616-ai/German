// review-old.js - 修正版
import { ProgressManager } from './progress.js';

class ReviewOldWords {
    constructor() {
        console.log('🔧 ReviewOldWords 初始化');
        this.currentIndex = 0;
        this.words = [];
        this.currentWord = null;
        this.options = [];
        this.correctCount = 0;
        this.wrongCount = 0;
        this.startTime = null;
        this.progressManager = new ProgressManager();
        this.init();
    }

    async init() {
        console.log('📋 开始初始化复习');
        
        // 显示模式选择器
        this.showModeSelector();
        
        // 设置事件监听器
        this.setupEventListeners();
    }

    showModeSelector() {
        console.log('🎮 显示模式选择器');
        // 确保模式选择器可见
        document.getElementById('modeSelector').style.display = 'block';
        document.getElementById('reviewCard').style.display = 'none';
        document.getElementById('learningCard').style.display = 'none';
    }

    setupEventListeners() {
        console.log('🔗 设置事件监听器');
        
        // 开始复习按钮
        const startReviewBtn = document.getElementById('startReviewBtn');
        if (startReviewBtn) {
            startReviewBtn.addEventListener('click', () => {
                console.log('🚀 开始复习');
                this.startReview();
            });
        }
        
        // 模式选择卡片
        const modeCards = document.querySelectorAll('.mode-card');
        modeCards.forEach(card => {
            card.addEventListener('click', () => {
                // 移除所有 active 类
                modeCards.forEach(c => c.classList.remove('active'));
                // 添加 active 类到点击的卡片
                card.classList.add('active');
            });
        });
    }

    async startReview() {
        console.log('📖 开始复习流程');
        
        // 获取要复习的单词
        this.words = this.progressManager.getWordsForReview(10);
        console.log('📚 复习词汇:', this.words);
        
        if (this.words.length === 0) {
            this.showNoWordsMessage();
            return;
        }
        
        // 重置计数器
        this.currentIndex = 0;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.startTime = new Date();
        
        // 更新总单词数显示
        document.getElementById('totalWords').textContent = this.words.length;
        
        // 显示复习卡片，隐藏模式选择器
        document.getElementById('modeSelector').style.display = 'none';
        document.getElementById('reviewCard').style.display = 'block';
        
        // 加载第一个单词
        await this.loadWord();
        
        // 更新统计显示
        this.updateStats();
    }

    async loadWord() {
        if (this.currentIndex >= this.words.length) {
            this.showCompletion();
            return;
        }
        
        const word = this.words[this.currentIndex];
        console.log(`📝 加载单词 ${this.currentIndex + 1}:`, word);
        
        // 获取单词详细信息
        this.currentWord = await this.getWordDetails(word);
        
        // 渲染单词
        this.renderWord();
        
        // 生成选项
        this.generateOptions();
    }

    async getWordDetails(word) {
        // 这里可以调用API获取单词详情，或从本地存储获取
        // 简化实现，使用示例数据
        return {
            german: word,
            translation: this.getTranslationForWord(word),
            partOfSpeech: '名词',
            examples: [{ german: `${word} ist gut.`, chinese: '这个很好。' }],
            hints: this.generateWrongOptions(word)
        };
    }

    getTranslationForWord(word) {
        // 简单映射，实际情况应该从数据库或API获取
        const translations = {
            'der Apfel': '苹果',
            'die Schule': '学校',
            'das Buch': '书',
            'der Tisch': '桌子',
            'die Tür': '门',
            'das Fenster': '窗户',
            'der Stuhl': '椅子',
            'die Lampe': '灯',
            'der Computer': '电脑',
            'das Handy': '手机'
        };
        
        return translations[word] || '示例翻译';
    }

    generateWrongOptions(correctWord) {
        // 生成错误选项
        const allTranslations = [
            '苹果', '学校', '书', '桌子', '门',
            '窗户', '椅子', '灯', '电脑', '手机',
            '汽车', '房子', '猫', '狗', '水'
        ];
        
        const correctTranslation = this.getTranslationForWord(correctWord);
        const wrongTranslations = allTranslations.filter(t => t !== correctTranslation);
        
        // 随机选择3个错误选项
        const shuffled = wrongTranslations.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }

    renderWord() {
        console.log(`🎨 渲染单词 ${this.currentIndex + 1}/${this.words.length}`);
        
        // 更新德语单词
        document.getElementById('reviewGermanWord').textContent = this.currentWord.german;
        
        // 更新进度条
        this.updateProgressBar();
    }

    generateOptions() {
        // 生成4个选项（1个正确，3个干扰项）
        this.options = [
            { text: this.currentWord.translation, correct: true },
            ...this.currentWord.hints.map(hint => ({ text: hint, correct: false }))
        ].sort(() => Math.random() - 0.5);
        
        this.renderOptions();
    }

    renderOptions() {
        const container = document.getElementById('optionsContainer');
        container.innerHTML = '';
        
        this.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = `${String.fromCharCode(65 + index)}. ${option.text}`;
            button.dataset.correct = option.correct;
            button.addEventListener('click', (e) => this.handleOptionClick(option, e));
            container.appendChild(button);
        });
    }

    handleOptionClick(option, event) {
        console.log('🖱️ 选项被点击:', option.text, '正确:', option.correct);
        
        const buttons = document.querySelectorAll('.option-btn');
        
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
            } else if (btn === event.target && !option.correct) {
                btn.classList.add('wrong');
            }
        });

        setTimeout(() => {
            if (option.correct) {
                this.correctCount++;
                this.nextWord();
            } else {
                this.wrongCount++;
                this.showLearningCard();
            }
        }, 1500);
    }

    showLearningCard() {
        console.log('📖 显示学习卡片');
        
        // 隐藏复习卡片，显示学习卡片
        document.getElementById('reviewCard').style.display = 'none';
        
        // 创建或显示学习卡片
        const learningCard = document.getElementById('learningCard');
        if (learningCard) {
            learningCard.style.display = 'block';
            learningCard.innerHTML = this.createLearningCardContent();
        } else {
            // 如果学习卡片不存在，创建它
            this.createLearningCard();
        }
    }

    createLearningCardContent() {
        return `
            <div class="word-section">
                <div class="word-header">
                    <span class="word-number">#${this.currentIndex + 1}</span>
                    <span class="difficulty-badge">复习</span>
                </div>
                
                <div class="word-content">
                    <h1 class="german-word">${this.currentWord.german}</h1>
                    
                    <div class="word-meta">
                        <div class="meta-item">
                            <i class="fas fa-tag"></i>
                            <span class="meta-label">词性</span>
                            <span class="meta-value">${this.currentWord.partOfSpeech}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="translation-section">
                <h3 class="section-title">
                    <i class="fas fa-language"></i>
                    正确翻译
                </h3>
                <div class="translation-card">
                    <div class="translation-content">
                        <span class="translation-text">${this.currentWord.translation}</span>
                        <div class="translation-details">
                            <span class="category">${this.currentWord.partOfSpeech}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="examples-section">
                <h3 class="section-title">
                    <i class="fas fa-comment-alt"></i>
                    例句
                </h3>
                <div class="examples-container">
                    ${this.currentWord.examples.map(example => `
                        <div class="example-card">
                            <div class="example-content">
                                <p class="german-example">${example.german}</p>
                                <p class="chinese-example">${example.chinese}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="controls-section">
                <button class="control-btn primary-btn" id="continueBtn">
                    <i class="fas fa-arrow-right"></i>
                    继续复习
                </button>
            </div>
        `;
    }

    nextWord() {
        console.log('➡️ 进入下一个单词');
        
        // 隐藏学习卡片（如果显示）
        const learningCard = document.getElementById('learningCard');
        if (learningCard) {
            learningCard.style.display = 'none';
        }
        
        // 显示复习卡片
        document.getElementById('reviewCard').style.display = 'block';
        
        // 移动到下一个单词
        this.currentIndex++;
        
        if (this.currentIndex < this.words.length) {
            this.loadWord();
            this.updateStats();
        } else {
            this.showCompletion();
        }
    }

    updateProgressBar() {
        const progress = ((this.currentIndex + 1) / this.words.length) * 100;
        
        // 更新进度条
        const progressFill = document.getElementById('reviewProgressFill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        // 更新进度文本 - 使用正确的 ID
        const progressCount = document.getElementById('reviewProgressCount');
        if (progressCount) {
            progressCount.textContent = `${this.currentIndex + 1}/${this.words.length}`;
        }
    }

    updateStats() {
        // 更新正确/错误计数
        const correctCountElement = document.getElementById('correctCount');
        const wrongCountElement = document.getElementById('wrongCount');
        
        if (correctCountElement) {
            correctCountElement.textContent = this.correctCount;
        }
        if (wrongCountElement) {
            wrongCountElement.textContent = this.wrongCount;
        }
        
        // 更新时间
        if (this.startTime) {
            const timeSpentElement = document.getElementById('timeSpent');
            if (timeSpentElement) {
                const elapsed = Math.floor((new Date() - this.startTime) / 1000);
                const minutes = Math.floor(elapsed / 60);
                const seconds = elapsed % 60;
                timeSpentElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        }
    }

    showCompletion() {
        console.log('🏆 显示完成消息');
        
        // 计算正确率
        const total = this.correctCount + this.wrongCount;
        const accuracy = total > 0 ? Math.round((this.correctCount / total) * 100) : 0;
        
        // 计算用时
        const endTime = new Date();
        const timeDiff = Math.round((endTime - this.startTime) / 1000);
        const minutes = Math.floor(timeDiff / 60);
        const seconds = timeDiff % 60;
        
        // 更新完成弹窗内容
        document.getElementById('finalCorrect').textContent = `${this.correctCount}个`;
        document.getElementById('finalTime').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // 计算积分
        const points = this.correctCount * 10;
        document.getElementById('pointsEarned').textContent = `+${points}`;
        
        // 更新正确率圆圈
        const scoreCircle = document.getElementById('scoreCircle');
        if (scoreCircle) {
            scoreCircle.style.background = `conic-gradient(var(--primary-500) ${accuracy}%, var(--secondary-200) 0%)`;
            scoreCircle.querySelector('.score-value').textContent = `${accuracy}%`;
        }
        
        // 显示完成弹窗
        document.getElementById('reviewCompletionModal').style.display = 'flex';
        
        // 绑定弹窗按钮事件
        this.bindCompletionModalButtons();
    }

    bindCompletionModalButtons() {
        // 绑定返回概览按钮
        const backToOverviewBtn2 = document.getElementById('backToOverviewBtn2');
        if (backToOverviewBtn2) {
            backToOverviewBtn2.addEventListener('click', () => {
                window.location.href = 'overview.html';
            });
        }
        
        // 绑定复习错题按钮
        const reviewWrongBtn = document.getElementById('reviewWrongBtn');
        if (reviewWrongBtn) {
            reviewWrongBtn.addEventListener('click', () => {
                // 这里可以添加复习错题的逻辑
                alert('复习错题功能正在开发中');
            });
        }
    }

    showNoWordsMessage() {
        console.log('📭 没有可复习的单词');
        
        // 创建提示消息
        const message = `
            <div style="text-align: center; padding: 40px;">
                <i class="fas fa-book" style="font-size: 4rem; color: var(--primary-color); margin-bottom: 20px;"></i>
                <h2>还没有学习的单词</h2>
                <p style="margin: 20px 0;">先去学习一些新单词吧！</p>
                <button onclick="window.location.href='learn-new.html'" class="primary-btn" style="margin-top: 20px;">
                    <i class="fas fa-book"></i>
                    学习新词
                </button>
            </div>
        `;
        
        // 替换主内容
        const main = document.querySelector('main');
        if (main) {
            main.innerHTML = message;
        }
    }
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 复习页面加载完成');
    
    // 检查是否在复习页面
    if (document.getElementById('modeSelector')) {
        console.log('✅ 在复习页面，开始初始化');
        
        setTimeout(function() {
            window.reviewInstance = new ReviewOldWords();
            console.log('🚀 ReviewOldWords 实例已创建');
        }, 100);
    }
});
