import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CycleListComponent } from './components/cycle-list/cycle-list.component';


const routes: Routes = [
  {path: 'cycle', component: CycleListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
