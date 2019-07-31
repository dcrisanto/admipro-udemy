import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Declaro la funcion porque si existe para poder hacer uso de ella.
// declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit() {
    // init_plugins();
  }

  login() {
    console.log('ingresando');
    this.router.navigate(['/dashboard']);
  }

}
