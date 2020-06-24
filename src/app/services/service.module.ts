import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { 
          SettingsService,
          SharedService,
          SidebarService,
          UsuarioService,
          LoginGuardGuard,
          AdminGuard,
          UploadFileService,
          HospitalService,
          MedicService } from './service.index';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
      SettingsService,
      SharedService,
      SidebarService,
      UsuarioService,
      LoginGuardGuard,
      AdminGuard,
      UploadFileService,
      ModalUploadService,
      HospitalService,
      MedicService
  ]
})
export class ServiceModule { }
