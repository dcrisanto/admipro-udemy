import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, UploadFileService } from './service.index';
import { HttpClientModule } from '@angular/common/http';




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
      UploadFileService
  ]
})
export class ServiceModule { }
