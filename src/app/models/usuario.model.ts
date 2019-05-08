export class Usuario {

    constructor(
        public nombre: string,
        public apellido: string,
        public correo: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) {}
}
