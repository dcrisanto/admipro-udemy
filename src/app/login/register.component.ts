import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Función para que al recargar la página el loading no se quede cargando
declare function init_plugins();
// importar swal para utilizar sus pop-up
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  // Creo un objeto llamado form de tipo FormGroup
  form: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
    ) { }
  areEqual(campo1: string, campo2: string) {
    // Retorno una función que retorna un FormGroup
      return (group: FormGroup) => {
        const pass1 = group.controls[campo1].value;
        const pass2 = group.controls[campo2].value;
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
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(250)]),
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

  registerUser() {
    if (this.form.invalid) {
      swal('Importante', 'No puede registrarse, datos incorrectos', 'warning');
      return;
    }
    // Si las condiciones no están seleccionadas
    if (!this.form.value.condition) {
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }
    // Se crea el usuario del modelo ya que lo requiere el servicio
    const user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
      );
      // Me subscribo para que se pueda disparar y el resp es la respuesta del servicio
      // crear usuarios.
    this.usuarioService.createUser(user)
        .subscribe( resp => {
          // swal('Registro culminado', 'Usuario creado correctamente ' + resp.user.email, 'success');
        this.router.navigate(['/login']);
      });
  }

}
