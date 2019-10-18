import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo.model';
import { ArticuloService } from '../../services/articulo.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { Button } from 'protractor';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  articulos: Articulo[] = [];
  total = 0;
  constructor(
    public _articuloService: ArticuloService,
    public _router: Router
  ) { }



  cargarArticulos() {
    this._articuloService.cargarArticulos()
      .subscribe( (resp: any) => {
          console.log('respuesta', resp.articulos);
          this.articulos = resp.articulos;
          this.total = resp.total;
      });
  }

  crearArticulo() {
    this._router.navigate(['/articulo/nuevo']);
  }

  editarArticulo( id ) {
    this._router.navigate(['/articulo/' + id ]);
  }

  borrarArticulo ( idArticulo ) {
    swal({
      title: 'Está segur@ de eliminar el artículo?',
      text: 'Una vez eliminado, la operación no podrá deshacerse!',
      icon: 'warning',
      dangerMode: true,
      buttons: ['cancel', 'ok']
        })
        .then((willDelete) => {
          if (willDelete) {
            this._articuloService.borrarArticulo( idArticulo )
                  .subscribe( ( resp: any ) => {
                    if (resp) {
                      swal ('OK', 'Artículo borrado', 'success');
                      this.cargarArticulos();
                    }
                });
            // swal('Artículo borrado!');
          } else {
            swal('El artículo está a salvo!');
          }
        });
  }

  buscarArticulo( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarArticulos();
      return;
    }
    this._articuloService.buscarArticulos( termino )
      .subscribe( ( resp: any ) => {
          console.log( 'articulos recibidos', resp.articulos );
          this.articulos = resp.articulos;
      });
  }

  ngOnInit() {
    this.cargarArticulos();
  }

}
