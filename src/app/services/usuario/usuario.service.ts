import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES, URL_LOGIN_GOOGLE, URL_SEARCH_USERS, URL_PATH_USER } from '../../config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../uploadFile/upload-file.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  user: User;
  token: string;
  menu: any[] = [];

  constructor(
    // Realizar peticiones http lo inyectamos
    public http: HttpClient,
    public router: Router,
    public uploadFileService: UploadFileService
  ) {
    console.log('Servicio de usuario listo');
     // Llamar cuando se inicialice
    this.loadStorage();
   }

   logout() {
      this.token = '';
      this.user = null;
      this.menu = [];

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('menu');
      this.router.navigate(['/login']);
   }

   isLogged() {
    return ( this.token.length > 5 ) ? true : false;
   }

   loadStorage() {
     if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
     } else {
       this.token = '';
       this.user = null;
       this.menu = [];
     }
   }

   // Save Local Storage
   saveStorage(id: string, token: string, user: User, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    // Usuario como es un objeto lo guardo como string porq sólo eso acepta el Storages
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    // Setear los valores
    this.user = user;
    this.token = token;
    this.menu = menu;

   }

   // Logeo Google
     loginGoogle(token: string) {
      const url = URL_LOGIN_GOOGLE;
      // Coloco un return para darme cuenta cuando resuelve la información.
      // Envío el token como un objeto
      return this.http.post(url, { token })
        .pipe(
          map((resp: any) => {
            console.log(resp);
            this.saveStorage(resp.id, resp.token, resp.user, resp.menu);
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
          this.saveStorage(resp.id, resp.token, resp.user, resp.menu);
          // Retorno un true ya no se va a devolver nada en el componente login
          return true;
        }));
   }

   // Creando un método para llamar al servicio crearUsuarios
   createUser(user: User) {
     const url = URL_PATH_USER;
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
     let url = URL_PATH_USER + '/' + user._id;
     url += '?token=' + this.token;
     return this.http.put(url, user)
     .pipe(
       map((resp: any) => {

        if ( user._id === this.user._id ) {
          const userDB: User = resp.updatedUser;
          this.saveStorage(userDB._id, this.token, userDB, this.menu);
        }
         swal('Usuario actualizado', user.name, 'success');
         return true;
       }));
   }

   // Actualizando imagen
   changeImage(file: File, id: string) {
    this.uploadFileService.uploadFile(file, 'users', id)
      .then( (resp: any) => { // Debido a que devuelve una promesa
        this.user.img = resp.updatedUser.img;
        swal('Foto actualizada', this.user.name, 'success');
        this.saveStorage(id, this.token, this.user, this.menu);
        console.log(resp);
      })
      .catch(resp => {
        console.log(resp);
      });
   }

   // Cargar usuarios
   loadUsers( since: number = 0) {
    const url = URL_PATH_USER + '?since=' + since;
    // Para notificar a usersComponent cuando termine
    return this.http.get(url);
   }

   // Buscar usuarios
   searchUsers ( term: string ) {
    const url = URL_SEARCH_USERS + term;
    return this.http.get(url)
      .pipe(
        map( ( resp: any ) => resp.users)
      )
    }

    // Borrar usuario
    deleteUser( id: string ) {
      const url = URL_PATH_USER + '/' + id + '?token=' + this.token;
      return this.http.delete(url)
        .pipe(
          map( resp => {
            console.log(resp);
            swal('Usuario eliminado correctamente!', {
            icon: 'success',
          });
            return true;
        }));
    }
}
