
import { RouterModule, Routes } from '@angular/router';
// import { MainComponent } from './shared/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { CartComponent } from './pages/cart/cart.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { CategoriaComponent } from './pages/categorias/categoria/categoria.component';


const appRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'home', component: HomeComponent  },
            { path: 'articulo', component: ArticuloComponent },
            { path: 'cart', component: CartComponent},
            { path: 'articulos', component: ArticulosComponent, data: {titulo: 'Nuevo artículo'}  },
            { path: 'categorias', component: CategoriasComponent, data: {titulo: 'Categorías'}},
            { path: 'categoria', component: CategoriaComponent, data: {titulo: 'Nueva categoría'}},
            { path: '', redirectTo: '/home', pathMatch: 'full'}
        ]
    },
    { path: 'login', component: LoginComponent  },
    { path: 'register', component: RegisterComponent  },
    { path: '**', component: NopagefoundComponent}

];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true});
