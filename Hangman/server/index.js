// import {usuario} from "../src/app/chat.service";

let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

var abecedario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];

var arrayFrases = [
  {frase: 'A ver si me muero ya', pista: 'Lo que digo todos los días.'},
  {frase: 'Hay que explorar lo inexplorado', pista: 'Frase de UP'},
  {frase: 'A quien madruga Dios le ayuda', pista: 'Al levantarse'},
  {frase: 'Dos no se pelean si uno no quiere', pista: 'Paz y amor'},
  {frase: 'Soy edicion limitada', pista: 'Buena autoestima'},
  {frase: 'Ellas se lo gastan en ropa y ellos en tetas', pista: 'Presupuesto'}
];

var frase = [];
var resultado = [];
var letrasDichas = [];

const port = process.env.PORT || 3000;

var arrayUsuarios = [];
var usuariosChat = [];
var usuariosWaiting = [];
var usuariosListos = [];
var numeroListos = 0;


io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('confirmarUsuario', (usuario) => {
    existeUsuario = arrayUsuarios.indexOf(usuario);
    if (existeUsuario >= 0) {
      console.log('El usuario existe');
    } else {
      console.log('El usuario no existe. Registro con éxito.', usuario);
      socket.jsonUsuario = {
        usuario: usuario,
        avatar: false,
        msg: false,
        array: arrayUsuarios,
        turno: false,
        listo: false,
        puntos: 10,
        ganador: false
      };
      // socket.nombre_usuario = usuario.toLowerCase();
      // socket.jsonUsuario.usuario = socket.nombre_usuario;
      arrayUsuarios.push(socket.jsonUsuario.usuario);

      console.log('antes del emit de usuarioConectado')

      socket.emit('usuarioConectado', socket.jsonUsuario);
      /****************************************CHAT GLOBAL************************************************/
      socket.on('conectameAlChat', function (data) {
        usuariosChat.push(data.usuario);
        socket.jsonUsuario.array = usuariosChat;
        socket.jsonUsuario.msg = 'Se ha conectado: ' + socket.jsonUsuario.usuario + ' al chat.';
        io.emit('usuarioConectadoChat', socket.jsonUsuario);

        socket.on('disconnect', function () {
          let posChat = usuariosChat.indexOf(socket.jsonUsuario.usuario)
          usuariosChat.splice(posChat, 1);
          socket.jsonUsuario.array = usuariosChat;
          socket.jsonUsuario.msg = 'Se ha desconectado ' + socket.jsonUsuario.usuario + ' del chat.';
          io.emit('desconexionChat', socket.jsonUsuario)
        });
      })

      socket.on('new-message', (message) => {
        console.log(message);
        io.emit('new-message', socket.jsonUsuario.usuario + ': ' + message);
      });
      console.log('ArrayUsuarios ', arrayUsuarios);

      /******************************************WAITING***************************************************/

      socket.on('conectameAlWaiting', function (data) {
        usuariosWaiting.push(data.usuario);
        socket.jsonUsuario.array = usuariosWaiting;
        socket.jsonUsuario.msg = 'Se ha conectado ' + socket.jsonUsuario.usuario + ' al waiting.';

        io.emit('conexionWaiting', socket.jsonUsuario);

        socket.on('disconnect', function () {
          let posWaiting = usuariosWaiting.indexOf(socket.jsonUsuario.usuario)
          usuariosWaiting.splice(posWaiting, 1);
          let posListos = usuariosListos.indexOf(socket.jsonUsuario);
          usuariosListos.splice(posListos, 1);
          socket.jsonUsuario.listo = false;
          socket.jsonUsuario.array = usuariosWaiting;
          socket.jsonUsuario.msg = 'Se ha desconectado ' + socket.jsonUsuario.usuario + ' del waiting.';
          io.emit('desconexionWaiting', socket.jsonUsuario)
        });

        socket.on('usuarioEstaListo', function (data) {
          if (socket.jsonUsuario.listo == false) {
            numeroListos++;
          }
          socket.jsonUsuario.listo = true;
          usuariosListos.push(socket.jsonUsuario);

          if (numeroListos == usuariosWaiting.length) {
            console.log('Se puede empezar la partida')
            // io.emit('empiezaPartida', arrayFrases[Math.floor(Math.random()*arrayFrases.length)]);
            io.emit('empiezaPartida');
          };
        });

        socket.on('nuevaPartida', function () {
          console.log('Se empieza aquí');
          io.emit('empiezaPartida', arrayFrases[Math.floor(Math.random()*arrayFrases.length)])
          // io.emit('empiezaPartida');
          // socket.emit('nuevaFrase', arrayFrases[Math.floor(Math.random()*arrayFrases.length)] )
        })

        socket.on('palabraNueva', function (data) {
          io.emit('enviarPalabra', data);
          frase = data;
          console.log('esta es la palabra desde el servidor', data);
        });


        socket.on('letraNueva', function (letraNueva) {
          letrasDichas.push(letraNueva);
          for (let i = 0; i < frase.length; i++) {
            if (letraNueva == frase[i].letra) {
              frase[i].estado = true;
              resultado.push(frase[i].letra)
              socket.emit('letraAcertada', {letra: letraNueva, estado: true});
            } else {
              socket.emit('letraErronea', {
                letra: letraNueva,
                puntos: socket.jsonUsuario.puntos--
              }, socket.jsonUsuario.turno = false)
            }
          }
          if (resultado.length == frase.length) {
            io.emit('Ganador', {
              usuario: socket.jsonUsuario.usuario,
              resultado: resultado
            })
          }
        })
        socket.on('cambiameElTurno', function (data) {
          if (data.turno == false) {
            data.turno = true;
          } else {
            data.turno = false;
          }
          ;
          socket.emit('turnoCambiado', data)
        });

      });


    }
    socket.on('disconnect', function () {
      let pos = arrayUsuarios.indexOf(socket.jsonUsuario.usuario);
      arrayUsuarios.splice(pos, 1);
      io.emit('desconexion', {
        msg: 'Se ha desconectado: ' + socket.jsonUsuario.usuario, array: arrayUsuarios
      })

    })

  });

});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
