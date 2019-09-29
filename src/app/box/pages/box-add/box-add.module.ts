import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { BoxAddPage } from './box-add.page';

const routes: Routes = [
  {
    path: '',
    component: BoxAddPage
  }
];

@NgModule({
  imports: [SharedModule, ComponentsModule, RouterModule.forChild(routes)],
  declarations: [BoxAddPage]
})
export class BoxAddPageModule {}
