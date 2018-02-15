import {Observable} from "rxjs/Observable";
// import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Subject} from "rxjs/Subject";
import {observable} from "rxjs/symbol/observable";


export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  public usuario;
  public arrayUsuarios = [];

  constructor() {
    this.socket = io(this.url);
  }

  public sendUsuario(usuario) {
    this.usuario = usuario;
    this.socket.emit('confirmarUsuario', usuario)
  }

  public consoleLogUsuario = () => {
    return Observable.create((observer) => {
      this.socket.on('consoleusuario', (data) => {
          observer.next(data);
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

  public usuarioConectado = () => {
    return Observable.create((observer) => {
      this.socket.on('usuarioConectado', function (data) {
        observer.next(data);
        this.arrayUsuarios = data.array;
      })
    })
  }

  public sendRoom(numerosala) {
    console.log('sendRoom chat ts', numerosala)
    this.socket.emit('enviar-room', numerosala);
  }

  public usuarioEnJuego() {
    console.log('vamos a conectar al usuario', this.usuario);
    this.socket.emit('usuario-entra-jugar');
  }

  public enviar_palabra(array_palabra) {
    this.socket.emit('palabraNueva', array_palabra)
  }

  public letraCorrecta(palabra){
    this.socket.emit('letraAcertada', palabra)
  }

  public cambiaTurnoSv(usuario){
    this.socket.emit('cambiameElTurno', usuario)
  }

  public recibeLetraCorrecta = () => {
    return Observable.create((observer) => {
      this.socket.on('letraAcertadaDevuelta', function (data) {
        observer.next(data);
        this.palabra = data;
        console.log('Correcto', data)
      })
    })
  }





}
