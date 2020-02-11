import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    // Realizar peticiones http lo inyectamos
    public http: HttpClient
  ) {
    console.log('Servicio de usuario listo');
   }

   login(user: User, remember: boolean) {
     console.log(remember);
     if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
     const url = URL_SERVICES + '/login';
     return this.http.post(url, user)
      .pipe(
        map( (resp: any) => {
          swal('Login exitoso', resp.user.name + ':' + ' ' + user.email, 'success');
          localStorage.setItem('id', resp.id);
          localStorage.setItem('token', resp.token);
          // Usuario como es un objeto lo guardo como string porq sólo eso acepta el Storage
          localStorage.setItem('user', JSON.stringify(resp.user));
          // Retorno un true ya no se va a devolver nada en el componente login
          return true;
        }));
   }

   // Creando un método para llamar al servicio crearUsuarios
   createUser(user: User) {
     const url = URL_SERVICES + '/user';
     // Lamando a la petición. Lo retorno para devolver un observador para poderme subscribir
     return this.http.post(url, user)
       .pipe(
     // Utilizo el operador map para recibir la respuesta y transformarla
       map( (resp: any) => {
        swal('Usuario creado', user.email, 'success');
        return resp.user;
       }));
   }
}
