import {createElement} from './util.js';

export class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
 //       this.weapon = props.weapon;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }
    changeHP = (damage) => {
        this.hp -= damage;
        if (this.hp < 0) { this.hp = 0; } 
    }
    elHP = () => { return document.querySelector(`.${this.selector} .life`); }
    renderHP = () => { this.elHP().style.width = `${this.hp}%`; }
    playerLife = (damage) => {
        this.changeHP(damage);
        this.renderHP();
    }
    createPlayer = () => {
        const $player = createElement('div', this.selector);

        const $progres = createElement('div', 'progressbar');
        const $life = createElement('div', 'life');
        $life.style.width = `${this.hp}%`;
        $progres.appendChild($life);
        const $name = createElement('div', 'name');
        $name.innerText = this.name;
        $progres.appendChild($name);
        $player.appendChild($progres);

        const $char = createElement('div', 'character');
        const $img = createElement('img');
        $img.src = this.img;
        $char.appendChild($img);
        $player.appendChild($char);

        const $arena = document.querySelector(`.${this.rootSelector}`);
        $arena.appendChild($player);
        return $player;
    }
}

/* export const player1 = new Player ({
    player: 1,
    name: 'Saber',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
//    weapon: ['Excalibur', 'Arondight', 'Clarent', 'Crocea Mors', 'Beagalltach', 'Moralltach'], 
    rootSelector: 'arenas'
});
 
export const player2 = new Player ({
    player: 2,
    name: 'Lancer',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Gae Bolg', 'Gei Bou', 'Gei Jarugu', 'Rhongomyniad', 'Gungner', 'Aeglos'], 
    rootSelector: 'arenas'
});
*/

