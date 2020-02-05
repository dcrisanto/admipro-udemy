import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { User } from '../models/user.model';
import swal from 'sweetalert';

// Función para que al recargar la página el loading no se quede cargando
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Asignamos el valor por defecto false a la variable remember
  remember: boolean = false;

  constructor(
              public router: Router,
              public usuarioService: UsuarioService,
              ) { }

  ngOnInit() {
     init_plugins();
  }

  login( form: NgForm ) {
    if ( form.invalid ) {
      return;
    }

    // Creo una variable de tipo usuario
    const user = new User(null, form.value.email, form.value.password);
    this.usuarioService.login(user, form.value.remember)
      .subscribe( loginExitoso => this.router.navigate(['/dashboard']));
  }

}
