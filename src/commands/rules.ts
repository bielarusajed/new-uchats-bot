import { Composer } from 'grammy';
import { db } from '../db';
import { chat } from '../db/schema';

const rules = new Composer();

rules.command('set_rules', async ctx => {
  await db.insert(chat).values({ telegramId: ctx.chat.id, rulesMessage: ctx.match });
  return ctx.reply('Правілы паспяхова абноўленыя');
});

rules.command('rules', async ctx => {
  const chatId = ctx.chat.id;
  const rulesMessage = await db.query.chat.findFirst({ where: (t, { eq }) => eq(t.telegramId, chatId) });
  return ctx.reply(rulesMessage?.rulesMessage ?? 'Жыве анархія!');
});

export { rules };
