import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PartidaComponent } from './partida/partida.component';
import { ChatglobalComponent } from './chatglobal/chatglobal.component';
import { FooterComponent } from './footer/footer.component';
import {ChatService} from "./chat.service";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PartidaComponent,
    ChatglobalComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
