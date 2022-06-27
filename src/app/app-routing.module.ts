import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LampComponent } from './lamp/lamp.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: MainComponent },
  { path: 'home/lamps', component: LampComponent },
  { path: '**', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

