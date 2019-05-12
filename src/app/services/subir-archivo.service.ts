import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { XhrFactory } from '@angular/common/http';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo ( archivo: File, tipo: string, id: string ) {

    const formData = new FormData();
    const xhr = new XMLHttpRequest();
      return new Promise( (resolve, reject ) => {


        formData.append ( 'imagen', archivo, archivo.name );
        xhr.onreadystatechange = function () {

          if (xhr.readyState === 4) {

              if ( xhr.status === 200 ){
                console.log ('imagen subida');
                swal ( 'OK', 'La imagen se subió correctamente', 'success');
                resolve( JSON.parse(xhr.response) );
              } else {
                console.log( 'Falló la subida' );
                reject ( xhr.response );
              }

          }
        };
        const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
        xhr.open( 'PUT', url, true );
        xhr.send ( formData );
      });
  }
}
