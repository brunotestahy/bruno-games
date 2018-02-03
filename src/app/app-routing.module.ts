import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GamesListComponent} from './games/games-list/games-list.component';


const routes: Routes = [
  {
    path: '', component: GamesListComponent
  },
  {
    path: '**', redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
