import { Bot, GrammyError, HttpError } from 'grammy';
import { commands, commandsAdmin } from './commands';

const bot = new Bot(Bun.env.BOT_TOKEN);

bot.use(commands).use(commandsAdmin);

bot.catch(err => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Could not contact Telegram:', e);
  } else {
    console.error('Unknown error:', e);
  }
});

bot.start();
