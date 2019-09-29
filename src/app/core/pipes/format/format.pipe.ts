import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {
  transform(value: number) {
    const date = new Date(value);
    return moment(date).fromNow();
  }
}
