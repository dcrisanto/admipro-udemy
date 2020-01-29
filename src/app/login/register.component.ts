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
  areEqual(campo1: string, campo2: string){
    // Retorno una función que retorna un FormGroup
      return (group: FormGroup) => {
        let pass1 = group.controls[campo1].value;
        let pass2 = group.controls[campo2].value;
        // Retorno null porque la regla de validación pasa al ser los pass iguales
        if (pass1 === pass2) {
          return null;
        }
        // areEqual es el error que va a impedir que el formulario sea válido
        return {
          areEquals: true
        };
      };
  }

  ngOnInit() {
    init_plugins();
// FormControl('valor por defecto', Validators.tipoValidation  )
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      condition: new FormControl(false),
      // Validación general a todo el formulario, esperando una función
    }, { validators: this.areEqual('password', 'confirmPassword')});

    // Valores por defecto al cargar
    this.form.setValue({
      name: 'Dorelly ',
      email: 'dore@es.com',
      password: '1234567',
      confirmPassword: '12345678',
      condition: true

    });
  }

  registerUser(){
    if (this.form.invalid) {
      return;
    }
    // Si las condiciones no están seleccionadas
    if (!this.form.value.condition) {
      console.log('Debe seleccionar las condiciones');
      return;
    }
    console.log('Formulario válido', this.form.valid);
    console.log(this.form.value);
    console.log(this.form);
  }

}
