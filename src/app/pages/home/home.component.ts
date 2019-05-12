import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo.model';
import { ArticuloService } from '../../services/service.index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   articulos: Articulo[] = [];

  constructor( public _articuloService: ArticuloService) { }

  porSeccion( seccion ) {
    console.log( seccion );
  }

  ngOnInit() {
      this._articuloService.cargarArticulos()
        .subscribe( (resp: any ) => {
          this.articulos = resp.articulos;
          console.log('Articulos: ', this.articulos );
        });
  }

}
