import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { ChartsModule } from 'ng2-charts';
// COMPONENTS
import { ChartDoughnutComponent } from './chart-doughnut/chart-doughnut.component';
import { ListColrowComponent } from './list-colrow/list-colrow.component';
import { ListNullComponent } from './list-null/list-null.component';
import { ChartBarComponent } from './chart-bar/chart-bar.component';

@NgModule({
  declarations: [
    ListNullComponent,
    ListColrowComponent,
    ChartBarComponent,
    ChartDoughnutComponent
  ],
  imports: [SharedModule, ChartsModule, PipesModule],
  exports: [
    ListNullComponent,
    ListColrowComponent,
    ChartBarComponent,
    ChartDoughnutComponent
  ]
})
export class ComponentsModule {}
