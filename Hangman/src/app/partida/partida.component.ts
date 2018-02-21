import {AfterViewInit, Component, OnInit, OnDestroy} from '@angular/core';
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit, OnDestroy {

  public empiezapartida;



  private nuevaFrase;
  private nuevaPista;
  private splitteada;
  private enviada;
  private abecedario;
  private usuariosPartida = [];
  public usuariosPartidaTodos = [];

  private usuario: any;

  private partida = false;



  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.partida = true;

    this.chatService.empezarPartida();

    this.empiezapartida = this.chatService.empiezaPartida().subscribe((data) => {
      this.usuario = data.usuario;
      this.usuariosPartida = this.usuariosPartidaTodos;
      this.nuevaFrase = data.fraseCompleta;
      this.nuevaPista = data.pista;
      this.splitteada = data.splitteada;
      this.enviada = data.enviada;
      this.abecedario = data.botones;
    })

    this.chatService.turnoCambiado().subscribe((data) => {
      this.usuariosPartidaTodos = data;
      this.usuario.turno = true;
    })

    this.chatService.ganadorPartida().subscribe();

    this.chatService.recibeLetraCorrecta().subscribe((data) => {
      this.enviada = data;
    })

    this.chatService.consoleusuario();

    this.chatService.usuariosPartidaDevuelta().subscribe((data) => {
      this.usuariosPartidaTodos = data
    });

  }
  adivinaLetra(letra){
    this.chatService.enviar_letra(letra);
  }



  cambiaTurno(lista){
    this.chatService.cambiaTurnoSv(lista)
  }
  ngOnDestroy(){
    this.empiezapartida.unsubscribe()


  }
}


