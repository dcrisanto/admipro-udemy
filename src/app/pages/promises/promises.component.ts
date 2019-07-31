import { Component, OnInit } from '@angular/core';
import { reject } from 'q';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
    // 1° forma: Función para escuchar el resolve de la promesa
    /*promise.then(
      () => console.log('Termino!'),
      () => console.log('Error'),
    );*/
    // 2° forma: Para manejar el error
    this.counter().then(
      mensaje => console.log('Termino!', mensaje)
    )
    .catch( error => console.error('Error en la promesa', error));
  }

  ngOnInit() {
  }

  counter(): Promise<boolean> {
      // Toda promesa recibe el resolve (ok) y el reject (error)
    return new Promise( (resolve, reject) => {
      let counter: number = 0;
      // Una función de js que va  hacer ciclo de tiempo y que por cada x cantidad de tiempo disparará
      // una función
      const interval = setInterval( () => {
          counter += 1;
          console.log( counter );
          if ( counter === 3 ) {
            // Manejando el resolve
               resolve(true);
            // Manejando el reject
            // reject('Manejando el reject en la promesa');
            // Para que no se siga ejecutando la función
               clearInterval( interval );
          }
      }, 1000);
    });
  }

}
