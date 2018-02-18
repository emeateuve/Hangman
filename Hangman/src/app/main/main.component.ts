import { Component, OnInit } from '@angular/core';
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  public inputUsuario;
  constructor(private servicioChat: ChatService) {

  }

  ngOnInit() {

  }

  enviarUsuario(){
    this.servicioChat.sendUsuario(this.inputUsuario);
  }
}
