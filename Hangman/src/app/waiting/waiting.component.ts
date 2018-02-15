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

  ngOnInit() {

    this.chatService.usuarioConectado().subscribe((data) => {
      this.usuariosConectados = data.array;
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

}
