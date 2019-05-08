export class Articulo {
    constructor(
        public nombre: string,
        public descripcion: string,
        public precio: number,
        public cantidad: number,
        public seccion: string,
        public categoria: string
    ) {}
}
