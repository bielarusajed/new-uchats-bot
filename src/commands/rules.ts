import { Composer } from 'grammy';
import { onlyAdmin } from 'grammy-middlewares';
import { db } from '../db';
import { chat } from '../db/schema';

const rules = new Composer();
const rulesAdmin = new Composer();

rules.command('rules', async ctx => {
  const chatId = ctx.chat.id;
  const rulesMessage = await db.query.chat.findFirst({ where: (t, { eq }) => eq(t.telegramId, chatId) });
  return ctx.reply(rulesMessage?.rulesMessage ?? 'Жыве анархія!');
});

rulesAdmin.command('set_rules', async ctx => {
  await db
    .insert(chat)
    .values({ telegramId: ctx.chat.id, rulesMessage: ctx.match })
    .onConflictDoUpdate({ target: chat.id, set: { rulesMessage: ctx.match } });
  return ctx.reply('Правілы паспяхова абноўленыя');
});

export { rules, rulesAdmin };
