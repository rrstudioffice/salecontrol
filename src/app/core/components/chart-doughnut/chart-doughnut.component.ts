import { Component, Input } from '@angular/core';
import { Chart, ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart-doughnut',
  templateUrl: './chart-doughnut.component.html',
  styleUrls: ['./chart-doughnut.component.scss']
})
export class ChartDoughnutComponent {
  @Input() options: ChartOptions = {
    responsive: true
  };
  @Input() chartLabel: string[];
  @Input() chartData: any[];
  constructor() {
    Chart.pluginService.register(pluginDataLabels);
  }
  public pieChartPlugins = [];
  public doughnutChartType: ChartType = 'pie';
  // events
  public chartClicked(e: any): void {}
  public chartHovered(e: any): void {}
}
