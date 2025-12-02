class LearnNewWords {
    constructor() {
        this.currentIndex = 0;
        this.words = [];
        this.progressManager = new ProgressManager();
        this.isProcessing = false; // 防止重复点击
        this.init();
    }

    async init() {
        try {
            // 显示加载状态
            this.showLoading();
            
            // 从API获取词汇
            this.words = await generateVocabulary('日常德语', 10);
            
            console.log('获取到的词汇:', this.words); // 调试用
            
            if (this.words.length === 0) {
                this.showError('无法获取词汇数据');
                return;
            }
            
            // 隐藏加载状态
            this.hideLoading();
            
            // 渲染第一个单词
            this.renderWord();
            this.setupEventListeners();
            this.updateProgressBar();
            
            // 记录开始时间
            this.startTime = new Date();
            
        } catch (error) {
            console.error('初始化失败:', error);
            this.showError('网络错误，请重试');
        }
    }

    renderWord() {
        // 确保索引有效
        if (this.currentIndex >= this.words.length) {
            console.error('索引超出范围');
            return;
        }
        
        const word = this.words[this.currentIndex];
        console.log(`渲染第 ${this.currentIndex + 1} 个单词:`, word); // 调试用
        
        // 更新DOM元素
        document.getElementById('germanWord').textContent = word.german;
        document.getElementById('partOfSpeech').textContent = word.partOfSpeech || '名词';
        document.getElementById('translationContent').innerHTML = `
            <span class="translation-text">${word.translation}</span>
            <div class="translation-details">
                <span class="pinyin">${word.pinyin || ''}</span>
                <span class="category">${word.category || '基本词汇'}</span>
            </div>
        `;
        
        // 更新例句
        if (word.examples && word.examples.length > 0) {
            const example = word.examples[0];
            document.getElementById('germanExample').textContent = example.german;
            document.getElementById('chineseExample').textContent = example.chinese;
            
            if (word.examples.length > 1) {
                const example2 = word.examples[1];
                document.getElementById('germanExample2').textContent = example2.german;
                document.getElementById('chineseExample2').textContent = example2.chinese;
            }
        }
        
        // 更新提示
        if (word.hint) {
            document.getElementById('hintContent').innerHTML = `<p>${word.hint}</p>`;
        }
        
        // 更新单词编号
        document.getElementById('wordNumber').textContent = `#${this.currentIndex + 1}`;
        
        // 更新进度
        this.updateProgressBar();
        
        // 重置按钮状态
        this.resetButtonState();
    }

    setupEventListeners() {
        const nextBtn = document.getElementById('nextBtn');
        const showMoreBtn = document.getElementById('showMoreBtn');
        
        // 移除之前的监听器
        nextBtn.replaceWith(nextBtn.cloneNode(true));
        const newNextBtn = document.getElementById('nextBtn');
        
        // 添加新的监听器
        newNextBtn.addEventListener('click', () => {
            this.handleNextWord();
        });
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                this.handleNextWord();
            }
        });
        
        // 显示更多例句按钮
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                this.showMoreExamples();
            });
        }
        
        // 发音按钮
        const pronounceBtn = document.getElementById('pronounceBtn');
        if (pronounceBtn) {
            pronounceBtn.addEventListener('click', () => {
                this.pronounceWord();
            });
        }
        
        // 完成弹窗的按钮
        document.addEventListener('click', (e) => {
            if (e.target.id === 'backToOverviewBtn') {
                window.location.href = 'overview.html';
            }
            if (e.target.id === 'reviewNowBtn') {
                window.location.href = 'review-old.html';
            }
        });
    }

    handleNextWord() {
        // 防止重复点击
        if (this.isProcessing) return;
        this.isProcessing = true;
        
        // 禁用按钮
        const nextBtn = document.getElementById('nextBtn');
        nextBtn.disabled = true;
        nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 处理中...';
        
        // 添加当前单词到进度
        const currentWord = this.words[this.currentIndex];
        this.progressManager.addMasteredWord(currentWord.german);
        this.progressManager.addToTodayWords(currentWord.german);
        
        // 短暂延迟，让用户看到反馈
        setTimeout(() => {
            this.currentIndex++;
            
            if (this.currentIndex < this.words.length) {
                // 渲染下一个单词
                this.renderWord();
                this.isProcessing = false;
                
                // 恢复按钮状态
                nextBtn.disabled = false;
                nextBtn.innerHTML = '<i class="fas fa-check-circle"></i> 我已记住，学习下一个';
                
            } else {
                // 完成所有单词
                this.showCompletionMessage();
            }
        }, 300);
    }

    updateProgressBar() {
        const progress = ((this.currentIndex + 1) / this.words.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('progressCount').textContent = 
            `${this.currentIndex + 1}/${this.words.length}`;
    }

    showCompletionMessage() {
        // 计算用时
        const endTime = new Date();
        const timeDiff = Math.round((endTime - this.startTime) / 1000 / 60); // 分钟
        
        // 更新完成时间
        document.getElementById('completionTime').textContent = `${timeDiff}分钟`;
        
        // 显示完成弹窗
        document.getElementById('completionModal').style.display = 'flex';
        
        // 添加动画效果
        setTimeout(() => {
            document.querySelector('.modal-content').classList.add('animate-fade-in');
        }, 100);
    }

    showLoading() {
        const learningCard = document.getElementById('learningCard');
        if (learningCard) {
            learningCard.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>正在获取学习内容...</p>
                </div>
            `;
        }
    }

    hideLoading() {
        const loadingState = document.querySelector('.loading-state');
        if (loadingState) {
            loadingState.style.display = 'none';
        }
    }

    showError(message) {
        const learningCard = document.getElementById('learningCard');
        if (learningCard) {
            learningCard.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>出错了</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="primary-btn">
                        重新加载
                    </button>
                </div>
            `;
        }
    }

    resetButtonState() {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.innerHTML = '<i class="fas fa-check-circle"></i> 我已记住，学习下一个';
        }
    }

    showMoreExamples() {
        const currentWord = this.words[this.currentIndex];
        if (currentWord && currentWord.examples) {
            // 显示更多例句逻辑
            alert(`更多例句:\n${currentWord.examples.map(ex => ex.german).join('\n')}`);
        }
    }

    pronounceWord() {
        const currentWord = this.words[this.currentIndex];
        if (currentWord) {
            // 使用Web Speech API发音
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(currentWord.german);
                utterance.lang = 'de-DE';
                utterance.rate = 0.8;
                window.speechSynthesis.speak(utterance);
            } else {
                alert('您的浏览器不支持语音功能');
            }
        }
    }
}

// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    // 确保页面完全加载后再初始化
    if (document.getElementById('learningCard')) {
        // 添加防抖，防止多次初始化
        let isInitialized = false;
        if (!isInitialized) {
            isInitialized = true;
            new LearnNewWords();
        }
    }
});
