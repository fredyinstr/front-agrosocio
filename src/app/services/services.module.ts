import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService, ArticuloService } from './service.index';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    // UsuarioService,
    // ArticuloService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    ArticuloService
  ]
})
export class ServicesModule { }
