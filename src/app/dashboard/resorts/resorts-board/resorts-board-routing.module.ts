import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResortsBoardComponent } from './resorts-board.component';

const routes: Routes = [
  {
    path:"",
    component:ResortsBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResortsBoardRoutingModule { }
