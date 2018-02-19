import {Component, OnInit} from '@angular/core';
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {

  private abecedario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];

  private arrayFrases = [
    'Alto ahi Concha',
    'A ver si me muero ya',
    'Esto son hundreds no twenty'
  ];

  /*
  JSO: {'letraobj': X, 'estado': false}
   */
  private frase = [];
  private usuario: any;
  public arrayUsuarios = [];
  private incognita = '_';
  private resultado = [];
  private hayfrase = false;
  private puntuacion = 15;
  private partida = false;
  private letrasDichas = [];
  private espacio = ' ';
  messages: string[] = [];
  private jsonJugador: any;
  private numeroTurno = 0;
  private turnaso;

  constructor(private chatService: ChatService) {

  }

  ngOnInit() {
    this.hayfrase = false;
    this.partida = true;
    this.numeroTurno = 0;

    this.chatService.recibeLetraCorrecta().subscribe((data) => {
      this.frase = data;
    })

    this.chatService.usuarioConectado().subscribe((data) => {
      this.jsonJugador = data;
      this.arrayUsuarios = data.array;
      this.usuario = data.usuario;
      this.messages.push(data.msg, data.turno);
      this.turnaso = data.objeto.turno;


    });

    this.chatService.usuarioDesconectado().subscribe((data) => {
      this.arrayUsuarios = data.array;
    })

    this.chatService.turnoCambiado().subscribe((data) => {
      this.jsonJugador = data;
      console.log('El turno es: ',this.jsonJugador.turno)
    })

    // this.chatService.usuarioEnJuego();

  }

  adivinaLetra(letra) {
    let i = 0;
    this.letrasDichas.push(letra);
    // for (i; i < this.frase.length; i++) {
    //   if (letra == this.frase[i].letra) {
    //     this.resultado.push(this.frase[i].letra);
    //     this.frase[i].estado = true;

    this.chatService.enviar_letra(this.frase);
    this.puntuacion--

    if (this.resultado.length == this.frase.length) {
      alert('Enhorabuena compadre, has acertado. 10 punticos más pa ti y siguiente ronda.')
      this.hayfrase = false;
      alert('Enhorabuena. Has terminado con: ' + this.puntuacion + ' puntos.')
      this.partida = false;


    }

    if (this.puntuacion == 0) {
      alert('Loqui has perdido.')
    }
  }

  descomponer(frase: string) {
    this.frase = [];
    for (let i = 0; i < frase.length; i++) {
      this.frase.push({letra: frase[i], estado: false});
    }
    this.chatService.enviar_palabra(this.frase);
    console.log('acaba de recibir la palabra \n', this.frase, ' desde el servidor');
    this.hayfrase = true;
  }

  palabraRecibida() {
    this.puntuacion = this.puntuacion + 10;
    this.descomponer(this.arrayFrases[Math.floor(Math.random() * this.arrayFrases.length)].toLowerCase());
  }

  cambiaTurno(){
    this.chatService.cambiaTurnoSv(this.jsonJugador)
    console.log('cambia Turno', this.jsonJugador);
    // this.arrayUsuarios[this.numeroTurno].turno = false;
    // this.numeroTurno++;
    // this.[this.numeroTurno].turno = true;
  }



}
