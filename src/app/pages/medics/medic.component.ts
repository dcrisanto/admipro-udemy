import { Component, OnInit } from '@angular/core';
import { Medic } from '../../models/medic.model';
import { MedicService, HospitalService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: []
})
export class MedicComponent implements OnInit {
  hospitals: Hospital[] = [];
  medic: Medic = new Medic('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public medicService: MedicService,
              public hospitalService: HospitalService,
              public modalUploadService: ModalUploadService,
              public router: Router,
              public activatedRoute: ActivatedRoute) {
                // Para leer el parámetro de la url
                activatedRoute.params.subscribe(params => {
                  const id = params['id'];
                  if ( id !== 'new') {
                    this.medic._id = id;
                    this.updatedMedic(id);
                  }
                });
               }

  ngOnInit() {
    this.hospitalService.loadHospitals()
    .subscribe((resp: any) => {
      this.hospitals = resp.hospitals;
    });

    // Cargando la imagen cuando sea notificado
    this.modalUploadService.notification
     .subscribe( (resp) => {
       this.medic.img = resp.updatedDoctor.img;
      // this.updatedMedic(resp.updatedDoctor._id)
     });
  }

  // Actualizar Médico
  updatedMedic( id: string ) {
    this.medicService.getMedic(id)
      .subscribe( ( medic: any ) => {
        this.medic = medic;
        this.medic.hospital = medic.hospital._id;
        this.hospitalChange(this.medic.hospital);
      });
  }

  saveMedic(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this.medicService.saveMedic(this.medic)
        .subscribe((resp: any) => {
          this.router.navigate(['/medics']);
        });
  }

  hospitalChange( id: string ) {
    if ( id === '') {
      return;
    }
    this.hospitalService.getHospital(id)
        .subscribe((resp: any) => {
          this.hospital = resp.hospital;
        });
  }

  updatedImage(medic: Medic) {
    this.modalUploadService.showModal('doctors', medic._id);
  }

}
