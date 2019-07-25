import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-increase',
  templateUrl: './increase.component.html',
  styles: []
})

export class IncreaseComponent implements OnInit {
  // Para recibir los valores desde afuera usar @Input()
  @Input() legend: string = 'Leyenda';
  @Input() progress: number = 50;
  // Emitir un valor como un evento
  @Output() emitValue: EventEmitter<number> = new EventEmitter();
  // Decorador para hacer referencia al elemento del html del cuál se está haciendo el cambio
  // Recibe cómo parámetro el elemto html, luego se hace una referencia al txtProgress
  @ViewChild('txtProgress') txtProgress: ElementRef;

  // private renderer: Renderer2
  constructor() {
  }

  ngOnInit() {
  }

  onChanges( newValue: number  ) {
     // const elementHtml: any = document.getElementsByName('progress')[0];
     // console.log(this.txtProgress);

     if ( newValue >= 100 ) {
      this.progress = 100;
    } else if ( newValue <= 0 ) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

     // elementHtml.value = this.progress;
     this.txtProgress.nativeElement.value = this.progress;

     this.emitValue.emit( this.progress );

  }

  changeValue( value: number ) {
    if ( this.progress >= 100 && value > 0 ) {
      this.progress = 100;
      return;
    }

    if (this.progress <= 0 && value < 0 ) {
      this.progress = 0;
      return;
    }

    this.progress += value;

    this.emitValue.emit( this.progress );

    // Setear el focus en un elemento en particular.
    this.txtProgress.nativeElement.focus();

  }

}
