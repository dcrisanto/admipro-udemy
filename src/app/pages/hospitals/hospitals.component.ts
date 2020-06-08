import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

// Para que ya no muestre errores en el swal
declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
})
export class HospitalsComponent implements OnInit {
  loading: boolean = true;
  hospitals: Hospital[] = [];
  since: number = 0;
  totalRecords: number = 0;
  nameHospital: string;


  constructor(
              public hospitalService: HospitalService,
              public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadHospitals();
     // Cargando la imagen cuando sea notificado
    this.modalUploadService.notification
     .subscribe( () => this.loadHospitals() );
  }

  // Crear Hospital
  createHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital:',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerModel: true
    })
    .then((name: string) => {
      if ( !name || name.length === 0 ) {
        return;
      }
      this.hospitalService.createHospital(name)
        .subscribe(resp => this.loadHospitals()) ;
    });
  }

  // Cargar Hospitales
  loadHospitals() {
    this.loading = true;

    this.hospitalService.loadHospitals(this.since)
      .subscribe((resp: any) => {
        this.hospitals = resp.hospitals;
        this.totalRecords = resp.total;
        this.loading = false;
      });
  }

  // Obtener hospital por ID
  getHospital( id: string ) {
    this.hospitalService.getHospital(id)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  // Buscar hospital
  searchHospital( term: string ) {
    if ( term.length <= 0 ) {
      this.loadHospitals();
      return;
    }

    this.loading = true;

    this.hospitalService.searchHospital(term)
      .subscribe((hospitals: Hospital[]) => {
        this.hospitals = hospitals;
        this.loading = false;
      });
}

// Paginación
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
  this.loadHospitals();
}

// Borrar hospital
deleteHospital( hospital: Hospital ) {
  swal({
    title: '¿Estás seguro que deseas eliminar a ' + hospital.name + '?',
    text: 'Los datos del hospital serán eliminados definitivamente',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    console.log(willDelete);
    if (willDelete) {
      this.hospitalService.deleteHospital(hospital._id)
     .subscribe((deleteHospital: boolean) => {
       this.loadHospitals();
     });
    }
  });

}

// Actualizar hospital
saveHospital( hospital: Hospital ) {
  console.log(hospital);
  this.hospitalService.updateHospital(hospital)
      .subscribe();
}

updatedImage(hospital: Hospital) {
  this.modalUploadService.showModal('hospitals', hospital._id);
}

}
