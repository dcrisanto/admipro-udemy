import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  // Indicando que es un arreglo de usuarios
  users: User[] = [];
  since: number = 0;
  totalRecords: number = 0;
  

  constructor(public userService: UsuarioService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.loadUsers(this.since)
      .subscribe((resp: any) => {
        console.log(resp);
        this.users = resp.users;
        this.totalRecords = resp.total;
      });
  }

  changeSince(valor: number) {
    const since = this.since + valor;
    console.log(since);

    if ( since >= this.totalRecords ) {
      return;
    }

    if ( since < 0 ) {
      return;
    }
    this.since += valor;
    this.loadUsers();
    console.log(this.since);
  }



}
