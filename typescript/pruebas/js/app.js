// getAllBooks
//1.- Crear un array de books
/* BOOK: {
    title:
    author:
    avaliable:
    category:
}*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
function getAllBooks() {
    var books = [
        {
            id: 0,
            title: "Moby & Moby",
            author: "Parsons",
            available: false,
            category: enums_1.Category.Fiction
        }, {
            id: 1,
            title: "Santa Compaña",
            author: "López",
            available: false,
            category: enums_1.Category.Poetry
        }, {
            id: 2,
            title: "La guerra de los mundos",
            author: "Wells",
            available: true,
            category: enums_1.Category.History
        }
    ];
    return books;
}
/**
 *   Método que devuelva el primer libro disponible de la collección
 */
function logFirstBookAvaliable(books) {
    var firstBookAvailable = null;
    /*
    for (let i: number = 0; i < books.length; i++) {
        if (books[i].avaliable === true) {
            firstBookAvailable = books[i];
            break;
        }
    }*/
    for (var _i = 0, books_1 = books; _i < books_1.length; _i++) {
        var currentBook = books_1[_i];
        if (currentBook.available === true) {
            firstBookAvailable = currentBook;
            break;
        }
    }
    return firstBookAvailable;
}
/**
 * Método que obtenga tódos los títulos pertenecientes a una categoría dada
 */
function getBookTitlesByCategory(category) {
    if (category === void 0) { category = enums_1.Category.Fiction; }
    var books = getAllBooks();
    var result = [];
    for (var _i = 0, books_2 = books; _i < books_2.length; _i++) {
        var book = books_2[_i];
        if (book.category === category) {
            result.push(book.title);
        }
    }
    return result;
}
/**
 * Método que sirva para obtener un libro a través de su identificador
 */
function getBookById(id) {
    var books = getAllBooks();
    var result;
    for (var _i = 0, books_3 = books; _i < books_3.length; _i++) {
        var book = books_3[_i];
        if (book.id === id) {
            result = book;
            break;
        }
    }
    if (!result) {
        throw new Error("No se encuentra ningún libro");
    }
    return result;
}
/**
 * Método para crear un cliente
 */
function createConsumer(name, lastname, email) {
    var consumer;
    if (email) {
        console.log(name + " - " + lastname + " - " + email);
    }
    else {
        console.log(name + " - " + lastname);
    }
    return true;
}
/**
 * Método para, pasando el nombre de un cliente y un conjunto de identificadores, devuelve
 * la asociación entre el cliente y sus libros
 */
function checkoutBooks(name) {
    var booksIds = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        booksIds[_i - 1] = arguments[_i];
    }
    var books = [];
    for (var _a = 0, booksIds_1 = booksIds; _a < booksIds_1.length; _a++) {
        var id = booksIds_1[_a];
        var book = getBookById(id);
        if (book.available) {
            books.push(book.title);
        }
    }
    return books;
}
function getTitles(searchParameter) {
    var books = getAllBooks();
    var result = [];
    for (var _i = 0, books_4 = books; _i < books_4.length; _i++) {
        var book = books_4[_i];
        if (typeof searchParameter === 'string') {
            if (searchParameter === book.author) {
                result.push(book.title);
            }
        }
        else if (typeof searchParameter === 'boolean') {
            if (searchParameter === book.available) {
                result.push(book.title);
            }
        }
    }
    return result;
}
var allBooks = getAllBooks();
allBooks.forEach(function (book) {
    console.log(book.title);
});
var firstBookAvailiable = logFirstBookAvaliable(allBooks);
console.log("El primer libro disponible es \"" + firstBookAvailiable.title + "\"");
var booksByCategory = getBookTitlesByCategory(enums_1.Category.History);
booksByCategory.forEach(function (book) {
    console.log("T\u00EDtulo: \"" + book + "\"");
});
try {
    var bookById = getBookById(4);
    console.log("T\u00EDtulo: \"" + bookById.title + "\"");
}
catch (e) {
    console.log(e.message);
}
var consumerCreated = createConsumer("Gustavo", "Garabal", "gustavogarabal@gmail.com");
console.log(consumerCreated ? "Cliente creado" : "Cliente no creado");
var prestados = checkoutBooks("Gustavo", 0, 1, 2);
console.log(prestados);
var titulosPorAutor = getTitles('Parsons');
var titulosDisponibles = getTitles(true);
console.log("T\u00EDtulos por autor: " + titulosPorAutor);
console.log("T\u00EDtulos disponibles: " + titulosDisponibles);
//# sourceMappingURL=app.js.map