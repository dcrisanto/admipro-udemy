import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SEARCH } from 'src/app/config/config';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from '../../models/user.model';
import { Medic } from '../../models/medic.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  users: User[]  = [];
  hospitals: Hospital[] = [];
  medics: Medic[] = [];

  constructor(public activatedRoute: ActivatedRoute,
              public http: HttpClient) { 
    activatedRoute.params.subscribe(params => {
      const term = params['term'];
      this.search(term);
    });
  }

  ngOnInit() {
  }

  // Creando método para llamar al servicio Búsqueda
  search(term: string) {
    const url  = URL_SEARCH + term;
    return this.http.get(url)
      .subscribe((resp: any) => {
        this.users = resp.users;
        this.hospitals = resp.hospitals;
        this.medics = resp.doctors;
      });
  }




}
