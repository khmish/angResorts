import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardAuthGuard } from '../guard/guard-auth.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
    , canActivate: [GuardAuthGuard]
  },
  {
    path:'availableTime',
    loadChildren:() => import('./availabe-time/availabe-time.module').then((mod) => mod.AvailabeTimeModule)
    , canActivate: [GuardAuthGuard]
  },
  {
    path:'resort',
    loadChildren:() => import('./resorts/resorts-board/resorts-board.module').then((mod) => mod.ResortsBoardModule)
    , canActivate: [GuardAuthGuard]
  },
  {
    path:'user',
    loadChildren:() => import('./users/users.module').then((mod) => mod.UsersModule)
    , canActivate: [GuardAuthGuard]
  },
  {
    path:'rent',
    loadChildren:() => import('./rents/rents.module').then((mod) => mod.RentsModule)
    , canActivate: [GuardAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
