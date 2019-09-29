import * as moment from 'moment';

export class FilterModel {
  month: number;
  year: number;

  constructor(month: number, year: number) {
    this.month = month;
    this.year = year;
  }

  getMonthString() {
    return moment({ month: this.month, year: this.year }).format('MMMM YYYY');
  }
}
