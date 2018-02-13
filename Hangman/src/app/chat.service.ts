import {Observable} from "rxjs/Observable";
// import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Subject} from "rxjs/Subject";



export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  public verificaUsuario = new Subject();
  public verificaUsuario$ = this.verificaUsuario.asObservable();

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
      })
    })
  }

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
}
