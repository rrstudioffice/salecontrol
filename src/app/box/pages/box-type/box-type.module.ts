import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { BoxTypePage } from './box-type.page';

const routes: Routes = [
  {
    path: '',
    component: BoxTypePage
  }
];

@NgModule({
  imports: [SharedModule, ComponentsModule, RouterModule.forChild(routes)],
  declarations: [BoxTypePage]
})
export class BoxTypePageModule {}
