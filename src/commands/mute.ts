import { Composer } from 'grammy';
import { onlyAdmin } from 'grammy-middlewares';

const mute = new Composer();

mute.use(onlyAdmin()).command('mute', async ctx => {
  if (!ctx.message?.reply_to_message?.from?.id) return ctx.reply('Карыстальнік нявызначаны');
  const targetId = ctx.message.reply_to_message.from.id;

  const timeRegex =
    /^(?:(?:(?<weeks>\d+)w)?(?:(?<days>\d+)d)?(?:(?<hours>\d+)h)?(?:(?<minutes>\d+)m)?(?:\s+)?)?(?<reason>.*)?$/;
  const matches = timeRegex.exec(ctx.match);

  console.log(matches);

  if (!matches) return ctx.reply('Няправільны фармат');

  const weeks = Number.parseInt(matches.groups?.weeks || '0');
  const days = Number.parseInt(matches.groups?.days || '0');
  const hours = Number.parseInt(matches.groups?.hours || '0');
  const minutes = Number.parseInt(matches.groups?.minutes || '0');
  const reason = matches.groups?.reason?.trim() || '';

  const seconds = minutes * 60 + hours * 3600 + days * 86400 + weeks * 604800;
  const endDate = new Date(Date.now() + (seconds || 86400) * 1000);

  await ctx.api.restrictChatMember(
    ctx.chat.id,
    targetId,
    { can_send_messages: false },
    { until_date: Math.floor(endDate.getTime() / 1000) },
  );

  let remainingSeconds = seconds || 86400;
  const normalizedWeeks = Math.floor(remainingSeconds / 604800);
  remainingSeconds %= 604800;
  const normalizedDays = Math.floor(remainingSeconds / 86400);
  remainingSeconds %= 86400;
  const normalizedHours = Math.floor(remainingSeconds / 3600);
  remainingSeconds %= 3600;
  const normalizedMinutes = Math.floor(remainingSeconds / 60);

  const timeParts = [];

  if (normalizedWeeks > 0)
    timeParts.push(
      `${normalizedWeeks} ${normalizedWeeks === 1 ? 'тыдзень' : [2, 3, 4].includes(normalizedWeeks) ? 'тыдні' : 'тыдняў'}`,
    );

  if (normalizedDays > 0)
    timeParts.push(
      `${normalizedDays} ${normalizedDays === 1 ? 'дзень' : [2, 3, 4].includes(normalizedDays) ? 'дні' : 'дзён'}`,
    );

  if (normalizedHours > 0)
    timeParts.push(
      `${normalizedHours} ${normalizedHours === 1 ? 'гадзіну' : [2, 3, 4].includes(normalizedHours) ? 'гадзіны' : 'гадзін'}`,
    );

  if (normalizedMinutes > 0)
    timeParts.push(
      `${normalizedMinutes} ${normalizedMinutes === 1 ? 'хвіліну' : [2, 3, 4].includes(normalizedMinutes) ? 'хвіліны' : 'хвілін'}`,
    );

  const replyMessage = `Карыстальнік <a href="tg://user?id=${targetId}">${ctx.message.reply_to_message.from.first_name}</a> не зможа пісаць у чат ${timeParts.join(' ')}. ${reason ? `\nПрычына: ${reason}` : ''}`;

  await ctx.reply(replyMessage, { parse_mode: 'HTML' });
});

export { mute };
