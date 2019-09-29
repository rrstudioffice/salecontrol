import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginPage
      }
    ])
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
