import {Component, OnInit} from '@angular/core';
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-chatglobal',
  templateUrl: './chatglobal.component.html',
  styleUrls: ['./chatglobal.component.css']
})
export class ChatglobalComponent implements OnInit {
  message: string;
  messages: string[] = [];
  usuariosChat = [];
  jsonChat;

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    console.log('acaba de entrar en el chat')

    this.chatService.usuarioConectadoChat().subscribe((data) => {
      console.log('conectado al chat: ', data)
      this.usuariosChat = data.array;
      this.messages.push(data.msg)
    });
    this.chatService.usuarioDesconectadoChat().subscribe((data) => {
      console.log('data del usuarioDesconectado() desde chat', data)
      this.messages.push(data.msg);
      this.usuariosChat = data.array
    });
    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });


    // this.chatService.usuarioEnJuego()
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }


}
