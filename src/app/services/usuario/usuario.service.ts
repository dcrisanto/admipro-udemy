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
