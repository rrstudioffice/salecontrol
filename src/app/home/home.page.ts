import { Component, OnInit } from '@angular/core';
import { BoxService, IBox } from '../box/services/box.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  modelYear$: Observable<any>;
  model$: Observable<any>;
  date: string;

  monthNumber: number;
  yearNumber: number;
  form: FormGroup;
  days: { cod: number; label: string }[];
  years: any[];

  constructor(private fb: FormBuilder, private service: BoxService) {}

  ngOnInit() {
    this.createForm();
    this.monthNumber = moment().month();
    this.yearNumber = moment().year();
    this.date = moment().format('MMMM YYYY');
    this.model$ = this.service.getAllByChartMonthYear(this.monthNumber, this.yearNumber);
    this.modelYear$ = this.service.getAllByChartYear(this.yearNumber);
    this.days = [
      { cod: 0, label: 'Janeiro' },
      { cod: 1, label: 'Fevereiro' },
      { cod: 2, label: 'Março' },
      { cod: 3, label: 'Abril' },
      { cod: 4, label: 'Maio' },
      { cod: 5, label: 'Junho' },
      { cod: 6, label: 'Julho' },
      { cod: 7, label: 'Agosto' },
      { cod: 8, label: 'Setembro' },
      { cod: 9, label: 'Outubro' },
      { cod: 10, label: 'Novembro' },
      { cod: 11, label: 'Dezembro' }
    ];
    const array = [];
    for (let i = 0; i < 20; i++) {
      array.push(moment().year() + 1 - i);
    }
    this.years = array;
  }

  private createForm(): void {
    this.monthNumber = moment().month();
    this.yearNumber = moment().year();
    this.form = this.fb.group({
      month: [moment().month()],
      year: [moment().year()]
    });
  }

  search() {
    this.date = moment({ month: this.form.value.month, year: this.form.value.year }).format(
      'MMMM YYYY'
    );
    this.model$ = this.service.getAllByChartMonthYear(this.form.value.month, this.form.value.year);
    this.modelYear$ = this.service.getAllByChartYear(this.form.value.year);
  }
}
