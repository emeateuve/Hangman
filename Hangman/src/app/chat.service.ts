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
  public frase;
  public miscojones;


  constructor() {
    this.socket = io(this.url);
  }

  public sendUsuario(usuario) {
    this.usuario = usuario;
    this.socket.emit('confirmarUsuario', usuario)
  }

  public usuarioConectado = () => {
    return Observable.create((observer) => {
      this.socket.on('usuarioConectado', function (data) {
        observer.next(data);
        console.log('estas conectado', data)
      })
    })
  }

  public usuarioDesconectado = () => {
    return Observable.create((observer) => {
      this.socket.on('desconexion', (data) => {
        observer.next(data);
        this.arrayUsuarios = data.array;
      })
    })
  }


  /***************************CHAT GLOBAL****************************/
  public enviarChat(usuario) {
    this.socket.emit('conectameAlChat', usuario)
  }

  public usuarioConectadoChat = () => {
    return Observable.create((observer) => {
      this.socket.on('usuarioConectadoChat', function (data) {
        observer.next(data);
      })
    })
  }

  public usuarioDesconectadoChat = () => {
    return Observable.create((observer) => {
      this.socket.on('desconexionChat', (data) => {
        observer.next(data);
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

  /****************************WAITING*********************************/
  public enviarJuego(usuario) {
    this.socket.emit('conectameAlWaiting', usuario)
  }

  public usuarioConectadoWaiting = () => {
    return Observable.create((observer) => {
      this.socket.on('conexionWaiting', (data) => {
        observer.next(data);
      })
    })
  }
  public usuarioDesconectadoWaiting = () => {
    return Observable.create((observer) => {
      this.socket.on('desconexionWaiting', (data) => {
        observer.next(data);
      })
    })
  }

  public usuarioListo(usuario) {
    this.socket.emit('usuarioEstaListo', usuario)
  }

  public empiezaPartida = () => {
    return Observable.create((observer) => {
      this.socket.on('empiezaPartida', (data) => {
        observer.next(data);
        this.frase = data;
      })
    })
  };



  public empezarPartida = () => {
    this.socket.emit('nuevaPartida');
  }

  /********************************PARTIDA*************************************/
  // public nuevaPartida(){
  //   this.socket.emit('nuevaPartida');
  // };

  // public nuevaFrase = () => {
  //   return Observable.create((observer) => {
  //     this.socket.on('nuevaFrase', function (data) {
  //       observer.next(data);
  //       this.frase = data
  //     })
  //   })
  // }

  // public enviar_palabra(array_palabra) {
  //   this.socket.emit('palabraNueva', array_palabra);
  // };

  public enviar_letra(letra) {
    this.socket.emit('letraNueva', letra);
  }

  public cambiaTurnoSv(lista) {
    this.socket.emit('cambiameElTurno', lista)
  }

  public recibeLetraCorrecta = () => {
    return Observable.create((observer) => {
      this.socket.on('letraAcertada', function (data) {
        observer.next(data);
        console.log('acertada lolxd')
        this.palabra = data;
      })
    })
  }

  public turnoCambiado = () => {
    return Observable.create((observer) => {
      this.socket.on('turnoCambiado', (data) => {
        this.miscojones = data;
        observer.next(data);

      })
    })
  }


}
