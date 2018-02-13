let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

var arrayUsuarios = [];

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('new-message', (message) => {
    console.log(message);
    io.emit('new-message', socket.nombre_usuario + ": " + message);
  });

  socket.on('confirmarUsuario', (usuario) => {
    existeUsuario = arrayUsuarios.indexOf(usuario.toLowerCase());
    if (existeUsuario >= 0) {
      console.log('El usuario existe');
    } else {
      console.log('El usuario no existe. Registro con éxito.');
      arrayUsuarios.push(usuario.toLowerCase());
      socket.nombre_usuario = usuario.toLowerCase();
      socket.emit('consoleusuario', {usuario: usuario, array: arrayUsuarios});
      io.emit('usuarioConectado', arrayUsuarios);
      console.log(arrayUsuarios)
    }
  })


  socket.on('disconnect', function () {
    let pos = arrayUsuarios.indexOf(socket.nombre_usuario);
    arrayUsuarios.splice(pos, 1)
    io.emit('desconexion', {
      msg: 'Se ha desconectado: ' + socket.nombre_usuario,
      array: arrayUsuarios
    })
  })
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
