import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
  @Input() doughnutChartLabels: Array<string> = [];
  @Input() doughnutChartData: Array<number> = [];
  @Input() doughnutChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
