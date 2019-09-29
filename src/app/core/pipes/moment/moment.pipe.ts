import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {
  transform(date: string, format: string) {
    return moment(date)
      .utc()
      .format(format);
  }
}
