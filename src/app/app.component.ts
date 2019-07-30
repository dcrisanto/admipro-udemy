import { Component } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';
  // Se realizará la lógica de persistencia cuando se recargue la página en el AppComponent
  // porque es el primer componente que se carga al principio
  constructor(private _settings: SettingsService) {

  }
}
