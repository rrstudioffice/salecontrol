import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'edit/:id',
        loadChildren: './pages/category-add/category-add.module#CategoryAddPageModule'
      },
      {
        path: 'add',
        loadChildren: './pages/category-add/category-add.module#CategoryAddPageModule'
      },
      { path: '', loadChildren: './pages/category/category.module#CategoryPageModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
