/**
 * Return the perimeter of a rectangle with a clasic function and with the
 * dimensions passed like parameter
 * @param {*} a height of the rectangle
 * @param {*} b base of the rectangle
 */
/*const perimetro = function (a,b) {
    return 2 * (a + b);
}*/

/**
 * Return the area of a rectangle with a clasic function and with the
 * dimensions passed like parameter
 * @param {*} a height of the rectangle
 * @param {*} b base of the rectangle
 */
/*const area = function (a,b) {
    return a * b;
}*/

/**
 * Return the perimeter of a rectangle with an arrow function and with the
 * dimensions passed like parameter
 * @param {*} a height of the rectangle
 * @param {*} b base of the rectangle
 */
/*const perimetro = (a,b) => {
    return 2 * (a + b);
}*/

/**
 * Return the area of a rectangle with an arrow function and with the
 * dimensions passed like parameter
 * @param {*} a height of the rectangle
 * @param {*} b base of the rectangle
 */
/*const area = (a,b) => {
    return a * b;
}*/

/**
 * Return the perimeter of a rectangle with an unique line arrow function and with the
 * dimensions passed like parameter
 * @param {*} a height of the rectangle
 * @param {*} b base of the rectangle
 */
const perimetro = (a,b) =>  2 * (a + b);

/**
 * Return the area of a rectangle with an unique line arrow function and with the
 * dimensions passed like parameter
 * @param {*} a height of the rectangle
 * @param {*} b base of the rectangle
 */
const area = (a,b) => a * b;

/**
 * Set the functions visible to other files
 */
module.exports = {
    perimetro,
    area
}