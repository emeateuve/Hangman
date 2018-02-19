import { Component, OnInit } from '@angular/core';
import {ChatService} from "../chat.service";
import {ActivatedRoute, Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  constructor(private chatService: ChatService, private route: ActivatedRoute, private router: Router) { }

  public usuariosConectados = [];
  messages: string[] = [];
  jugador: any;
  public partidaLista;
  private jsonJugador;

  ngOnInit() {
    this.partidaLista = false;
    this.chatService.usuarioConectadoWaiting().subscribe((data) => {
      this.usuariosConectados = data.array;
      this.jugador = data.usuario;
      this.messages.push(data.msg)
      this.jsonJugador = data
    });
    this.chatService.usuarioDesconectadoWaiting().subscribe((data) => {
      this.messages.push(data.msg);
      this.usuariosConectados = (data.array)
    });

    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });

    this.chatService.empezarPartida().subscribe((data) =>{
      this.router.navigate(['partida']);
    });

    // this.chatService.usuarioEnJuego();
    // this.mostrarArray();
  }

  // mostrarArray(){
  //   console.log('mostrar usuario conectados', this.usuariosConectados)
  // }

  empezarPartida(){
    if(this.usuariosConectados.length >= 2){
      console.log('Se puede empezar la partida');
      this.partidaLista = true;
    }
  }

  estoyListo(usuario){
    this.chatService.usuarioListo(usuario);
  }

}
