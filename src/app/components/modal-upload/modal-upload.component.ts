import { Component, OnInit} from '@angular/core';
import swal from 'sweetalert';
import { UploadFileService } from '../../services/uploadFile/upload-file.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  uploadImage: File;
  temporaryImage: string;
  // hide: string = '';
  constructor(public uploadFileService: UploadFileService,
              public modalUploadService: ModalUploadService) {
  }

  ngOnInit() {
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

    const reader = new FileReader();
    const urlTemporaryImage = reader.readAsDataURL(file);
    
    reader.onloadend = () => this.temporaryImage = reader.result as string; // Nos brinda la imagen en base 64

  }

  changeImage() {
    console.log('Subiendo Imagen');
    // Función regresa una promesa por lo que tengo las opciones then y catch
    this.uploadFileService.uploadFile(this.uploadImage, this.modalUploadService.type, this.modalUploadService.id)
      .then( resp => {
        console.log(resp);
        // Llamando al objecto para emitir la notificación de que se subió la imagen
        this.modalUploadService.notification.emit(resp);
        // Depués de haber emitido la notificación se oculta el modal
        this.closeModal();
      })
      .catch( error => {
        console.log('Error en la carga de imagen...');
      });
  }

  closeModal() {
    this.temporaryImage = null;
    this.uploadImage = null;

    this.modalUploadService.hideModal();
  }


}
