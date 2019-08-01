import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() { 
      // Objeto observer de tipo subscribe pero no es necesario especificarlo
    let obs = new Observable( observer => {
      let counter = 0;
      let interval = setInterval( () => {
        counter += 1;
        // El observable notificará mediante el next cada que llegue información.
        observer.next( counter );
        if ( counter === 3 ) {
          clearInterval( interval );
          // Indicar que terminó
          observer.complete();
        }

        if ( counter === 2 ) {
          // clearInterval( interval );
            observer.error('Aún no llega al 3 ')
        }
      }, 1000);
    });

    // Para escuchar al observable me debo subscribir
    // Para volver a intertarlo usamos retry, se vuelve a subscribir, de parámetro se puede enviar
    // la cantidad de reintentos que se requiere.
    obs.pipe(
      retry(2)
    )
    // El obs tiene 3 callback
    .subscribe(
      // 1° Callback: Cuando se llama un next, se recibe algo, lo que esté emitiendo el observador
      number => console.log('Subs ', number),
      // 2° Callback: Cuando se presenta un error
      error => console.error('Error en el obs ', error),
      // 3° Callback: No recibe ningún parámetro, es cuando termina
      () => console.log('El Observador Terminó')
    );
  }

  ngOnInit() {
  }

}
