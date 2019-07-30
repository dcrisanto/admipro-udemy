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

}
