import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      { path: 'add/:cod', loadChildren: './pages/box-add/box-add.module#BoxAddPageModule' },
      { path: 'edit/:cod/:id', loadChildren: './pages/box-add/box-add.module#BoxAddPageModule' },
      { path: 'type', loadChildren: './pages/box-type/box-type.module#BoxTypePageModule' },
      {
        path: 'type/add',
        loadChildren: './pages/box-type-add/box-type-add.module#BoxTypeAddPageModule'
      },
      {
        path: 'type/edit/:id',
        loadChildren: './pages/box-type-add/box-type-add.module#BoxTypeAddPageModule'
      },
      { path: 'method', loadChildren: './pages/box-method/box-method.module#BoxMethodPageModule' },
      {
        path: 'method/add',
        loadChildren: './pages/box-method-add/box-method-add.module#BoxMethodAddPageModule'
      },
      {
        path: 'method/edit/:id',
        loadChildren: './pages/box-method-add/box-method-add.module#BoxMethodAddPageModule'
      },
      { path: '', loadChildren: './pages/box/box.module#BoxPageModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoxRoutingModule {}
