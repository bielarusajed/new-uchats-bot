import { Composer } from 'grammy';
import { mute } from './mute';
import { report } from './report';
import { rules } from './rules';

const commands = new Composer();

commands.use(rules).use(mute).use(report);

export { commands };
