import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SEARCH_HOSPITALS, URL_PATH_HOSPITALS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  hospital: Hospital;

  constructor(
    public http: HttpClient,
    public userService: UsuarioService
  ) {}


  // Crear hospital
  createHospital(name: string) {
      const url = URL_PATH_HOSPITALS + '?token=' + this.userService.token;
      return this.http.post(url, { name })
        .pipe(
          map((resp: any) => {
              console.log(resp);
              swal('Hospital creado correctamente', name, 'success');
              return resp.hospital;
          }));
  }

  // Cargar todos los hospitales
  loadHospitals( since: number = 0) {
    const url = URL_PATH_HOSPITALS + '?since=' + since;
    return this.http.get(url);
  }

  // Obtener hospital por ID
  getHospital(id: string) {
    const url = URL_PATH_HOSPITALS + '/' + id;
    return this.http.get(url);
  }

  // Delete Hospital
  deleteHospital(id: string) {
    let url = URL_PATH_HOSPITALS + '/' + id;
    url += '?token=' + this.userService.token;
    return this.http.delete(url)
      .pipe(
        map( resp => {
          console.log(resp);
          swal('Hospital eliminado correctamente!', {
            icon: 'success'
          });
          return true;
        }));
  }

  // Buscar Hospital
  searchHospital( term: string ) {
    const url = URL_SEARCH_HOSPITALS + term;
    return this.http.get(url)
      .pipe(
        map( ( resp: any ) => resp.hospitals )
      )
  }

  // Actualizar Hospital
  updateHospital( hospital: Hospital ) {
    let url = URL_PATH_HOSPITALS + '/' + hospital._id;
    url += '?token=' + this.userService.token;
    return this.http.put(url, hospital)
      .pipe(
        map( (resp: any) => {
          swal('Hospital actualizado', hospital.name, 'success');
          return true;
        }));
  }


}
