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
  loading: boolean = true;
  

  constructor(public userService: UsuarioService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this.userService.loadUsers(this.since)
      .subscribe((resp: any) => {
        this.users = resp.users;
        this.totalRecords = resp.total;
        this.loading = false;
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

  searchUser( term: string ) {
      if ( term.length <= 0 ) {
        this.loadUsers();
        return;
      }  

      this.loading = true;

      this.userService.searchUsers(term)
        .subscribe((users: User[]) => {
          this.users = users;
          this.loading = false;
          console.log(this.users);
        });
  }



}
