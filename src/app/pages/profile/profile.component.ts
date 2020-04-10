import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  user: User;

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
}
