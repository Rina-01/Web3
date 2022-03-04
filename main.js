export const $arena = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');

import {player1, player2} from './player.js';
import {createPlayer} from './util.js';
import {generateLogs} from './game_util.js';
import {fight} from './game.js';

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));
generateLogs('start', player1.name, player2.name);
$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    fight();
});
