import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert';

// Para que ya no muestre errores en el swal
declare var swal: any;

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

  deleteUser( user: User ) {
    console.log(user);
    if ( user._id === this.userService.user._id ) {
      swal('Acceso denegado', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Estás seguro que deseas eliminar a ' + user.name + '?',
      text: 'Los datos del usuario serán eliminados definitivamente',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      console.log(willDelete);
      if (willDelete) {
        this.userService.deleteUser(user._id)
       .subscribe((deleteUser: boolean) => {
         console.log(deleteUser);
         this.loadUsers();
       });
      }
    });

  }


}
