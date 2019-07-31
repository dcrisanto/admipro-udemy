import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // Crear una propiedad
  settings: Settings = {
    topicUrl: 'assets/css/colors/default.css',
    topic: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document ) { 
    // Cuando el servicio sea inyectado se dispare la función loadSettings, por ello se llama en el
    // constructor del servicio
    this.loadSettings();
  }

  // Método para mantener la persistencia, convirtiendo a string porq solo eso permite guardar
  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }
  // Obtener settings, primero valido que exista settings
  loadSettings() {
    // Cargando del localStorage
    if ( localStorage.getItem('settings')) {
        this.settings = JSON.parse(localStorage.getItem('settings'));
        this.applyTopic( this.settings.topic );
    // Usando los valores por defecto
    } else {
      this.applyTopic( this.settings.topic );
    }
  }
  // Para que aplique el cambio de tema
  applyTopic( topic: string ) {
       // plecas para hacer un template
    const url = `assets/css/colors/${ topic }.css`;
    this._document.getElementById('topic').setAttribute('href', url);

    this.settings.topic = topic;
    this.settings.topicUrl = url;

    this.saveSettings();
  }

}

// Interface para poder restringir la forma de manejar los ajustes

interface Settings {
  topicUrl: string;
  topic: string;
}
