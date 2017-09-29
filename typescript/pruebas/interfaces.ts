import {Category} from './enums';

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numPlublishedBooks: number;
}

interface Librarian extends Person {
    department: string;
}

export {Book, Author, Librarian};