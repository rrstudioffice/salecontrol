import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgCalendarModule } from 'ionic2-calendar';
import { CalendarPage } from './calendar.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarPage
  }
];

@NgModule({
  imports: [SharedModule, NgCalendarModule, RouterModule.forChild(routes)],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}
