import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {

  private abecedario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

  private palabra = [];
  private textoInput = '';
  private existe = false;

  constructor() {
  }

  ngOnInit() {
  }

  adivinaLetra(letra){
    this.existe = false;
    for(let i = 0; i < this.palabra.length; i++){
      if(letra == this.palabra[i]){
        this.existe = true;
        console.log(letra);
      }
    }
  }

  descomponer(palabra: string) {
    this.palabra = [];
    for (let i = 0; i < palabra.length; i++) {
      this.palabra.push(palabra[i]);
    }
  }

  palabraRecibida() {
    this.descomponer(this.textoInput);
  }

}
