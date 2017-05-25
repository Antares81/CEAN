/**
 * Example file using promises
 */

/*
var promesa = new Promise((resolve, reject) => {
    // proceso asíncrono...
    reject("Proceso INcorrecto");
});

promesa.then((message) => {
    console.log(message);
}, (error) => {
    console.log(error);
});
*/

/**
 * Add two numbers using promises
 * @param {*} a 
 * @param {*} b 
 */
var sumaAsinc = (a, b) => {
    return new Promise((resolve, reject) => {
        //validacion
        if (typeof a === 'number' && typeof b === 'number') {
            resolve(a + b);
        } else {
            reject("Alguno de los sumandos no es numérico");
        }
    })
}

sumaAsinc(1, 1).then((resultado) => {
    console.log(`Resultado: ${resultado}`);
    return sumaAsinc(resultado, 10);
})
.then((resultado) => {
    console.log(`Resultado: ${resultado}`);
})
.catch ((error) => {
    console.log(error);
});