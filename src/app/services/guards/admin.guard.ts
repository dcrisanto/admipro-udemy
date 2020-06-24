import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements  CanActivate {
  constructor(public _userService: UsuarioService,
              public router: Router) {

  }
  canActivate() {
    if (this._userService.user.rol === 'ADMIN_ROL') {
      console.log('Puede ver el menu usuarios');
      return true;
    } else {
      console.log('Acceso restringido, bloqueado por el guard');
      this.router.navigate(['/login']);
      this._userService.logout();
      return false;
    }
  }

}
