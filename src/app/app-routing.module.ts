import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GamesListComponent} from './games/games-list/games-list.component';
import {GameDetailComponent} from './games/game-detail/game-detail.component';


const routes: Routes = [
  {
    path: 'games/:category', component: GamesListComponent
  },
  {
    path: 'game/:id', component: GameDetailComponent
  },
  {
    path: '**', redirectTo: 'games'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
