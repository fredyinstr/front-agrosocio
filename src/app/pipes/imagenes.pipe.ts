import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';


@Pipe({
  name: 'imagenes'
})
export class ImagenesPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'articulos'): any {

  let url = URL_SERVICIOS + '/img';

  if ( !imagen ) {
    return url + '/usuarios/xxx';
  }

  if ( imagen.indexOf ( 'https' ) >= 0) {
    return imagen;
  }

  switch ( tipo ) {
    case 'usuarios':
      url += '/usuarios/' + imagen;
      break;
    case 'articulos':
      url += '/articulos/' + imagen;
      break;
    default:
      console.log ('tipos de imagenes válidos: usuarios, articulos');
      url += '/usuarios/xxx';
      break;
  }
    return url;
  }

}
