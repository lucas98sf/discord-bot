import type { Command } from '../interfaces';
import { getPokemonSprite } from './pokemon';
import { queryProducts } from './promos';
import { lula } from './votacao';

export const commands: Command[] = [getPokemonSprite, queryProducts, lula];
