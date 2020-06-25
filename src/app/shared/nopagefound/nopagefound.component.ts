import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';

declare function init_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css']
})
export class NopagefoundComponent implements OnInit {
  anio: number = new Date().getFullYear();

  constructor(public _userService: UsuarioService) { }

  ngOnInit() {
    // Inicializamos todos los plugins para que no quede cargando el loading
    init_plugins();
  }

  logout() {
    this._userService.logout();
  }

}
