import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController, NavController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalendarService } from './calendar.service';
import { BoxService } from '../box/services/box.service';

export interface IEvent {
  title: string;
  desc: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss']
})
export class CalendarPage implements OnInit {
  minDate = new Date().toISOString();
  isControlHour = true;
  segment = 'box';
  event: IEvent;

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    locale: 'pt-BR',
    currentDate: new Date(),
    allDayLabel: 'Dia Todo',
    noEventLabel: 'Nenhum resultado'
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  viewDate: Date;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private calendarService: CalendarService,
    private boxService: BoxService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {
    this.resetEvent();
    this.viewDate = new Date();
    this.boxService.getllForCalendar().subscribe(snaps => {
      this.eventSource = snaps;
    });
  }
  next() {
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    const start = formatDate(event.startTime, 'medium', this.locale);
    const end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: start,
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            this.navCtrl.navigateForward(['/box', event.condition ? 'receive' : 'pay', event.id]);
          }
        },
        'OK'
      ]
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    const selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = selected.toISOString();
  }

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  // Create the right event format and reload source
  addEvent() {
    const eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    };

    if (eventCopy.allDay) {
      const start = eventCopy.startTime;
      const end = eventCopy.endTime;

      eventCopy.startTime = new Date(
        Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate())
      );
      eventCopy.endTime = new Date(
        Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1)
      );
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  segmentChange(ev) {}
}
