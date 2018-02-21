import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {

  private nuevaFrase;
  private nuevaPista;
  private splitteada;
  private enviada;
  private abecedario;
  private usuariosPartida = [];
  private valorTurno = 0;

  private usuario: any;

  private puntuacion = 15;
  private partida = false;
  messages: string[] = [];



  constructor(private chatService: ChatService) {

  }

  ngOnInit() {
    this.partida = true;

    this.chatService.empezarPartida();

    this.chatService.empiezaPartida().subscribe((data) => {
      console.log('data', data)
      this.usuario = data.usuario;
      this.usuariosPartida = data.jugadoresEnPartida;
      this.nuevaFrase = data.fraseCompleta;
      this.nuevaPista = data.pista;
      this.splitteada = data.splitteada;
      this.enviada = data.enviada;
      this.abecedario = data.botones;

    })

    // this.cambiaTurno(this.usuariosPartida);
    // console.log('Usuarios en partida: ', this.usuariosPartida)

    this.chatService.turnoCambiado().subscribe((data) => {
      this.usuariosPartida = this.chatService.miscojones;
      this.usuario.turno = true;

      // console.log('data del turnoCambiado', data)
      // console.log('Desde el chat', this.chatService.miscojones);
      // this.valorTurno = this.valorTurno +1
      // if(this.valorTurno == this.usuariosPartida.length-1){
      //   this.valorTurno = 0;
      // }

    })

    this.chatService.ganadorPartida().subscribe();

    this.chatService.recibeLetraCorrecta().subscribe((data) => {
      this.enviada = data;
    })
  }
  adivinaLetra(letra){
    this.chatService.enviar_letra(letra);
  }

  // adivinaLetra(letra) {
  //   let i = 0;
  //   this.letrasDichas.push(letra);
  //   // for (i; i < this.frase.length; i++) {
  //   //   if (letra == this.frase[i].letra) {
  //   //     this.resultado.push(this.frase[i].letra);
  //   //     this.frase[i].estado = true;
  //
  //   this.chatService.enviar_letra(this.frase);
  //   this.puntuacion--
  //
  //   if (this.resultado.length == this.frase.length) {
  //     alert('Enhorabuena compadre, has acertado. 10 punticos más pa ti y siguiente ronda.')
  //     this.hayfrase = false;
  //     alert('Enhorabuena. Has terminado con: ' + this.puntuacion + ' puntos.')
  //     this.partida = false;
  //
  //
  //   }
  //
  //   if (this.puntuacion == 0) {
  //     alert('Loqui has perdido.')
  //   }
  // }
  //
  // descomponer(frase: string) {
  //   this.frase = [];
  //   for (let i = 0; i < frase.length; i++) {
  //     this.frase.push({letra: frase[i], estado: false});
  //   }
  //   this.chatService.enviar_palabra(this.frase);
  //   console.log('acaba de recibir la palabra \n', this.frase, ' desde el servidor');
  //   this.hayfrase = true;
  // }

  // palabraRecibida() {
  //   this.puntuacion = this.puntuacion + 10;
  //   this.descomponer(this.arrayFrases[Math.floor(Math.random() * this.arrayFrases.length)].toLowerCase());
  // }


  cambiaTurno(lista){
    this.chatService.cambiaTurnoSv(lista)
  }

}
