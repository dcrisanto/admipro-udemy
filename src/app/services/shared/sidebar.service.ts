import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [];
 /* menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        // Si no se coloca pleca indico indico que es para manejar una sub-ruta.
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'ProgressBar', url: '/progress' },
        { title: 'Gráficas', url: '/graficas1' },
        { title: 'Promises', url: '/promises' },
        { title: 'Rxjs', url: '/rxjs' }
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Users', url: '/users'},
        { title: 'Hospitals', url: '/hospitals'},
        { title: 'Medics', url: '/medics'}
      ]
    }
  ];*/
  constructor(public userService: UsuarioService) {
   }

   getMenu() {
    this.menu = this.userService.menu;
   }
}
