const $chat = document.querySelector('.chat');

import {$arena} from './main.js';
import {getRandom, createElement} from './util.js';

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];
const LOGS = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

export const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';
    $reloadWrap.appendChild($reloadButton);
    $arena.appendChild($reloadWrap);
    return $reloadButton;
}

export const gameTitle = (name) => {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name ? `${name} wins` : 'draw';
    return $loseTitle;
}

export const generateLogs = (type, playerAttack, playerDefence, damage, hp) => {
    const date = new Date();
    const formatDate = date.toTimeString().substring(0, date.toTimeString().indexOf(' '));

    let text = '';

    switch (type) {
        case 'start':
            text = LOGS.start;
            text = text.replace('[time]', formatDate).replace('[player1]', playerAttack).replace('[player2]', playerDefence);
            break;
        case 'hit':
            text = `${LOGS.hit[getRandom(LOGS.end.length)]} -${damage} [${hp}/100]`;
            text = text.replace('[playerKick]', playerAttack).replace('[playerDefence]', playerDefence);
            break;
        case 'defence':
            text = LOGS.defence[getRandom(LOGS.end.length)];
            text = text.replace('[playerKick]', playerAttack).replace('[playerDefence]', playerDefence);
            break;
        case 'end':
            text = LOGS.end[getRandom(LOGS.end.length)];
            text = text.replace('[playerWins]', playerAttack).replace('[playerLose]', playerDefence);
            break;
        default:
            text = LOGS.draw;
    }
    if (type !== 'start') {
        text = `${formatDate} ${text} `;
    }

    $chat.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);
}

export const enemyAttack = () => {
    const hit = ATTACK[getRandom(3)];
    const defence = ATTACK[getRandom(3)];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

export const playerAttack = ($formFight) => {
    const me = {
        value: 0,
        hit: '',
        defence: ''
    };
    for (let i of $formFight) {
        if (i.checked && i.name === 'hit') {
            me.value = getRandom(HIT[i.value]);
            me.hit = i.value;
        }
        if (i.checked && i.name === 'defence') {
            me.defence = i.value;
        }
        i.checked = false;
    }
    return me;
}

