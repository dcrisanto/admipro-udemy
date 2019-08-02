import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  title: string;

  // Obtener los parámetros de las rutas
  constructor( private router: Router,
               private _title: Title ) {
    this.getDataRoute()
    .subscribe( data => {
     this.title = data.title;
     // Establecer el título de un documento HTML.
     this._title.setTitle(this.title);
    });
  }

  ngOnInit() {
  }

  // Función que retorna un nuevo observable
  getDataRoute() {
    return this.router.events.pipe(
      filter ( event => event instanceof ActivationEnd),
      filter ( (event: ActivationEnd) => event.snapshot.routeConfig.path !== "" ),
      map ( (event: ActivationEnd) => event.snapshot.data )
      );
  }

}
