import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../service.index';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
    public userService: UsuarioService,
    public router: Router
    ) {}

    canActivate() {
      if (this.userService.isLogged()) {
        console.log('Puede ingresar a la ruta');
        return true;
      } else {
        console.log('Acceso restringido, bloqueado por el guard');
        this.router.navigate(['/login']);
        return false;
      }
    }
}
