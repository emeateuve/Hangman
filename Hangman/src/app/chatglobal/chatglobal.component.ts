import { Component, OnInit } from '@angular/core';
import { ChatService} from "../chat.service";

@Component({
  selector: 'app-chatglobal',
  templateUrl: './chatglobal.component.html',
  styleUrls: ['./chatglobal.component.css']
})
export class ChatglobalComponent implements OnInit {
  message: string;
  messages: string[] = [];

  constructor(private chatService: ChatService) {

  }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
      this.messages.push(message);
      })
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
