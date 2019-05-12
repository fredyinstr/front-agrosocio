import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';

import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import swal from 'sweetalert';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor( public http: HttpClient ) { }

crearCategoria ( categoria: Categoria ) {
  const url = URL_SERVICIOS + '/categoria';
  // console.log ('nombre categoria: ', categoria.nombre);
  // console.log ('seccion categoria: ', categoria.seccion);


      return this.http.post ( url, categoria ).pipe(
        map( (response: any)  => {
           return response.categoria;
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


cargarCategorias (  ) {
  const url = URL_SERVICIOS + '/categoria';
      return this.http.get ( url ).pipe(
        map( (response: any)  => {
           return response.categorias;
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

categoriasPorSeccion ( ) {
  const url = URL_SERVICIOS + '/categoria/porseccion';
      return this.http.get ( url ).pipe(
        map( (response: any)  => {
           return response.categorias;
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
