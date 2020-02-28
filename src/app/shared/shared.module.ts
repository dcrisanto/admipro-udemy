import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
    imports: [
        // Se debe importar routerModule para que todas las funciones trabajen en los componentes
        // de este módulo.
       RouterModule,
       // Se debe importar para inconveniente que no se puede vincular ngFor debido a que no es una 
       // propiedad conocida de li
       CommonModule,
       PipesModule
    ],
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent
    ],
    // Exportamos para que puedan ser utilizadas en otros módulos
    exports: [
        BreadcrumbsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent
    ]
})

export class SharedModule { }