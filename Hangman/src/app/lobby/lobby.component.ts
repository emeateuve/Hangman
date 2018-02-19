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
  private numeroSala: string;
  private jsonLobby;

  ngOnInit() {


    this.servicioChat.usuarioConectado().subscribe((data) => {
      this.usuario = data.usuario
      console.log(this.usuario)
      this.jsonLobby = data;
    })

    this.servicioChat.usuarioDesconectado().subscribe((data) => {
      this.usuario = data.usuario
      console.log(data)
    })
  }



  darUsuario() {
    console.log(this.usuario);
    alert('Bienvenido ' + this.usuario);
  }

  // // enviarRoom(){
  // //   if(this.numeroSala){
  // //     console.log('enviarRoom lobby ts',this.numeroSala)
  // //     this.servicioChat.sendRoom(this.numeroSala);
  // //
  // //   }
  // }

  enviameAlChat(usuario){
    this.servicioChat.enviarChat(usuario);
  }

  enviameAlJuego(usuario) {
    this.servicioChat.enviarJuego(usuario);
  }

}
