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
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

  /*
  JSO: {'letraobj': X, 'estado': false}
   */
  private palabra = [];
  private textoInput = '';
  private incognita = '_';
  private resultado = [];
  private haypalabra = false;
  private puntuacion = 10;
  private turno = true

  constructor(private chatService: ChatService) {

  }

  ngOnInit() {
    this.haypalabra = false;

    this.chatService.recibeLetraCorrecta().subscribe((data) => {
      this.palabra = data;
    })

  }

  adivinaLetra(letra) {
    let i = 0;
    for (i; i < this.palabra.length; i++) {
      if (letra == this.palabra[i].letra) {
        this.resultado.push(this.palabra[i].letra)
        this.palabra[i].estado = true;
        this.chatService.letraCorrecta(this.palabra)
        console.log(this.resultado)

      }
    }
    this.puntuacion--

    if (this.resultado.length == this.palabra.length) {
      alert('Enhorabuena compadre, has acertado ' + this.resultado)
      this.haypalabra = false;
    }

    if (this.puntuacion == 0) {
      alert('Loqui has perdido.')
    }
  }

  descomponer(palabra: string) {
    this.palabra = [];
    for (let i = 0; i < palabra.length; i++) {
      this.palabra.push({letra: palabra[i], estado: false});
    }
    this.chatService.enviar_palabra(this.palabra)
  }

  palabraRecibida() {
    this.puntuacion = 10;
    this.descomponer(this.textoInput.toLowerCase());
    this.haypalabra = true
  }

}
