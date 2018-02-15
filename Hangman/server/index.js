let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

var arrayPalabras = [
  'Camisa', 'Camiseta', 'Pantalon', 'Zapatillas', 'Calcetines', 'Sudadera', 'Corbata', 'Jersey', 'Chaqueta', //ROPA
  'Kebab', 'Shawarma', 'Macarrones', 'Patata', 'Lechuga', 'Tortelini', 'Pimiento', 'Pollo', 'Filete', 'Queso', //COMIDA
  'Pantalla', 'Movil', 'Monitor', 'Raton', 'Teclado', 'Alfombrilla', 'Cable', 'Auriculares', 'Conector', //HARDWARE
  'Guadalajara', 'Cordoba', 'Granada', 'Malaga', 'Jaen', 'Huelva', 'Sevilla', 'Almeria', 'Cadiz', 'Huesca', //PROVINCIAS
];


const port = process.env.PORT || 3000;

var arrayUsuarios = [];

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

      socket.emit('consoleusuario', {usuario: usuario, array: arrayUsuarios});
      socket.emit('usuarioConectado', {
        usuario: usuario,
        array: arrayUsuarios,
        msg: 'Se ha conectado ' + socket.nombre_usuario
      });

      socket.on('new-message', (message) => {
        console.log(message);
        io.emit('new-message', socket.nombre_usuario + ": " + message);
      });
      console.log(arrayUsuarios)

      socket.on('usuario-entra-jugar', function () {

        io.emit('usuarioConectado', {
          usuario: usuario,
          array: arrayUsuarios,
          msg: 'Se ha conectado ' + socket.nombre_usuario,
          turno: false
        });

        socket.on('palabraNueva', function (data) {
          io.emit('enviarPalabra', data);
          console.log('esta es la palabra desde el servidor', data);
        });
        socket.on('letraAcertada', function (data) {
          socket.emit('letraAcertadaDevuelta', data);
        });
      });

      // socket.on('cambiameElTurno', data{
      //   // io.emit('turnoCambiado', data)
      // })

    }
  })


  socket.on('disconnect', function () {
    let pos = arrayUsuarios.indexOf(socket.nombre_usuario);
    arrayUsuarios.splice(pos, 1)
    io.emit('desconexion', {
      msg: 'Se ha desconectado: ' + socket.nombre_usuario, array: arrayUsuarios
    });

    // socket.leave(sala);
    // console.log('se ha desconectado de la sala', sala);
  })
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
