const player1 = {
    name: 'Saber',
    hp: 90,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Excalibur', 'Arondight', 'Clarent', 'Crocea Mors', 'Beagalltach', 'Moralltach'], 
    attack: function() {
        console.log(this.name + ' Fight...');
    }
};

const player2 = {
    name: 'Lancer',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Gae Bolg', 'Gei Bou', 'Gei Jarugu', 'Rhongomyniad', 'Gungner', 'Aeglos'],
    attack: function() {
        console.log(this.name + ' Fight...');
    }
};

function createPlayer(cls, obcls) {
    const $player = document.createElement('div');
    $player.className = cls;
    

    const $progres = document.createElement('div');
    $progres.className = 'progressbar';

    const $life = document.createElement('div');
    $life.className = 'life';
    $life.innerText = obcls.hp;
    $progres.appendChild($life);
    const $name = document.createElement('div');
    $name.className = 'name';
    $name.innerText = obcls.name;
    $progres.appendChild($name);

    $player.appendChild($progres);


    const $char = document.createElement('div');
    $char.className = 'character';

    const $img = document.createElement('img');
    $img.src = obcls.img;
    $char.appendChild($img);
   
    $player.appendChild($char);


    const $arena = document.getElementsByClassName('arenas');
    $arena.appendChild($player)
}


createPlayer('player1', player1);
createPlayer('player2', player2);
