import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { CartComponent } from './cart/cart.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ArticulosComponent } from './articulos/articulos.component';
import { ArticuloService } from '../services/articulo.service';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ServicesModule } from '../services/services.module';
import { UsuarioService } from '../services/service.index';






@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        ArticuloComponent,
        CartComponent,
        ArticulosComponent,
        PagesComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ServicesModule
    ],
    providers: [ArticuloService, UsuarioService]
  })
  export class PagesModule { }
