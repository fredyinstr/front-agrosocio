import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/service.index';
import { ArticuloService } from '../../services/service.index';
import { Articulo } from '../../models/articulo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  forma: FormGroup;

  categorias: [] = [];
  articulo: Articulo;

  imagenSubir: File;
  habilitarSubir = false;
  imagenTemp: any;

  // articulo: any = {
  //   nombre: 'nombre',
  //   valor: '150000'
  // };

  constructor(
              public _categoriaService: CategoriaService,
              public _articuloService: ArticuloService,
              public router: Router
              ) { }

  regresar(){
    this.router.navigate(['/articulos']);
  }

  seleccionImagen( archivo ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal ('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() {
    if ( !this.articulo._id ) {
        swal ( 'Error', 'Debe crear el artículo primero!', 'warning');
        return;
    }
    this._articuloService.cambiarImagen (this.imagenSubir, this.articulo._id);
    console.log ('Articulo: ', this.articulo);
  }

  crearCategoria( formCategoria: NgForm ) {
    console.log('Creando categoría: ', formCategoria.value);
    const categoria = new Categoria(
      formCategoria.value.nombre,
      formCategoria.value.seccion
    );
    this._categoriaService.crearCategoria( categoria )
            .subscribe( ( resp: any ) => {
              this.cargarCategorias();
                // console.log('Categoría creada: ', resp );
                swal({
                  title: 'OK',
                  text: 'Categoría creada',
                  icon: 'success',
                });
            });
  }

  crearArticulo() {
    if ( this.forma.invalid ) {
      return;
    }
    console.log('creando artículo', this.forma.value);
      this.articulo = new Articulo (
      this.forma.value.codigo,
      this.forma.value.nombre,
      this.forma.value.descripcion,
      this.forma.value.precio,
      this.forma.value.categoria,
      this.forma.value.cantidad
    );
    this._articuloService.crearArticulo( this.articulo )
      .subscribe( ( resp: any ) => {
        this.articulo = resp;
        // console.log ( 'Articulo creado: ', this.articulo);
        this.habilitarSubir = true;
        swal( 'OK', 'Artículo creado. Ahora puedes subir una imagen', 'success');
        // this.router.navigate(['/articulos']);
      });
  }

  esNumero (campo: string) {
      return ( group: FormGroup ) => {
        let numero = group.controls[campo].value;
        numero = Number( numero );
        if ( !isNaN(numero) ) {
             return null;
          }
          return {
            esNumero: true // True dice que el formulario no pasa
          };
      };
  }

  cargarCategorias() {
    this._categoriaService.cargarCategorias()
          .subscribe( (resp: any ) => {
            console.log('respuesta categorias: ', resp);
            this.categorias = resp;
          });
  }

  ngOnInit() {
    this.forma = new FormGroup({
      codigo: new FormControl( null , Validators.required ),
      nombre: new FormControl( null , Validators.required ),
      descripcion: new FormControl( null, Validators.required ),
      precio: new FormControl( null, Validators.required ),
      cantidad: new FormControl( null, Validators.required ),
      categoria: new FormControl( null, Validators.required )
    }, { validators: [this.esNumero( 'precio'), this.esNumero( 'cantidad')]} );

    this.cargarCategorias();
  }

}
