import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES, URL_LOGIN_GOOGLE, URL_UPDATE_USER } from '../../config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  user: User;
  token: string;

  constructor(
    // Realizar peticiones http lo inyectamos
    public http: HttpClient,
    public router: Router
  ) {
    console.log('Servicio de usuario listo');
     // Llamar cuando se inicialice
    this.loadStorage();
   }

   logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
      console.log('Seteando los valores al salir');
   }

   isLogged() {
    return ( this.token.length > 5 ) ? true : false;
   }

   loadStorage() {
     if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
     } else {
       this.token = '';
       this.user = null;
     }
   }

   // Save Local Storage
   saveStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    // Usuario como es un objeto lo guardo como string porq sólo eso acepta el Storages
    localStorage.setItem('user', JSON.stringify(user));

    // Setear los valores
    this.user = user;
    this.token = token;

   }

   // Logeo Google
     loginGoogle(token: string) {
      const url = URL_LOGIN_GOOGLE;
      // Coloco un return para darme cuenta cuando resuelve la información.
      // Envío el token como un objeto
      return this.http.post(url, { token })
        .pipe(
          map((resp: any) => {
            this.saveStorage(resp.id, resp.token, resp.user);
            return true;
          }));
     }

  // Logeo Normal
   login(user: User, remember: boolean) {
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
          this.saveStorage(resp.id, resp.token, resp.user);
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

   // Actualizar usuario
   upDateUser(user: User) {
     let url = URL_UPDATE_USER + user._id;
     url += '?token=' + this.token;
     console.log(url);
     return this.http.put(url, user)
     .pipe(
       map((resp: any) => {
         swal('Usuario actualizado', user.email, 'success');
         console.log(resp);
         const userDB: User = resp.updatedUser;
         this.saveStorage(userDB._id, this.token, userDB);
         return true;
       }));
   }
}
