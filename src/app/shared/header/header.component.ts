import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService, CategoriaService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categoriasSeccion: any;
  ferreteria: any;
  agricola: any;

  nombre: string ;
  usuario: Usuario;

  constructor( public _usuarioService: UsuarioService,
                public _categoriaService: CategoriaService,
                public router: Router ) { }

  logout() {
    this._usuarioService.logout();
    this.nombre = '';
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    if ( this._usuarioService.token ) {
      this.nombre = this._usuarioService.usuario.nombre;
      this.usuario = this._usuarioService.usuario;
    }
    // console.log('Nombre: ', this.nombre );

    this._categoriaService.categoriasPorSeccion()
        .subscribe ( (resp: any ) => {
          this.categoriasSeccion = resp;
          this.ferreteria = this.categoriasSeccion [0].entry;
          this.agricola = this.categoriasSeccion [1].entry;
          console.log( 'Resultado por seccion: ', this.agricola.nombre );
        });
  }

}
