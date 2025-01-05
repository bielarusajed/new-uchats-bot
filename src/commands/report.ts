import { Composer, type Context } from 'grammy';

const report = new Composer();

async function reportToAdmins(ctx: Context) {
  if (!ctx.chat) return;
  const admins = await ctx.api.getChatAdministrators(ctx.chat.id);
  for (const admin of admins) {
    try {
      await ctx.api.sendMessage(
        admin.user.id,
        `https://t.me/c/${Math.abs(ctx.chat.id) > 10 ** 12 ? Math.abs(ctx.chat.id) - 10 ** 12 : Math.abs(ctx.chat.id)}/${ctx.message?.message_id}`,
      );
    } catch {}
  }
  ctx.reply('Адрапартавана!');
}

report.command(['report', 'admin'], reportToAdmins);

report.on('::mention', async ctx => {
  const isAdmin =
    (ctx.message?.entities
      ?.map(entity => ctx.message?.text?.slice(entity.offset, entity.offset + entity.length).toLocaleLowerCase())
      .filter(mention => mention === '@admin').length ?? -1) > 0;

  if (!isAdmin) return;

  await reportToAdmins(ctx);
});

export { report };
