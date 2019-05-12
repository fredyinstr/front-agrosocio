import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo.model';
import { ArticuloService } from '../../services/articulo.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

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
    this._router.navigate(['/articulo']);
  }

  borrarArticulo ( idArticulo ) {
    this._articuloService.borrarArticulo( idArticulo )
    .subscribe( ( resp: any ) => {
      if (resp) {
        swal ('OK', 'Artículo borrado', 'success');
        this.cargarArticulos();
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
