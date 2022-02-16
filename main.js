const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Saber',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Excalibur', 'Arondight', 'Clarent', 'Crocea Mors', 'Beagalltach', 'Moralltach'], 
    attack: function() {
        console.log(this.name + ' Fight...');
    }
};

const player2 = {
    player: 2,
    name: 'Lancer',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Gae Bolg', 'Gei Bou', 'Gei Jarugu', 'Rhongomyniad', 'Gungner', 'Aeglos'],
    attack: function() {
        console.log(this.name + ' Fight...');
    }
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

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= 1 + Math.ceil(Math.random()*20);
    console.log(player.hp);
    $playerLife.style.width = player.hp + '%';
    if (player.hp < 0) {
        $playerLife.style.width = 0;
        $arena.appendChild(gameEnd(player));
        $randomButton.disabled = true;
    }
}

function gameEnd(player) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle. innerText = player.name + ' lose';
    return $loseTitle;
}

$randomButton.addEventListener('click', function(){
    changeHP(player1);
    changeHP(player2);
});