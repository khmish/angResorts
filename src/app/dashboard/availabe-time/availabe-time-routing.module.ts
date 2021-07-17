import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvailabeTimeComponent } from './availabe-time.component';

const routes: Routes = [
  {
    path:"",
    component:AvailabeTimeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvailabeTimeRoutingModule { }
