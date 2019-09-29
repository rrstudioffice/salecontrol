import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { BoxMethodPage } from './box-method.page';

const routes: Routes = [
  {
    path: '',
    component: BoxMethodPage
  }
];

@NgModule({
  imports: [SharedModule, ComponentsModule, RouterModule.forChild(routes)],
  declarations: [BoxMethodPage]
})
export class BoxMethodPageModule {}
