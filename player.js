export const player1 = {
    player: 1,
    name: 'Saber',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Excalibur', 'Arondight', 'Clarent', 'Crocea Mors', 'Beagalltach', 'Moralltach'], 
    changeHP,
    elHP,
    renderHP
};

export const player2 = {
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
    if (this.hp < 0) { this.hp = 0; } 
}

function elHP() {
    return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}

export const playerLife = (player, damage) => {
    player.changeHP(damage);
    player.renderHP();
}