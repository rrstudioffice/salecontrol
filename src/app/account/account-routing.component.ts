import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'notifications',
        loadChildren: './pages/notification/notification.module#NotificationPageModule'
      },
      {
        path: 'edit',
        loadChildren: './pages/edit/edit.module#EditPageModule'
      },
      {
        path: '',
        loadChildren: './pages/view/view.module#ViewPageModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
