import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from '@angular/router';
import {RouterLink} from "@angular/router";

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {PartidaComponent} from './partida/partida.component';
import {ChatglobalComponent} from './chatglobal/chatglobal.component';
import {FooterComponent} from './footer/footer.component';
import {ChatService} from "./chat.service";
import {LobbyComponent} from './lobby/lobby.component';

const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'lobby', component: LobbyComponent},
  {path: 'chatglobal', component: ChatglobalComponent},
  {path: 'partida/:sala', component: PartidaComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PartidaComponent,
    ChatglobalComponent,
    FooterComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
