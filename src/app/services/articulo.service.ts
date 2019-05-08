import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  totalArticulos = 0;

  constructor(private http: HttpClient) { }

  cargarArticulos() {
    const url = URL_SERVICIOS + '/articulo';
    return this.http.get( url );
  }

  buscarArticulos( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/articulos/' + termino;
    return this.http.get( url );
  }


}
