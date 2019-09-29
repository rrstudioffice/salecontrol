import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'calendar',
    loadChildren: './calendar/calendar.module#CalendarPageModule',
    canLoad: [AuthGuard]
  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  {
    path: 'box',
    loadChildren: './box/box.module#BoxModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
