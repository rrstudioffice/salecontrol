import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { CategoryAddPage } from './category-add.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryAddPage
  }
];

@NgModule({
  imports: [SharedModule, ComponentsModule, RouterModule.forChild(routes)],
  declarations: [CategoryAddPage]
})
export class CategoryAddPageModule {}
