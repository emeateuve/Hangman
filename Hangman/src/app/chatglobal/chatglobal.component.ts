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
  array_usuarios = [];

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.usuarioConectado().subscribe((data) => {
      console.log('data del usuarioConectado() desde chat', data)
      this.array_usuarios = data.objeto.array;
      this.messages.push(data.msg)
    });
    this.chatService.usuarioDesconectado().subscribe((data) => {
      console.log('data del usuarioDesconectado() desde chat', data)
      this.messages.push(data.msg);
      this.array_usuarios = (data.array)
      console.log('desconexion actualizada', data)
    });
    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });
    this.chatService.usuarioEnJuego()
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }


}
