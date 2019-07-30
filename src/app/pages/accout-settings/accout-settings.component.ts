import { Component, OnInit, ElementRef } from '@angular/core';
import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {
  // Con este inyectable tenemos acceso a todo el DOM
  // Importando el servicio settings para poder tener acceso a todos sus propiedades y métodos
  constructor( private _settings: SettingsService) { }

  ngOnInit() {
    // Al cargar el componente se disparará la función que va ha revisar que elemento del html cuenta
    // con la clase working
    this.checkPersistence();
  }

  changeColor( topic: string, link: ElementRef ) {
    this.addCheck( link );
    this._settings.applyTopic( topic );
  }

  addCheck( link: any) {
    // Arreglo de selectores que enmarca todos
    const selectors: any = document.getElementsByClassName('selector');

    for ( const ref of selectors) {
        ref.classList.remove('working');
    }

    link.classList.add('working');

  }

  checkPersistence() {
    // Todos los elementos que contengan la clase selectors
    const selectors: any = document.getElementsByClassName('selector');
    // Creando variable para hacer referencia al tema que se encuentra en el servicio
    const topic = this._settings.settings.topic;
    for ( const ref of selectors) {
      // Validar sobre la referencia
      if ( ref.getAttribute('data-theme') === topic ) {
        ref.classList.add('working');
        // Cómo ya no habrán más elementos que contenga el atributo salgo del ciclo for
        break;
      }
    }
  }

}
