const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Saber',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Excalibur', 'Arondight', 'Clarent', 'Crocea Mors', 'Beagalltach', 'Moralltach'], 
    attack,
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
    attack,
    changeHP,
    elHP,
    renderHP
};

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

function attack() {
    console.log(this.name + ' Fight...');
}

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

function gameEnd(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (name) {
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText = 'draw';
    }
    return $loseTitle;
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';
    $reloadWrap.appendChild($reloadButton);
    $arena.appendChild($reloadWrap);
    return $reloadButton;
}

$randomButton.addEventListener('click', function(){
    player1.changeHP(1 + Math.ceil(Math.random()*20));
    player1.renderHP();
    player2.changeHP(1 + Math.ceil(Math.random()*20));
    player2.renderHP();

    if (player1.hp==0 && player2.hp==0) {
        $arena.appendChild(gameEnd());
    } else if (player1.hp==0 && player2.hp!=0) {
        $arena.appendChild(gameEnd(player2.name));
    } else if (player2.hp==0 && player1.hp!=0) {
        $arena.appendChild(gameEnd(player1.name));
    }
    if (player1.hp==0 || player2.hp==0) {
        $randomButton.disabled = true;

        const $reloadButton = createReloadButton();
        $reloadButton.addEventListener('click', function() {
            window.location.reload();
        });
    }
});

