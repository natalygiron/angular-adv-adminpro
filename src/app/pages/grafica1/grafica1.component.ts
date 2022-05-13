import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  ngOnInit(): void {
  }

  public labels1: string[] =  ['Café','Tarta','Empanadas'];

  // data que será enviada a la gráfica
  public data1 = [450, 300, 250];
  public data2 = [180, 120, 700];

}
