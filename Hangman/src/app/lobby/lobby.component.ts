import {Component, OnInit} from '@angular/core';
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private servicioChat: ChatService) {
  }

  ngOnInit() {
    this.servicioChat.consoleLogUsuario().subscribe((data) => {
      console.log("Data del subscribe", data)
    })
  }

  darUsuario() {
    console.log('Se ha conectado: ');
    console.log(this.servicioChat.consoleLogUsuario())
  }

}
