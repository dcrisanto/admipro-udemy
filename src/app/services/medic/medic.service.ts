import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_PATH_MEDICS, URL_SEARCH_MEDICS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Medic } from '../../models/medic.model';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MedicService {
  _id: string = '';

  constructor(
              public http: HttpClient,
              public userService: UsuarioService,
              public activatedRoute: ActivatedRoute
  ) {
   }

  // Crear Médico y Actualizar Médico
  saveMedic(medic: Medic) {
    let url = URL_PATH_MEDICS;
    // Creando
    if (!medic._id) {
      url += '?token=' + this.userService.token;
      return this.http.post(url, medic)
      .pipe(
        map((resp: any) => {
            swal('Médico creado correctamente', medic.name, 'success');
            return resp.doctor;
        }));
    // Actualizando
    } else {
      url += '/' + medic._id;
      url += '?token=' + this.userService.token;
      return this.http.put(url, medic)
    .pipe(
      map( (resp: any) => {
        swal('Médico actualizado', medic.name, 'success');
        return true;
      }));
    }
}

  // Cargar todos los médicos
  loadMedics( since: number = 0) {
    const url = URL_PATH_MEDICS + '?since=' + since;
    return this.http.get(url);
  }

  // Cargar médico por Id
  getMedic(id: string) {
    const url = URL_PATH_MEDICS + '/' + id;
    return this.http.get(url)
        .pipe(
          map((resp: any) => resp.medic));
  }

  // Búsqueda de médicos
  searchMedic( term: string ) {
    const url = URL_SEARCH_MEDICS + term;
    return this.http.get(url)
      .pipe(
        map( ( resp: any ) => resp.doctors )
      );
  }

  // Delete Médico
  deleteMedic(id: string) {
    let url = URL_PATH_MEDICS + '/' + id;
    url += '?token=' + this.userService.token;
    return this.http.delete(url)
      .pipe(
        map( resp => {
          console.log(resp);
          swal('Médico eliminado correctamente!', {
            icon: 'success'
          });
          return true;
        }));
  }

}
