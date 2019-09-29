import { NgModule } from '@angular/core';
import { ComponentsModule } from '../core/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { ConfirmedPendingComponent } from './confirmed-pending/confirmed-pending.component';
import { YearChartComponent } from './year-chart/year-chart.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [SharedModule, ComponentsModule, NgCalendarModule, RouterModule.forChild(routes)],
  declarations: [HomePage, ConfirmedPendingComponent, YearChartComponent]
})
export class HomePageModule {}
