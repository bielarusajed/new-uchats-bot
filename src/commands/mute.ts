import { Composer } from 'grammy';

const mute = new Composer();

mute.command('mute', async ctx => {
  const arg = ctx.match;
  const matches = arg.match(/(?:(?<weeks>\d+)w)?(?:(?<days>\d+)d)?(?:(?<hours>\d+)h)?(?:(?<minutes>\d+)m)?/);

  if (!ctx.message?.reply_to_message?.from?.id) return ctx.reply('Карыстальнік нявызначаны');
  const targetId = ctx.message.reply_to_message.from.id;

  if (!matches?.groups) return ctx.reply('Тэрмін нявызначаны');

  const weeks = Number.parseInt(matches.groups.weeks) || 0;
  const days = Number.parseInt(matches.groups.days) || 0;
  const hours = Number.parseInt(matches.groups.hours) || 0;
  const minutes = Number.parseInt(matches.groups.minutes) || 0;

  const seconds = minutes * 60 + hours * 3600 + days * 86400 + weeks * 604800;
  const endDate = new Date(Date.now() + (seconds || 86400) * 1000);

  await ctx.api.restrictChatMember(
    ctx.chat.id,
    targetId,
    { can_send_messages: false },
    { until_date: Math.floor(endDate.getTime() / 1000) },
  );

  await ctx.reply(
    `Карыстальнік <a href="tg://user?id=${targetId}">${ctx.message.reply_to_message.from.first_name}</a> не зможа пісаць у чат да ${endDate.toISOString()} (UTC).`,
    { parse_mode: 'HTML' },
  );
});

export { mute };
