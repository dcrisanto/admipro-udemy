import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  hide: string = '';
// Para manipular los elementos del DOM es preferible hacerlo por Render
  constructor() { 
    console.log('Modal listo');
  }

  ngOnInit() {
  }


}
