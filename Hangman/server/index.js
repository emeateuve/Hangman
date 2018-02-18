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
  'Alto ahi Concha',
  'A ver si me muero ya',
  'Esto son hundreds no twenty'
];

var frase = []
var resultado = [];
var letrasDichas = [];

const port = process.env.PORT || 3000;

var arrayUsuarios = [];
var usuariosChat = [];

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
        puntos: 10,
        ganador: false
      };
      // socket.nombre_usuario = usuario.toLowerCase();
      // socket.jsonUsuario.usuario = socket.nombre_usuario;
      arrayUsuarios.push(socket.jsonUsuario.usuario);

      console.log('antes del emit de usuarioConectado')

      socket.emit('usuarioConectado', socket.jsonUsuario);

      socket.on('conectameAlChat', function (data) {
        usuariosChat.push(data.usuario);
        socket.jsonUsuario.array = usuariosChat;
        socket.jsonUsuario.msg = 'Se ha conectado: ' + socket.jsonUsuario.usuario + ' al chat.';
        io.emit('usuarioConectadoChat', socket.jsonUsuario);

        socket.on('disconnect', function () {
          let posChat = usuariosChat.indexOf(socket.jsonUsuario.usuario)
          usuariosChat.splice(posChat, 1);
          socket.jsonUsuario.array = usuariosChat;
          socket.jsonUsuario.msg = 'Se ha desconectado ' + socket.jsonUsuario.usuario + ' del chat.'
          io.emit('desconexionChat', socket.jsonUsuario)
        });
      })



      socket.on('new-message', (message) => {
        console.log(message);
        io.emit('new-message', socket.jsonUsuario.usuario + ': ' + message);
      });
      console.log('ArrayUsuarios ', arrayUsuarios);

      socket.on('usuario-entra-jugar', function () {

        io.emit('usuarioConectado', {
          objeto: socket.jsonUsuario,
          msg: 'Se ha conectado el ' + socket.jsonUsuario.usuario
        });

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

        // socket.on('cambiaTurno',)

      });

      socket.on('cambiameElTurno', function (data) {
        if (data.turno == false) {
          data.turno = true;
        } else {
          data.turno = false;
        }
        ;
        socket.emit('turnoCambiado', data)
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
