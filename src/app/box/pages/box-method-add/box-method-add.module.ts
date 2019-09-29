import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoxMethodAddPage } from './box-method-add.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BoxMethodAddPage
  }
];

@NgModule({
  imports: [SharedModule, ComponentsModule, RouterModule.forChild(routes)],
  declarations: [BoxMethodAddPage]
})
export class BoxMethodAddPageModule {}
