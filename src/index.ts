import { Bot } from 'grammy';
import { commands } from './commands';

const bot = new Bot(Bun.env.BOT_TOKEN);

bot.use(commands);

bot.start();
