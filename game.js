const $formFight = document.querySelector('.control');
export const $arena = document.querySelector('.arenas');

import {player1, player2} from './player.js';
self.importScripts('./game_util.js');

export class Game {
    start = () => {
        player1.createPlayer();
        player2.createPlayer();
        generateLogs('start', player1.name, player2.name);
        $formFight.addEventListener('submit', function(e) {
            e.preventDefault();
            this.fight();
        });
    }
    fight = () => {
        const me = playerAttack($formFight);    // player1
        const enemy = enemyAttack();    // player2
        if (me.hit != enemy.defence) {
            player2.playerLife(me.value);
            generateLogs('hit', player1.name, player2.name, me.value, player2.hp);
        } else {
            generateLogs('defence', player1.name, player2.name);
        }
        if (enemy.hit != me.defence) {
            player1.playerLife(enemy.value);
            generateLogs('hit', player2.name, player1.name, enemy.value, player1.hp);
        } else {
            generateLogs('defence', player2.name, player1.name);
        }
    
        if (player1.hp==0 || player2.hp==0) { this.gameEnd(); }
    }
    gameEnd = () => {
        if (player1.hp==0 && player2.hp==0) {
            $arena.appendChild(gameTitle());
            generateLogs('draw', player1.name, player2.name);
        } else if (player1.hp==0 && player2.hp!=0) {
            $arena.appendChild(gameTitle(player2.name));
            generateLogs('end', player2.name, player1.name);
        } else if (player2.hp==0 && player1.hp!=0) {
            $arena.appendChild(gameTitle(player1.name));
            generateLogs('end', player1.name, player2.name);
        }
    
        for (let i of $formFight) {
            i.disabled = true;
        }
    
        const $reloadButton = createReloadButton();
        $reloadButton.addEventListener('click', function() {
            window.location.reload();
        });
    }
}

