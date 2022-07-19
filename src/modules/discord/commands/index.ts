import type { Command } from '@/modules/discord/interfaces/Command';

import { getPokemonSprite } from './pokemon';

const commands: Command[] = [getPokemonSprite];

export default commands;

//todo: refactor this
