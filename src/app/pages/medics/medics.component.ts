import { Component, OnInit } from '@angular/core';
import { Medic } from '../../models/medic.model';
import { MedicService } from '../../services/medic/medic.service';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: []
})
export class MedicsComponent implements OnInit {
  loading: boolean = false;
  totalRecords: number = 0;
  medics: Medic[] = [];
  since: number = 0;

  constructor(
              public medicService: MedicService,
              public router: Router) { }

  ngOnInit() {
    this.loadMedics();
  }

  // Búsqueda de Médico
  searchMedic( term: string ) {
    if ( term.length <= 0 ) {
      this.loadMedics();
      return;
    }

    this.loading = true;

    this.medicService.searchMedic(term)
      .subscribe((medics: Medic[]) => {
        this.medics = medics;
        this.loading = false;
      });
}


   // Cargar Médicos
   loadMedics() {
    this.loading = true;

    this.medicService.loadMedics(this.since)
      .subscribe((resp: any) => {
        this.medics = resp.doctors;
        this.totalRecords = resp.total;
        this.loading = false;
      });
  }

  // Paginación
  changeSince(valor: number) {
  const since = this.since + valor;

  if ( since >= this.totalRecords ) {
    return;
  }

  if ( since < 0 ) {
    return;
  }
  this.since += valor;
  this.loadMedics();
}


    // Borrar Médico
deleteMedic( medic: Medic ) {
  swal({
    title: '¿Estás seguro que deseas eliminar al médico ' + medic.name + '?',
    text: 'Los datos del médico serán eliminados definitivamente',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      this.medicService.deleteMedic(medic._id)
     .subscribe((deleteMedic: boolean) => {
       this.loadMedics();
     });
    }
  });

}

  }


