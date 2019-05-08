import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( public http: HttpClient) {
    console.log('Servicio de usuario listo!' );
  }

  crearUsuario( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario ).pipe(
      map( (response: any)  => {
        //  this.saveLocalStorage(response.key._id, response.sessionAuth, response.key); // Backend Response         
         return response.status;
      }),
      catchError( (errorCatchable: any) => {
       swal({
         title: 'Error',
         text: errorCatchable.error.errors.message,
         icon: 'error',
       });
         console.log(errorCatchable.error.errors.message);
         return new Observable<any>();
      })
    );
  }
}
