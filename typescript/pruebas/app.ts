// getAllBooks
//1.- Crear un array de books
/* BOOK: {
    title:
    author:
    avaliable:
    category:
}*/

import {Category} from './enums';
import {Book, Author, Librarian} from './interfaces';
import {UniversityLibrarian, Magazine} from './classes'

function getAllBooks(): Array<Book> {
    const books: Array<Book> = [
        {
            id:0,
            title:"Moby & Moby",
            author:"Parsons",
            available:false,
            category:Category.Fiction
        },{
            id:1,
            title:"Santa Compaña",
            author:"López",
            available:false,
            category:Category.Poetry
        },{
            id:2,
            title:"La guerra de los mundos",
            author:"Wells",
            available:true,
            category:Category.History
        }];

    return books;
}

/** 
 *   Método que devuelva el primer libro disponible de la collección
 */
function logFirstBookAvaliable(books: Array<Book>): Book {
    let firstBookAvailable: Book = null;

    /*
    for (let i: number = 0; i < books.length; i++) {
        if (books[i].avaliable === true) {
            firstBookAvailable = books[i];
            break;
        }
    }*/

    for (let currentBook of books) {
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

function getBookTitlesByCategory(category: Category = Category.Fiction): Array<string> {
    const books: Array<Book> = getAllBooks();
    let result: Array<string> = [];

    for (let book of books) {
        if (book.category === category) {
            result.push(book.title);
        }
    }

    return result;
}

/**
 * Método que sirva para obtener un libro a través de su identificador
 */
function getBookById(id: number): Book {
    const books: Array<Book> = getAllBooks();
    let result: Book;

    for (let book of books) {
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
function createConsumer(name: string, lastname: string, email?: string): boolean {
    let consumer: any;

    if (email) {
        console.log(`${name} - ${lastname} - ${email}`);
    } else {
        console.log(`${name} - ${lastname}`);
    }

    return true;
}

/**
 * Método para, pasando el nombre de un cliente y un conjunto de identificadores, devuelve
 * la asociación entre el cliente y sus libros
 */
function checkoutBooks(name: string, ...booksIds: Array<number>) {
    let books: Array<string> = [];

    for (let id of booksIds) {
        let book = getBookById(id);
        if (book.available) {
            books.push(book.title);
        }
    }

    return books;
}

/**
 * Sobrecarga de funciones
 * @param author 
 */
function getTitles(author: string): Array<string>;
function getTitles(avaliable: boolean): Array<string>;
function getTitles(searchParameter: any) {
    const books: Array<Book> = getAllBooks();
    let result: Array<string> = [];

    for(let book of books) {
        if (typeof searchParameter === 'string') {
            if (searchParameter === book.author) {
                result.push(book.title);
            }
        } else if (typeof searchParameter === 'boolean') {
            if (searchParameter === book.available) {
                result.push(book.title);
            }
        }
    }

    return result;
}

let allBooks: Array<any> = getAllBooks();

allBooks.forEach((book) => {
    console.log(book.title);
});

let firstBookAvailiable: any = logFirstBookAvaliable(allBooks);
console.log(`El primer libro disponible es "${firstBookAvailiable.title}"`);

let booksByCategory: Array<string> = getBookTitlesByCategory(Category.History);
booksByCategory.forEach((book) => {
    console.log(`Título: "${book}"`);
});

try {
    let bookById: any = getBookById(4);
    console.log(`Título: "${bookById.title}"`);
} catch (e) {
    console.log(e.message);
}

let consumerCreated = createConsumer("Gustavo", "Garabal", "gustavogarabal@gmail.com");
console.log(consumerCreated ? `Cliente creado` : `Cliente no creado`);

let prestados = checkoutBooks("Gustavo", 0, 1, 2);
console.log(prestados);

let titulosPorAutor = getTitles('Parsons');
let titulosDisponibles = getTitles(true);

console.log(`Títulos por autor: ${titulosPorAutor}`);
console.log(`Títulos disponibles: ${titulosDisponibles}`);