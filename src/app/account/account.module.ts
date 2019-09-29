import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, AccountRoutingModule]
})
export class AccountModule {}
