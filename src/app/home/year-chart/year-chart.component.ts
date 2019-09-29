import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-year-chart',
  templateUrl: './year-chart.component.html',
  styleUrls: ['./year-chart.component.scss']
})
export class YearChartComponent implements OnInit {
  @Input() modelYear: any;

  constructor() {}

  ngOnInit() {}
}
