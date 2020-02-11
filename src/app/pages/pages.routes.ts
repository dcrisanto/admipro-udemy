import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PagesComponent } from './pages.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { LoginGuardGuard } from '../services/service.index';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        // Requiero que contenga la propiedad de las rutas CanActive
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Barra de Progreso' } },
            { path: 'graficas1', component: Graficas1Component, data: { title: 'Gráficas' } },
            { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
            { path: 'accout-settings', component: AccoutSettingsComponent, data: { title: 'Ajuste de tema' } },
            // Cualquier caracter vacío va a direccionar al dashborad
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );