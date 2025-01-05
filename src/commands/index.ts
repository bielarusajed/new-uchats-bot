import { Composer } from 'grammy';
import { onlyAdmin } from 'grammy-middlewares';
import { muteAdmin } from './mute';
import { report } from './report';
import { rules, rulesAdmin } from './rules';

const commands = new Composer().use(rules).use(report);
const commandsAdmin = new Composer().use(onlyAdmin()).use(rulesAdmin).use(muteAdmin);

export { commands, commandsAdmin };
