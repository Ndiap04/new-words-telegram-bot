const { db } = require('./database');

const addWordHandler = (ctx) => {
    const input = ctx.match[1];
    if (!input) {
        ctx.reply('Please provide a word and translation in the format: word-translation.');
        return;
    }
    
    const parts = input.split('-');
    if (parts.length !== 2) {
        ctx.reply('Please use the correct format: word-translation.');
        return;
    }

    const word = parts[0].trim();
    const translation = parts[1].trim();

    db.addWord(ctx.chat.id, word, translation)
        .then(() => {
            ctx.reply(`Added: ${word} - ${translation}`);
        })
        .catch((err) => {
            console.error(err);
            ctx.reply('There was an error adding the word.');
        });
};

const getWordsHandler = (ctx, bot) => {
    const chatId = ctx.chat.id;

    db.getWords(chatId).then((words) => {
        if (words.length === 0) {
            ctx.reply('Your dictionary is empty.');
            return;
        }

        const texts = words.map(w => `${w.word} - ${w.translation}`);
        ctx.reply(texts.join('\n'));
    }).catch((err) => {
        console.error(err);
        ctx.reply('There was an error fetching the words.');
    });
};

module.exports = {
    addWordHandler,
    getWordsHandler
};
