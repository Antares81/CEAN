
export class Format {
    constructor (
        private digital: boolean,
        private dvd: boolean,
        private bluray: boolean) { }
}

export class Film {
    constructor(
        private name: string,
        private genre: string,
        private format: Format) { }
}