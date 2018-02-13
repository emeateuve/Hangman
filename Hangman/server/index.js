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
    io.emit(message);
  });

  socket.on('confirmarUsuario', (usuario) => {
    existeUsuario = arrayUsuarios.indexOf(usuario.toLowerCase());
    if (existeUsuario >= 0) {
      console.log('El usuario existe');
    } else {
      console.log('El usuario no existe. Registro con éxito.');
      arrayUsuarios.push(usuario.toLowerCase());
      socket.emit('consoleusuario', usuario);
    }
  })
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
