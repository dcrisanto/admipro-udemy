import { Component, OnInit } from '@angular/core';
import { Medic } from '../../models/medic.model';
import { MedicService, HospitalService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: []
})
export class MedicComponent implements OnInit {
  hospitals: Hospital[] = [];
  medic: Medic = new Medic('', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public medicService: MedicService,
              public hospitalService: HospitalService,
              public router: Router) {
                console.log(this.medic._id);
               }

  ngOnInit() {
    this.hospitalService.loadHospitals()
    .subscribe((resp: any) => this.hospitals = resp.hospitals);

    console.log(this.medic._id);
  }

  saveMedic(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    this.medicService.createMedic(f.value)
        .subscribe((resp: Medic) => {
          swal('Médico creado', `El médico creado es : ${resp.name}`, 'success');
          this.medic._id = resp._id;
          this.router.navigate(['/medic', resp._id]);
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

}
