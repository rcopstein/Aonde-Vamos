import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotingComponent } from './components/voting/voting.component';

const routes: Routes = [
  { path : "", component : VotingComponent },
  { path : "**", redirectTo : "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation : "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
