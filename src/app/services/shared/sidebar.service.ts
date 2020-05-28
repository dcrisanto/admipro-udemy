import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
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
        { title: 'Medics', url: '/medic'}
      ]
    }
  ];
  constructor() { }
}
