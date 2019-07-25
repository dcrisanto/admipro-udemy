import { Component, OnInit } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  legend1: string = 'Progress blue';
  legend2: string = 'Progress green';
  progress1: number = 40;
  progress2: number = 50;

  constructor() { }

  ngOnInit() {
  }


}
