import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { BoxTypeAddPage } from './box-type-add.page';

const routes: Routes = [
  {
    path: '',
    component: BoxTypeAddPage
  }
];

@NgModule({
  imports: [SharedModule, ComponentsModule, RouterModule.forChild(routes)],
  declarations: [BoxTypeAddPage]
})
export class BoxTypeAddPageModule {}
