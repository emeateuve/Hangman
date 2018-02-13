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
    this.array_usuarios = this.chatService.arrayUsuarios
    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });
    this.chatService.usuarioDesconectado().subscribe((data) => {
      this.messages.push(data.msg);
      this.array_usuarios = (data.array)
    });
    this.chatService.usuarioConectado().subscribe((data) => {
      console.log("en el componente", data);
      this.array_usuarios = data;
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }


}
