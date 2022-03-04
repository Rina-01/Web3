/**
 * Создаёт html эелемент с заданным тэгом и классом
 * @param {string} tag - имя тэга
 * @param {string} [classNam] - имя класса
 * @returns {HTMLElement} - переменная с элементом
 */
export const createElement = (tag, classNam) => {
    const $tag = document.createElement(tag);
    if (classNam) { $tag.className = classNam; }
    return $tag;
}

/**
 * Создаёт html эелемент для игрока
 * @param {object} obj - объект с данными игрока
 * @returns {HTMLElement} - переменная с элементом
 */
export const createPlayer = (obj) => {
    const $player = createElement('div', `player${obj.player}`);

    const $progres = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    $life.style.width = `${$obj.hp}%`;
    $progres.appendChild($life);
    const $name = createElement('div', 'name');
    $name.innerText = obj.name;
    $progres.appendChild($name);
    $player.appendChild($progres);

    const $char = createElement('div', 'character');
    const $img = createElement('img');
    $img.src = obj.img;
    $char.appendChild($img);
    $player.appendChild($char);

    return $player;
}

/**
 * Генерирует случайное целое число в диапазон [ 0 ; num-1 ]
 * @param {number} num 
 * @returns {number}
 */
export const getRandom = (num) => Math.floor(Math.random()*num);    