import {Librarian} from './interfaces';

export class UniversityLibrarian implements Librarian {
    name: string;
    email: string;
    department: string;
}

abstract class ReferencieItem {
    abstract printInfoAbstract(): string;

    static department: string = `I+D`;

    constructor(){
        console.log(`Activación de la clase abstracta`);
    }

    printInfo(): string {
        return `Información de la referencia de biblioteca`;
    }
}

export class Magazine extends ReferencieItem {
    printInfoAbstract(): string {
        return `Info desde Magazine`;
    }
    
    constructor() {
        super();
    }

    printInfo(): string {
        let info = super.printInfo;

        return `${info} ** Derivada **`;
    }

    private metodoPrivado() {

    }
}

//export {UniversityLibrarian, Magazine};
