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
 * Генерирует случайное целое число в диапазон [ 0 ; num-1 ]
 * @param {number} num 
 * @returns {number}
 */
export const getRandom = (num) => Math.floor(Math.random()*num);    

