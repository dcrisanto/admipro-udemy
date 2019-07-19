import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';

// Definición de las rutas
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    // Cualquier otra ruta muestre el componente nopagefound
    { path: '**', component: NopagefoundComponent}
];

// Importar las rutas, usamos forRoot (rutas principales)
export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true });