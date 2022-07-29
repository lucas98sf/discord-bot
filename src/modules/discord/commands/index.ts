import type { Command } from './interfaces/Command';
import { getPokemonSprite } from './pokemon';
import { getProduct } from './promos';

export const commands: Command[] = [getPokemonSprite, getProduct];

//todo: refactor this
