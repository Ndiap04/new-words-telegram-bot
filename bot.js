const { Telegraf } = require('telegraf');
const { addWordHandler, getWordsHandler, deleteWordHandler,getRandomWordHandler, helpHandler } = require('./handlers');
const { initializeDatabase } = require('./database');

require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

initializeDatabase();

bot.start(ctx => ctx.reply('Welcome! Use /addword to add a word and /showwords to view your words.'));
bot.command('help', helpHandler);
bot.hears(/\/addword (.+)/, (ctx) => addWordHandler(ctx));
bot.hears(/\/delete_word (.+)/, (ctx) => deleteWordHandler(ctx));
bot.command('showwords', (ctx) => getWordsHandler(ctx, bot));
bot.command('random_word', (ctx) => getRandomWordHandler(ctx));

bot.launch();
