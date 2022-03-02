const $arena = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

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

const player1 = {
    player: 1,
    name: 'Saber',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Excalibur', 'Arondight', 'Clarent', 'Crocea Mors', 'Beagalltach', 'Moralltach'], 
    changeHP,
    elHP,
    renderHP
};
const player2 = {
    player: 2,
    name: 'Lancer',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Gae Bolg', 'Gei Bou', 'Gei Jarugu', 'Rhongomyniad', 'Gungner', 'Aeglos'],
    changeHP,
    elHP,
    renderHP
};

function changeHP(damage) {
    this.hp -= damage;
    if (this.hp < 0) {
        this.hp = 0;
    } 
}
function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}
function renderHP() {
    this.elHP().style.width = this.hp + '%';
}


function createElement(tag, classNam) {
    const $tag = document.createElement(tag);
    if (classNam) {
        $tag.className = classNam;
    }
    return $tag;
}

function createPlayer(obcls) {
    const $player = createElement('div', `player${obcls.player}`);

    const $progres = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    $life.style.width = `${$player.hp}%`;
    $progres.appendChild($life);
    const $name = createElement('div', 'name');
    $name.innerText = obcls.name;
    $progres.appendChild($name);
    $player.appendChild($progres);

    const $char = createElement('div', 'character');
    const $img = createElement('img');
    $img.src = obcls.img;
    $char.appendChild($img);
    $player.appendChild($char);

    return $player;
}

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

/**
 * returns random number in [ 0 ; num-1 ]
 * @param {number} num 
 * @returns number
 */
function getRandom(num) {
    return Math.floor(Math.random()*num);    
}

function enemyAttack() {
    const hit = ATTACK[getRandom(3)];
    const defence = ATTACK[getRandom(3)];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

function playerAttack(formFight) {
    const me = {
        value: 0,
        hit: '',
        defence: ''
    };
    if (formFight) {
        for (let i of formFight) {
            if (i.checked && i.name === 'hit') {
                me.value = getRandom(HIT[i.value]);
                me.hit = i.value;
            }
            if (i.checked && i.name === 'defence') {
                me.defence = i.value;
            }
            i.checked = false;
        }
    }
    return me;
}

function fight() {
    const me = playerAttack($formFight);    // player1
    const enemy = enemyAttack();    // player2
    if (me.hit != enemy.defence) {
        player2.changeHP(me.value);
        player2.renderHP();
        generateLogs('hit', player1.name, player2.name, me.value, player2.hp);
    } else {
        generateLogs('defence', player1.name, player2.name);
    }
    if (enemy.hit != me.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2.name, player1.name, enemy.value, player1.hp);
    } else {
        generateLogs('defence', player2.name, player1.name);
    }
}

function gameTitle(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name ? `${name} wins` : 'draw';
    return $loseTitle;
}

function gameEnd() {
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

generateLogs('start', player1.name, player2.name);
$formFight.addEventListener('submit', function(e) {
    e.preventDefault();

    fight();
    if (player1.hp==0 || player2.hp==0) {gameEnd();}
});

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';
    $reloadWrap.appendChild($reloadButton);
    $arena.appendChild($reloadWrap);
    return $reloadButton;
}


function generateLogs(type, playerAttack, playerDefence, damage, hp) {
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

    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

