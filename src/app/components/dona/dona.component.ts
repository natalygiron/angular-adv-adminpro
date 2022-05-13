import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  
  @Input() titulo: string = 'Sin título';
  
  @Input('labels') doughnutChartLabels: string[] = [ 'Label 1', 'Label 2', 'Label 3' ];
  
  @Input() data = [ 350, 450, 100 ];
  
  backgroundColor: string[] = [ '#6857E6', '#009FEE', '#F02059'];
  
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.data,
        backgroundColor: this.backgroundColor },
      ]
  };

  public doughnutChartType: ChartType = 'doughnut';
  
  ngOnChanges(){
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: this.data,
          backgroundColor: this.backgroundColor }
      ]
    }
  }
  
  
}
