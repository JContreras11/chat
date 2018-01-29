const express = require('express');
const app =  express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var con = 0;
var users = {};


app.get('/algo',function (req, res) {
  console.log('alguien intenta engtrar a algo');

})



io.sockets.on('connection', function (client) {
  console.log('se ha conectado el usuario: '+con);



  client.on('setUsername', function (data) {

      data.num = con;
      users[data.id] = data;
      console.log(users);
      client.emit('setUser', data);
      if (con < 2) {
        con++;
      }else {
        con=0;
      }


  })



  client.on('new_message', function (data) {
      console.log(data);
      io.emit('get_message', data);
  })

  client.on('stop',function() {
    io.emit('stopIt');
  })
  client.on('escribiendo',function() {
    io.sockets.emit('escribe');
  })
  })



server.listen(3000, function () {
  console.log('Servidor ecuchando por el puerto 3000');
})
