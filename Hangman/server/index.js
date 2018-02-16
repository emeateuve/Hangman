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
var jsonUsuario = {
  usuario: 'Indefinido',
  array: arrayUsuarios,
  turno: false,
  puntos: 10
};

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('confirmarUsuario', (usuario) => {
    existeUsuario = arrayUsuarios.indexOf(usuario.toLowerCase());
    if (existeUsuario >= 0) {
      console.log('El usuario existe');
    } else {
      console.log('El usuario no existe. Registro con éxito.');
      arrayUsuarios.push(usuario.toLowerCase());
      socket.nombre_usuario = usuario.toLowerCase();
      jsonUsuario.usuario = socket.nombre_usuario;

      socket.emit('consoleusuario', jsonUsuario);
      socket.emit('usuarioConectado', jsonUsuario);


      socket.on('new-message', (message) => {
        console.log(message);
        io.emit('new-message', socket.nombre_usuario + ': ' + message);
      });
      console.log('ArrayUsuarios ', arrayUsuarios)

      socket.on('usuario-entra-jugar', function () {

        io.emit('usuarioConectado', {objeto: jsonUsuario, msg: 'Se ha conectado el ' + socket.nombre_usuario});

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
              socket.emit('letraErronea', {letra: letraNueva, puntos: jsonUsuario.puntos--}, jsonUsuario.turno = false)
            }
          }
          if (resultado.length == frase.length) {
            io.emit('Ganador', {
              usuario: jsonUsuario.usuario,
              resultado: resultado
            })
          }
        })

        // socket.on('cambiaTurno',)

      });

      // socket.on('cambiameElTurno', data{
      //   io.emit('turnoCambiado', data)
      // })

    }
  });


  socket.on('disconnect', function () {
    let pos = arrayUsuarios.indexOf(socket.nombre_usuario);
    arrayUsuarios.splice(1,pos);
    io.emit('desconexion', {
      msg: 'Se ha desconectado: ' + socket.nombre_usuario, array: arrayUsuarios});
  })
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
