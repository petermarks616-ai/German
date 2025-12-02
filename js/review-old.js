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
        
        // 确保元素存在
        this.modeSelector = document.getElementById('modeSelector');
        this.reviewCard = document.getElementById('reviewCard');
        
        // 如果没有学习过单词，直接显示消息
        this.progressManager = new ProgressManager();
        this.words = this.progressManager.getWordsForReview(10);
        
        console.log('📊 复习词汇:', this.words);
        console.log('词汇数量:', this.words.length);
        
        this.init();
    }

    init() {
        // 如果没有单词，显示提示
        if (this.words.length === 0) {
            this.showNoWordsMessage();
            return;
        }
        
        // 显示模式选择器，隐藏复习卡片
        if (this.modeSelector) {
            this.modeSelector.style.display = 'block';
        }
        if (this.reviewCard) {
            this.reviewCard.style.display = 'none';
        }
        
        this.setupEventListeners();
        this.updateTotalWords();
    }

    setupEventListeners() {
        console.log('🎮 设置事件监听器');
        
        // 开始复习按钮
        const startReviewBtn = document.getElementById('startReviewBtn');
        if (startReviewBtn) {
            startReviewBtn.addEventListener('click', () => {
                console.log('▶️ 开始复习');
                this.startReview();
            });
        }
        
        // 跳过按钮
        const skipBtn = document.getElementById('skipBtn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                console.log('⏭️ 跳过此题');
                this.nextWord();
            });
        }
        
        // 提示按钮
        const showHintBtn = document.getElementById('showHintBtn');
        if (showHintBtn) {
            showHintBtn.addEventListener('click', () => {
                const hintContent = document.getElementById('hintContent');
                if (hintContent) {
                    hintContent.style.display = 'block';
                }
            });
        }
    }

    startReview() {
        console.log('🚀 开始复习流程');
        
        // 隐藏模式选择器，显示复习卡片
        if (this.modeSelector) {
            this.modeSelector.style.display = 'none';
        }
        if (this.reviewCard) {
            this.reviewCard.style.display = 'block';
        }
        
        // 初始化统计
        this.correctCount = 0;
        this.wrongCount = 0;
        this.startTime = new Date();
        
        // 加载第一个单词
        this.currentIndex = 0;
        this.loadWord();
    }

    async loadWord() {
        console.log(`📖 加载单词 ${this.currentIndex + 1}/${this.words.length}`);
        
        if (this.currentIndex >= this.words.length) {
            this.showCompletion();
            return;
        }
        
        this.currentWord = this.words[this.currentIndex];
        
        // 获取单词详情
        const wordData = await this.getWordDetails(this.currentWord);
        this.currentWord = wordData;
        
        this.renderWord();
        this.generateOptions();
        
        // 更新统计显示
        this.updateStats();
    }

    async getWordDetails(word) {
        console.log('🔍 获取单词详情:', word);
        
        // 这里应该是从API或本地存储获取单词详情
        // 简化实现：使用预设的单词数据
        const vocabulary = {
            "der Apfel": {
                german: "der Apfel",
                translation: "苹果",
                partOfSpeech: "名词",
                examples: [{ german: "Der Apfel ist rot.", chinese: "这个苹果是红色的。" }],
                hints: ["梨子", "香蕉", "橙子"],
                difficulty: "初级"
            },
            "die Schule": {
                german: "die Schule",
                translation: "学校",
                partOfSpeech: "名词",
                examples: [{ german: "Ich gehe zur Schule.", chinese: "我去学校。" }],
                hints: ["家庭", "工作", "商店"],
                difficulty: "初级"
            },
            "das Buch": {
                german: "das Buch",
                translation: "书",
                partOfSpeech: "名词",
                examples: [{ german: "Das Buch ist interessant.", chinese: "这本书很有趣。" }],
                hints: ["杂志", "报纸", "笔记本"],
                difficulty: "初级"
            },
            "der Tisch": {
                german: "der Tisch",
                translation: "桌子",
                partOfSpeech: "名词",
                examples: [{ german: "Der Tisch ist groß.", chinese: "这张桌子很大。" }],
                hints: ["椅子", "沙发", "床"],
                difficulty: "初级"
            },
            "die Tür": {
                german: "die Tür",
                translation: "门",
                partOfSpeech: "名词",
                examples: [{ german: "Die Tür ist geschlossen.", chinese: "门关着。" }],
                hints: ["窗户", "墙", "地板"],
                difficulty: "初级"
            }
        };
        
        // 如果有预设数据，使用预设数据
        if (vocabulary[word]) {
            return vocabulary[word];
        }
        
        // 否则返回默认数据
        return {
            german: word,
            translation: word + "的翻译",
            partOfSpeech: "名词",
            examples: [{ german: "Beispielsatz mit " + word, chinese: "包含" + word + "的例句" }],
            hints: ["错误选项1", "错误选项2", "错误选项3"],
            difficulty: "初级"
        };
    }

    renderWord() {
        console.log('🎨 渲染单词');
        
        // 更新德语单词
        const germanWord = document.getElementById('reviewGermanWord');
        if (germanWord) {
            germanWord.textContent = this.currentWord.german;
        }
        
        // 更新单词类别
        const wordCategory = document.getElementById('wordCategory');
        if (wordCategory) {
            wordCategory.textContent = `${this.currentWord.partOfSpeech}复习`;
        }
        
        // 更新难度
        const difficulty = document.getElementById('reviewDifficulty');
        if (difficulty) {
            difficulty.textContent = this.currentWord.difficulty || "中等";
        }
        
        this.updateProgressBar();
    }

    generateOptions() {
        console.log('🔢 生成选项');
        
        // 生成4个选项（1个正确，3个干扰项）
        this.options = [
            { text: this.currentWord.translation, correct: true },
            ...this.currentWord.hints.map(hint => ({ text: hint, correct: false }))
        ].sort(() => Math.random() - 0.5);
        
        this.renderOptions();
    }

    renderOptions() {
        const container = document.getElementById('optionsContainer');
        if (!container) {
            console.error('❌ 选项容器不存在');
            return;
        }
        
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

        // 更新统计
        if (option.correct) {
            this.correctCount++;
        } else {
            this.wrongCount++;
        }
        
        this.updateStats();

        setTimeout(() => {
            if (option.correct) {
                this.nextWord();
            } else {
                // 这里可以显示学习卡片，但为了简化，我们先直接进入下一个
                this.nextWord();
            }
        }, 1500);
    }

    nextWord() {
        console.log('➡️ 下一个单词');
        
        this.currentIndex++;
        
        if (this.currentIndex < this.words.length) {
            this.loadWord();
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
        
        // 更新进度文本 - 注意HTML中使用的是reviewProgressCount
        const progressCount = document.getElementById('reviewProgressCount');
        if (progressCount) {
            progressCount.textContent = `${this.currentIndex + 1}/${this.words.length}`;
        }
    }

    updateStats() {
        // 更新正确/错误计数
        const correctCountElement = document.getElementById('correctCount');
        const wrongCountElement = document.getElementById('wrongCount');
        const timeSpentElement = document.getElementById('timeSpent');
        
        if (correctCountElement) {
            correctCountElement.textContent = this.correctCount;
        }
        if (wrongCountElement) {
            wrongCountElement.textContent = this.wrongCount;
        }
        if (timeSpentElement && this.startTime) {
            const seconds = Math.floor((new Date() - this.startTime) / 1000);
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            timeSpentElement.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
    }

    updateTotalWords() {
        const totalWordsElement = document.getElementById('totalWords');
        if (totalWordsElement) {
            totalWordsElement.textContent = this.words.length;
        }
    }

    showCompletion() {
        console.log('🏆 显示完成消息');
        
        const modal = document.getElementById('reviewCompletionModal');
        if (modal) {
            modal.style.display = 'flex';
            
            // 更新完成统计
            const finalCorrect = document.getElementById('finalCorrect');
            const finalTime = document.getElementById('finalTime');
            const scoreValue = document.querySelector('.score-value');
            
            if (finalCorrect) {
                finalCorrect.textContent = `${this.correctCount}个`;
            }
            
            if (finalTime && this.startTime) {
                const seconds = Math.floor((new Date() - this.startTime) / 1000);
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                finalTime.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
            }
            
            if (scoreValue) {
                const score = Math.round((this.correctCount / this.words.length) * 100);
                scoreValue.textContent = `${score}%`;
            }
            
            // 绑定完成弹窗的按钮
            this.bindCompletionModalButtons();
        } else {
            // 如果没有弹窗，使用简单提示
            alert(`复习完成！\n正确: ${this.correctCount}个\n错误: ${this.wrongCount}个`);
            window.location.href = 'overview.html';
        }
    }

    bindCompletionModalButtons() {
        console.log('🔗 绑定完成弹窗按钮');
        
        // 返回概览按钮
        const backToOverviewBtn2 = document.getElementById('backToOverviewBtn2');
        if (backToOverviewBtn2) {
            backToOverviewBtn2.addEventListener('click', () => {
                window.location.href = 'overview.html';
            });
        }
        
        // 复习错题按钮
        const reviewWrongBtn = document.getElementById('reviewWrongBtn');
        if (reviewWrongBtn) {
            reviewWrongBtn.addEventListener('click', () => {
                alert('复习错题功能暂未实现');
            });
        }
    }

    showNoWordsMessage() {
        console.log('📚 没有单词可以复习');
        
        // 隐藏模式选择器
        if (this.modeSelector) {
            this.modeSelector.style.display = 'none';
        }
        
        // 显示提示消息
        document.body.innerHTML = `
            <div class="completion-screen">
                <i class="fas fa-book" style="font-size: 4rem; color: var(--primary-color);"></i>
                <h2>还没有学习的单词</h2>
                <p>先去学习一些新单词吧！</p>
                <button onclick="window.location.href='learn-new.html'" class="primary-btn">
                    学习新词
                </button>
            </div>
        `;
    }
}

// 页面初始化
window.addEventListener('DOMContentLoaded', () => {
    console.log('📄 复习页面加载完成');
    new ReviewOldWords();
});
