// api-simple.js - 不使用任何模块语法

// 词汇数据 - 硬编码10个单词
const VOCABULARY_DATA = [
    {
        german: "der Apfel",
        partOfSpeech: "名词",
        translation: "苹果",
        examples: [
            { german: "Der Apfel ist rot.", chinese: "这个苹果是红色的。" },
            { german: "Ich esse einen Apfel.", chinese: "我在吃一个苹果。" }
        ],
        hint: "联想记忆：德语中的苹果是阳性名词，要用der"
    },
    {
        german: "die Schule",
        partOfSpeech: "名词",
        translation: "学校",
        examples: [
            { german: "Ich gehe zur Schule.", chinese: "我去学校。" },
            { german: "Die Schule beginnt um 8 Uhr.", chinese: "学校8点开始。" }
        ],
        hint: "die Schule是阴性名词，注意冠词"
    },
    {
        german: "das Buch",
        partOfSpeech: "名词",
        translation: "书",
        examples: [
            { german: "Das Buch ist interessant.", chinese: "这本书很有趣。" },
            { german: "Ich lese ein Buch.", chinese: "我在读一本书。" }
        ],
        hint: "das Buch是中性名词，和英语的book相似"
    },
    {
        german: "der Tisch",
        partOfSpeech: "名词",
        translation: "桌子",
        examples: [
            { german: "Der Tisch ist groß.", chinese: "这张桌子很大。" },
            { german: "Das Buch liegt auf dem Tisch.", chinese: "书在桌子上。" }
        ],
        hint: "阳性名词，记忆：桌子通常是男性化的"
    },
    {
        german: "die Tür",
        partOfSpeech: "名词",
        translation: "门",
        examples: [
            { german: "Die Tür ist geschlossen.", chinese: "门关着。" },
            { german: "Bitte schließen Sie die Tür.", chinese: "请关上门。" }
        ],
        hint: "阴性名词，注意变音符号 ü"
    },
    {
        german: "das Fenster",
        partOfSpeech: "名词",
        translation: "窗户",
        examples: [
            { german: "Das Fenster ist offen.", chinese: "窗户开着。" },
            { german: "Ich schaue aus dem Fenster.", chinese: "我往窗外看。" }
        ],
        hint: "中性名词，和英语window相似"
    },
    {
        german: "der Stuhl",
        partOfSpeech: "名词",
        translation: "椅子",
        examples: [
            { german: "Der Stuhl ist bequem.", chinese: "这把椅子很舒服。" },
            { german: "Setzen Sie sich auf den Stuhl.", chinese: "请坐在椅子上。" }
        ],
        hint: "阳性名词，和英语的stool发音相似"
    },
    {
        german: "die Lampe",
        partOfSpeech: "名词",
        translation: "灯",
        examples: [
            { german: "Die Lampe ist hell.", chinese: "这盏灯很亮。" },
            { german: "Schalten Sie die Lampe ein.", chinese: "请开灯。" }
        ],
        hint: "阴性名词，来自法语lampe"
    },
    {
        german: "der Computer",
        partOfSpeech: "名词",
        translation: "电脑",
        examples: [
            { german: "Der Computer ist neu.", chinese: "这台电脑是新的。" },
            { german: "Ich arbeite am Computer.", chinese: "我在电脑上工作。" }
        ],
        hint: "阳性名词，和英语相同"
    },
    {
        german: "das Handy",
        partOfSpeech: "名词",
        translation: "手机",
        examples: [
            { german: "Das Handy ist kaputt.", chinese: "手机坏了。" },
            { german: "Mein Handy klingelt.", chinese: "我的手机在响。" }
        ],
        hint: "中性名词，德语中常用Handy表示手机"
    }
];

// 生成词汇的函数 - 全局可用
function generateVocabulary(topic = '日常德语词汇', count = 10) {
    console.log('📚 生成词汇:', topic, '数量:', count);
    console.log('📊 使用本地词汇数据');
    
    // 返回指定数量的词汇
    return VOCABULARY_DATA.slice(0, count);
}
