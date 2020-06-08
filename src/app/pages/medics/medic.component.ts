import { Component, OnInit } from '@angular/core';
import { Medic } from '../../models/medic.model';
import { MedicService, HospitalService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: []
})
export class MedicComponent implements OnInit {
  hospitals: Hospital[] = [];
  medic: Medic = new Medic('', '', '', '');

  constructor(public medicService: MedicService,
              public hospitalService: HospitalService) {
               }

  ngOnInit() {
    this.hospitalService.loadHospitals()
    .subscribe((resp: any) => this.hospitals = resp.hospitals);
    console.log(this.medic);
  }


  // Crear Médico
  createMedic() {
      this.medicService.createMedic(name)
        .subscribe(resp => {
          console.log(resp);
          swal('Médico creado', `El médico creado es : ${name}`, 'success');
        });

  }

  saveMedic(f: NgForm) {
    console.log(this.medic);
    if ( f.invalid ) {
      return;
    }

    this.medicService.createMedic(f.value)
        .subscribe(resp => {
          console.log(resp);
          swal('Médico creado', `El médico creado es : ${f.value.name}`, 'success');
        });

  }

}
