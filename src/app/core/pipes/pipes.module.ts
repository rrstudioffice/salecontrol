import { NgModule } from '@angular/core';
import { MomentPipe } from './moment/moment.pipe';
import { FormatPipe } from './format/format.pipe';

@NgModule({
  declarations: [MomentPipe, FormatPipe],
  imports: [],
  exports: [MomentPipe, FormatPipe]
})
export class PipesModule {}
