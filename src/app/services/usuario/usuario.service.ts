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

  usuario: Usuario;
  token: String;

  constructor( public http: HttpClient) {
    this.cargarStorage();
    // console.log('Servicio de usuario listo!', this.usuario.nombre );
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  guardarStorage ( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token);
    localStorage.setItem( 'usuario', JSON.stringify(usuario) );
    this.usuario = usuario;
    this.token = token;
  }

  clearStorage () {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem( 'usuario' );
    localStorage.removeItem( 'token' );
  }

  cargarStorage() {
    if ( localStorage.getItem( 'token' )) {
      this.usuario = JSON.parse ( localStorage.getItem ( 'usuario') );
      this.token = localStorage.getItem( 'token' );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  login( usuario: Usuario, recordar: boolean= false ) {

    if ( recordar ) {
      localStorage.setItem ( 'email', usuario.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    console.log('Data formulario: ', usuario );
      const url = URL_SERVICIOS + '/login';

      return this.http.post ( url, usuario ).pipe(
        map( (response: any)  => {
           this.guardarStorage ( response.id, response.token, response.usuario );
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

  logout () {
    this.clearStorage();
  }

  crearUsuario( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario ).pipe(
      map( (response: any)  => {
         swal('Usuario creado', usuario.email, 'success');
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
