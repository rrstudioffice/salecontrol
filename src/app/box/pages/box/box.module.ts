import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { BoxPage } from './box.page';

const routes: Routes = [
  {
    path: '',
    component: BoxPage
  }
];

@NgModule({
  imports: [SharedModule, ComponentsModule, PipesModule, RouterModule.forChild(routes)],
  declarations: [BoxPage]
})
export class BoxPageModule {}
