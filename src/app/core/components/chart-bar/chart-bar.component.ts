import { Component, Input } from '@angular/core';
import { Chart, ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss']
})
export class ChartBarComponent {
  @Input() chartTitle = 'Gráfico';
  @Input() chartLabel: string[];
  @Input() chartData: any[];
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: 'black',
        font: {
          weight: 'bold'
        }
      }
    },
    legend: {
      display: true
    },
  }

  constructor() {
    Chart.pluginService.register(pluginDataLabels);
  }
  public barChartType:ChartType = 'bar';
  public barChartLegend:boolean = true;
  // events
  public chartClicked(e:any):void {}
  public chartHovered(e:any):void {}

}
