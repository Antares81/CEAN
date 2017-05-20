/**
 * Async public function who returns the perimeter and the area of a rectangle
 * with the dimensions passed like parameter. Async approach with exceptions control
 * @param {*} a height of the rectangle
 * @param {*} b base of the rectangle
 * @param {*} callback return the result
 */
module.exports = function(a,b,callback) {
    try {
        if (a < 0 || b < 0) {
            throw new Error("Some of the parameters are zero or minor");
        } else {
            callback(null, {
                perimetro: function() {
                    return (2 * (a + b));
                },
                area: function() {
                    return (a * b);
                }
            });
        }
    } catch (error) {
        callback(error, null);
    }
}