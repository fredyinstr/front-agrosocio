import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
// import { validateConfig } from '@angular/router/src/config';
// import { truncate } from 'fs';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( public _usuarioService: UsuarioService,
                public _router: Router ) { }

  sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup ) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true // True dice que el formulario no pasa
      };
    };
  }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl( null , Validators.required ),
      apellido: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null , Validators.required ),
      password2: new FormControl( null , Validators.required ),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales( 'password', 'password2')});


    this.forma.setValue({
      nombre: 'Jhon Fredy',
      apellido: 'Estrada Ortiz',
      correo: 'fredyinstr@gmail.com',
      password: '123',
      password2: '1234',
      condiciones: true
    });
  }

  registrarUsuario() {
    if (this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      // console.log ( 'Debe aceptar las condiciones');
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }
    // console.log( 'Forma válida', this.forma.valid );
    console.log(this.forma.value);
    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario )
            .subscribe( resp => {
                console.log('respuesta', resp );
                  swal('OK', 'Usuario creado satisfactoriamente', 'success');
            });
  }

}
