import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: User;


  constructor( 
              public _sidebarService: SidebarService,
              public userService: UsuarioService) { }

  ngOnInit() {
    this.user = this.userService.user;
    this._sidebarService.getMenu();
  }

}
