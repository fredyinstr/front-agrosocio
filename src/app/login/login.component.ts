import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email: string;

  constructor( public _usuarioService: UsuarioService,
                public router: Router) { }

  ngOnInit() {
    this.email = localStorage.getItem( 'email' ) || '';
    if (this.email.length > 2 ) {
      this.recuerdame = true;
    }
  }

  ingresar ( forma: NgForm ) {
    if ( forma.invalid ) {
      return;
    }
    console.log('Formulario: ', forma.value );
    const usuario: Usuario = new Usuario(null, null, forma.value.email, forma.value.password);
    this._usuarioService.login( usuario, this.recuerdame)
          .subscribe( resp => this.router.navigate(['/home']));
  }

}
