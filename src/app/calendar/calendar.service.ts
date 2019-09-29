import { Injectable } from '@angular/core';

import { BoxService } from '../box/services/box.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private boxService: BoxService) {}

  getAll() {
    return this.boxService.getllForCalendar();
  }
}
