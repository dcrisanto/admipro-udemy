import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {
  // Con este inyectable tenemos acceso a todo el DOM
  constructor( @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
  }

  changeColor( topic: string, link: ElementRef ) {
    this.addCheck( link );
    // plecas para hacer un template
    const url = `assets/css/colors/${ topic }.css`;
    this._document.getElementById('topic').setAttribute('href', url);
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
