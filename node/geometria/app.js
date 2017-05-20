/**
 * Requieres zone. The first import references the file implemented in the traditional way.
 * The second import references the file implemented in the async way.
 */
//var rectangulo = require('./rect');
var rectangulo = require('./rectAsync');

/**
 * Return the perimeter of a rectangle with the dimmensions passed like parameter
 * @param {*} a height of the rectangle
 * @param {*} b base of the rectangle
 */
function calcularPerimetro(a,b) {
    return rectangulo.perimetro(a,b);
}

/**
 * Return de area of a rectangle with the dimmensions passed like parameter
 * @param {*} a height of the rectangle
 * @param {*} b base of the rectangle
 */
function calcularArea(a,b) {
    return rectangulo.area(a,b);
}

/**
 * Calculate the perimeter and the área of a rectangle with the dimmensions passed like parameter
 * This function is used only with the first require (classic programming)
 * @param {*} a height of the rectangle
 * @param {*} b base of the rectangle
 */
/*function obtenerCalculos(a,b) {
    if(a < 0 || b < 0) {
        console.log("Alguno de los lados es menor de cero");
    } else {
        var area = calcularArea(a,b);
        var perimetro = calcularPerimetro(a,b);

        console.log(`Calculos de la figura geométrica:\nPerimetro: ${perimetro}\nArea: ${area}\n`);
    }
}*/

/**
 * Calculate the perimeter and the área of a rectangle with the dimmensions passed like parameter
 * This function is used only with the second require (async programming)
 * @param {*} a height of the rectangle
 * @param {*} b base of the rectangle
 */
function obtenerCalculos(a,b) {
   rectangulo(a,b,function(err, rect) {
       if (err) {
           console.log(err.message);
       } else {
           console.log(`Perimeter: ${rect.area()}\nArea: ${rect.perimetro()}\n`);
       }
   });
}

/**
 * Call to the main function with the rectangle dimmensions
 */
obtenerCalculos(10,20);