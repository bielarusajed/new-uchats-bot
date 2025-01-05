import { Bot } from 'grammy';
import { commands } from './commands';

const bot = new Bot(Bun.env.BOT_TOKEN);

bot.use(commands);

bot.command('start', ctx => {
  return ctx.reply('Welcome! Up and running.');
});

bot.on('message', ctx => {
  console.log(ctx.update.message.chat.id);
  return ctx.reply('Got another message!');
});

bot.start();
