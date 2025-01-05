import { Composer } from 'grammy';
import { mute } from './mute';
import { rules } from './rules';

const commands = new Composer();

commands.use(rules).use(mute);

export { commands };
