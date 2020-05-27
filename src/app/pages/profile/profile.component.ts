import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { User } from '../../models/user.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  user: User;
  uploadImage: File;
  temporaryImage: string;

  constructor(public userService: UsuarioService) {
    this.user = this.userService.user;
  }

  ngOnInit() {

  }

  save(user: User) {
    // Actualizando los valores en el servicio
    this.user.name = user.name;
    if(!this.user.google){
      this.user.email = user.email;
    }
    console.log(user);
    this.userService.upDateUser(this.user)
    .subscribe(resp => {
      console.log(resp);
    });
  }

  imageSelection(file: File) {
    if (!file) { // Si no existe el archivo que no haga nada
      this.uploadImage = null;
      return;
    }  
    if ( file.type.indexOf('image') < 0 ) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.uploadImage = null;
      return;
    }
    this.uploadImage = file;

    let reader = new FileReader();
    let urlTemporaryImage = reader.readAsDataURL(file);
    
    reader.onloadend = () => this.temporaryImage = reader.result as string; // Nos brinda la imagen en base 64
    

  }

  changeImage() {
    this.userService.changeImage(this.uploadImage, this.user._id);
  }
}
