const $arena = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

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
    const $player = createElement('div', 'player' + obcls.player);

    const $progres = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    $life.style.width = $player.hp + '%';
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


function getRandom(num) {   // [ 0 ; num-1 ]
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
    }
    if (enemy.hit != me.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
    }
}

function gameEnd(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText = 'draw';
    }
    return $loseTitle;
}

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();

    fight();

    if (player1.hp==0 && player2.hp==0) {
        $arena.appendChild(gameEnd());
    } else if (player1.hp==0 && player2.hp!=0) {
        $arena.appendChild(gameEnd(player2.name));
    } else if (player2.hp==0 && player1.hp!=0) {
        $arena.appendChild(gameEnd(player1.name));
    }

    if (player1.hp==0 || player2.hp==0) {
        for (let i of $formFight) {
            i.disabled = true;
        }

        const $reloadButton = createReloadButton();
        $reloadButton.addEventListener('click', function() {
            window.location.reload();
        });
    }
});

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';
    $reloadWrap.appendChild($reloadButton);
    $arena.appendChild($reloadWrap);
    return $reloadButton;
}

