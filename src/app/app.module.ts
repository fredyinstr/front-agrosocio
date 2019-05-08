import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxLiquidGaugeModule } from 'ngx-liquid-gauge';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';


// Rutas

import { APP_ROUTES  } from './app.routes';


import { AppComponent } from './app.component';
import { MainComponent } from './shared/main/main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
// import { ArticuloService } from './services/service.index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegisterComponent,
    LoginComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    PagesModule,
    APP_ROUTES,
    NgxLiquidGaugeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
