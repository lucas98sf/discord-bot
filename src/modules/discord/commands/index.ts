import type { Command } from '../interfaces';
import { getPokemonSprite } from './pokemon';
import { queryProducts } from './promos';

export const commands: Command[] = [getPokemonSprite, queryProducts];
