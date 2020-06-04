import { Injectable, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  // Lo que se requiere controlar desde el servicio
  public type: string;
  public id: string;
  public hide: string = 'hide';
  // Para notificar a los demás componentes que se subió una imagen
  public notification = new EventEmitter<any>();
  constructor(public userService: UsuarioService) {
    console.log('Modal service listo');
  }

  hideModal() {
    this.hide = 'hide';
    // Para evitar que estas variables se encuentren setiadas
    this.id = null;
    this.type = null;

  }

  showModal(type: string, id: string) {
    this.hide = '';
    this.id = id;
    this.type = type;
  }
}
