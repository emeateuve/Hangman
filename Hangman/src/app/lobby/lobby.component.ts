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

  private usuario: any;


  ngOnInit() {
    this.servicioChat.consoleLogUsuario().subscribe((data) => {
      this.usuario = data.usuario
    })
  }

  darUsuario() {
    console.log(this.usuario);
    alert('Bienvenido ' + this.usuario);
  }

}
