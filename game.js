const $formFight = document.querySelector('.control');
export const $arena = document.querySelector('.arenas');

import {Player, player1} from './player.js';
self.importScripts('./game_util.js');

export class Game {
    getPlayers = async () => { return fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json()); }
    start = () => {
        const players = await this.getPlayers();
        const player2 = new Player({
            ...JSON.parse(players),
            player: 2,
            rootSelector: 'arenas'
        });

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
        const fight = JSON.parse(enemyAttack(me));    
        
        if (fight.player1.hit != fight.player2.defence) {
            player2.playerLife(fight.player1.value);
            generateLogs('hit', player1.name, player2.name, fight.player1.value, player2.hp);
        } else {
            generateLogs('defence', player1.name, player2.name);
        }
        if (fight.player2.hit != fight.player1.defence) {
            player1.playerLife(fight.player2.value);
            generateLogs('hit', player2.name, player1.name, fight.player2.value, player1.hp);
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

