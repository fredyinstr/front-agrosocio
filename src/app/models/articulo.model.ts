export class Articulo {
    constructor(
        public codigo: string,
        public nombre: string,
        public descripcion: string,
        public precio: number,
        public categoria: string,
        public cantidad?: number,
        public seccion?: string,
        public imagenes?: string[],
        public _id?: string
    ) {}
}
