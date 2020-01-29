import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Función para que al recargar la página el loading no se quede cargando
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  // Creo un objeto llamado form de tipo FormGroup
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    init_plugins();
// FormControl('valor por defecto', Validators.tipoValidation  )
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      condition: new FormControl(false),
    });
  }

  registerUser(){
    console.log(this.form.value);
  }

}
