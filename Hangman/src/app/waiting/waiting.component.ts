import { Component, OnInit } from '@angular/core';
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  public usuariosConectados = [];
  messages: string[] = [];
  jugador: any;
  public partidaLista;

  ngOnInit() {
    this.partidaLista = false;
    this.chatService.usuarioConectado().subscribe((data) => {
      this.usuariosConectados = data.objeto.array;
      this.jugador = data.objeto.usuario;
      console.log(data.msg, 'data-msg')
      this.messages.push(data.msg)
    });
    this.chatService.usuarioDesconectado().subscribe((data) => {
      console.log('usuario desconectado', data)
      this.messages.push(data.msg);
      this.usuariosConectados = (data.array)
    });

    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });

    this.chatService.usuarioEnJuego();
    this.mostrarArray();
  }

  mostrarArray(){
    console.log('mostrar usuario conectados', this.usuariosConectados)
  }

  empezarPartida(){
    if(this.usuariosConectados.length >= 2){
      console.log('Se puede empezar la partida');
      this.partidaLista = true;
    }
  }

}
