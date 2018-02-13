import {Observable} from "rxjs/Observable";
// import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Subject} from "rxjs/Subject";
import {observable} from "rxjs/symbol/observable";


export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  public arrayUsuarios = [];

  constructor() {
    this.socket = io(this.url);
  }

  public sendUsuario(usuario) {
    this.socket.emit('confirmarUsuario', usuario)
  }

  public consoleLogUsuario = () => {
    return Observable.create((observer) => {
      this.socket.on('consoleusuario', (data) => {
        observer.next(data)
        this.arrayUsuarios = data.array
        console.log(this.arrayUsuarios)
      })
    });
  };

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  }

  public usuarioDesconectado = () => {
    return Observable.create((observer) => {
      this.socket.on('desconexion', (data) => {
        observer.next(data);
        this.arrayUsuarios = data.array;
      })
    })
  }

}
