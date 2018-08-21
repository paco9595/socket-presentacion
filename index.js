var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3001);

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
  console.log('get')
  res.sendFile(__dirname + '/public/client.html');
});
app.get('/master', function (req, res) {
  console.log('master');
  res.sendFile(__dirname + '/public/master.html')
})
io.on('connection', function (socket) {
  socket.on('master', function (data) {
    console.log(data)
    socket.broadcast.emit('client',data);
  })
})


