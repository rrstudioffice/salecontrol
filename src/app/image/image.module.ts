import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImagePage } from './image.page';

const routes: Routes = [
  {
    path: 'modal-image',
    component: ImagePage
  }
];

@NgModule({
  imports: [SharedModule, ImageCropperModule, RouterModule.forChild(routes)],
  declarations: [ImagePage]
})
export class ImagePageModule {}
