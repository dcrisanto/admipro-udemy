import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Función para que al recargar la página el loading no se quede cargando
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit() {
     init_plugins();
  }

  login() {
    console.log('ingresando');
    this.router.navigate(['/dashboard']);
  }

}
