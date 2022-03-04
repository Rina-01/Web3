import {$arena, $formFight} from './main.js';
import {player1, player2, playerLife} from './player.js';
self.importScripts('./game_util.js');

export const fight = () => {
    const me = playerAttack($formFight);    // player1
    const enemy = enemyAttack();    // player2
    if (me.hit != enemy.defence) {
        playerLife(player2, me.value);
        generateLogs('hit', player1.name, player2.name, me.value, player2.hp);
    } else {
        generateLogs('defence', player1.name, player2.name);
    }
    if (enemy.hit != me.defence) {
        playerLife(player1, enemy.value);
        generateLogs('hit', player2.name, player1.name, enemy.value, player1.hp);
    } else {
        generateLogs('defence', player2.name, player1.name);
    }

    if (player1.hp==0 || player2.hp==0) { gameEnd(); }
}

const gameEnd = () => {
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

