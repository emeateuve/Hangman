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

  private arrayPalabras = [
    'Camisa', 'Camiseta', 'Pantalon', 'Zapatillas', 'Calcetines', 'Sudadera', 'Corbata', 'Jersey', 'Chaqueta', //ROPA
    'Kebab', 'Shawarma', 'Macarrones', 'Patata', 'Lechuga', 'Tortelini', 'Pimiento', 'Pollo', 'Filete', 'Queso', //COMIDA
    'Pantalla', 'Movil', 'Monitor', 'Raton', 'Teclado', 'Alfombrilla', 'Cable', 'Auriculares', 'Conector', //HARDWARE
    'Guadalajara', 'Cordoba', 'Granada', 'Malaga', 'Jaen', 'Huelva', 'Sevilla', 'Almeria', 'Cadiz', 'Huesca', //PROVINCIAS
  ];

  /*
  JSO: {'letraobj': X, 'estado': false}
   */
  private palabra = [];
  private incognita = '_';
  private resultado = [];
  private haypalabra = false;
  private puntuacion = 15;
  private partida = false;
  private letrasDichas = [];

  constructor(private chatService: ChatService) {

  }

  ngOnInit() {
    this.haypalabra = false;
    this.partida = true;

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
      }
    }
    this.puntuacion--

    if (this.resultado.length == this.palabra.length) {
      alert('Enhorabuena compadre, has acertado. 10 punticos más pa ti y siguiente ronda.')
      this.haypalabra = false;
      alert('Enhorabuena. Has terminado con: ' + this.puntuacion + ' puntos.')
      this.partida = false;


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
    this.chatService.enviar_palabra(this.palabra);
    console.log('acaba de recibir la palabra \n', this.palabra, ' desde el servidor');
    this.haypalabra = true;
  }

  palabraRecibida() {
    this.puntuacion = this.puntuacion + 10;
    this.descomponer(this.arrayPalabras[Math.floor(Math.random() * this.arrayPalabras.length)].toLowerCase());
  }

  consola() {
    console.log('Partida nueva')
  }

}
