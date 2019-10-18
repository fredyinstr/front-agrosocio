import { SubirArchivoService } from './subir-archivo.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Articulo } from '../models/articulo.model';

import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  totalArticulos = 0;

  constructor(private http: HttpClient,
        public _subirArchivoService: SubirArchivoService,
        public _usuarioService: UsuarioService,
        public router: Router) { }

  crearArticulo( articulo: Articulo) {
    let url = URL_SERVICIOS + '/articulo';

    if ( articulo._id ) {
      // actualizando
      url += '/' + articulo._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, articulo ).pipe(
        map( (response: any)  => {
           return response.articulo;
        }),
        catchError( (errorCatchable: any) => {
         swal({
           title: 'Error',
           text: errorCatchable.error.mensaje,
           icon: 'error',
         });
           console.log(errorCatchable.error.mensaje);
           return new Observable<any>();
        })
      );
    } else {

      return this.http.post( url, articulo ).pipe(
        map( (response: any)  => {
           return response.articulo;
        }),
        catchError( (errorCatchable: any) => {
         swal({
           title: 'Error',
           text: errorCatchable.error.mensaje,
           icon: 'error',
         });
           console.log(errorCatchable.error.mensaje);
           return new Observable<any>();
        })
      );
    }

  }

  cargarArticulos() {
    const url = URL_SERVICIOS + '/articulo';
    return this.http.get( url );
  }

  cargarArticulo( id: String ) {
    const url = URL_SERVICIOS + '/articulo/' + id;
    return this.http.get( url );
  }

  buscarArticulos( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/articulos/' + termino;
    return this.http.get( url );
  }

  borrarArticulo ( idArticulo ) {
    const url = URL_SERVICIOS + '/articulo/' + idArticulo;
    return this.http.delete( url ).pipe(
      map( (response: any)  => {
         return true;
      }),
      catchError( (errorCatchable: any) => {
       swal({
         title: 'Error',
         text: errorCatchable.error.mensaje,
         icon: 'error',
       });
         console.log(errorCatchable.error.mensaje);
         return new Observable<any>();
      })
    );
  }

  cambiarImagen ( file: File, id: string) {
    this._subirArchivoService.subirArchivo( file, 'articulos', id)
      .then ( result => {
        console.log(result);
        swal ( 'OK', 'Imagen cargada correctamente', 'success' );
        this.router.navigate(['/articulos']);
      }).catch ( err => {
        console.log(err);
      });
  }


}
