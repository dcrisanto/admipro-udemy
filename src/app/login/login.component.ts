import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { User } from '../models/user.model';
import { element } from 'protractor';

// Función para que al recargar la página el loading no se quede cargando
declare function init_plugins();
// Indicando que existe una librería gapi
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Asignamos el valor por defecto false a la variable remember
  email: string;
  remember: boolean = false;
  // propiedad auth2, obteniendo la información que me regrese google
  auth2: any;

  constructor(
              public router: Router,
              public usuarioService: UsuarioService,
              ) { }

  ngOnInit() {
     init_plugins();
     this.googleInit();
     this.email = localStorage.getItem('email') || '';
     if (this.email.length > 1) {
      this.remember = true;
     }

    }
      // Función para la inicialización del plugin de google
     googleInit() {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1032595731724-4i8etueq6ekk49ja66b3gvi829crfut9.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email' // información de la cuenta de google de la persona que se está logeando
        });
        // Obteniendo el elemento html  por el id
        this.attachSignin(document.getElementById('btnGoogle'));
      });
     }

    // La función recibirá un elemento html. Del callback recibo de la función el googleUser
     attachSignin(element) {
      this.auth2.attachClickHandler (element, {}, (googleUser) => {
        const profile = googleUser.getBasicProfile();
        //const token = googleUser.Zi.id_token;
        const token = googleUser.getAuthResponse().id_token;
        console.log(profile);
        console.log(googleUser);
        console.log(token);
      });
     }
  

  login( form: NgForm ) {
    if ( form.invalid ) {
      return;
    }

    // Creo una variable de tipo usuario
    const user = new User(null, form.value.email, form.value.password);
    this.usuarioService.login(user, form.value.remember)
      .subscribe( loginExitoso => this.router.navigate(['/dashboard']));
    console.log(form.value.remember);
  }

}
