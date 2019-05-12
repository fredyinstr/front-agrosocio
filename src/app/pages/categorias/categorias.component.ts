import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = [];
  total = 0;

  constructor() { }

  nuevaCategoria ( forma: NgForm ) {
    if ( forma.invalid ) {
      console.error('Forma inválida');
      return;
    }
    console.log('Forma: ', forma.value);
  }

  ngOnInit() {
  }

}
