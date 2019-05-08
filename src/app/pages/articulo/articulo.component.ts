import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  articulo: any = {
    nombre: 'nombre',
    valor: '150000'
  };

  constructor() { }

  ngOnInit() {
  }

}
