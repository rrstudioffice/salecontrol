import { NgModule } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { ImagePageModule } from 'src/app/image';
import { ViewPage } from './view.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPage
  }
];

@NgModule({
  imports: [SharedModule, ImagePageModule, PipesModule, RouterModule.forChild(routes)],
  entryComponents: [MenuComponent],
  declarations: [ViewPage, MenuComponent]
})
export class ViewPageModule {}
