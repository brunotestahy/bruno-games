import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {GamesListComponent} from './games/games-list/games-list.component';
import {GameComponent} from './games/game/game.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {GameService} from './shared/services/game.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {FilterPipe} from './shared/pipes/filter.pipe';
import {StarComponent} from './stars/star.component';
import {StarsComponent} from './stars/stars.component';
import {CacheService} from './shared/services/cache.service';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadersCssModule} from 'angular2-loaders-css';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    HeaderComponent,
    GamesListComponent,
    GameComponent,
    SearchBarComponent,
    StarComponent,
    StarsComponent,
    GameDetailComponent,
    LoadingComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LoadersCssModule,
    NgbModule.forRoot()
  ],
  providers: [
    CacheService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
