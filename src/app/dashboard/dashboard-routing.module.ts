import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'availableTime',
    loadChildren:() => import('./availabe-time/availabe-time.module').then((mod) => mod.AvailabeTimeModule)
  },
  {
    path:'resort',
    loadChildren:() => import('./resorts/resorts-board/resorts-board.module').then((mod) => mod.ResortsBoardModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
