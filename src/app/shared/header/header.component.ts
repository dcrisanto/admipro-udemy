import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { User } from '../../models/user.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    public userService: UsuarioService,
    public router: Router) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  search(term: string) {
    console.log(term);
    this.router.navigate(['/search', term]);
  }

}
