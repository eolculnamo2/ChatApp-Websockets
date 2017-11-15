
var express = require('express');
var socket = require('socket.io')
var app = express();
var mongo = require('mongodb')
var db = require('./data/db.js')

var url = "mongodb://"+process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@ds235785.mlab.com:35785/singletempo";
//socket uses server as an argument in functions later, so must declare it
var server = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + server.address().port);
});
app.use(express.static('public'));

//io connection uses socket(server)



var io = socket(server)
var usersOn = [];
var socks = [];
io.on('connection', function(socket) {
  // usersOn=[]
      socket.on('log', function(data){
       // db.userOn(data, function(users){
        socks.push(socket)
        usersOn.push(data)
        io.sockets.emit('log',usersOn)
     //   })

      })
    
      socket.on('disc', function(data) {
        console.log("this is disc "+data)
        var i = usersOn.indexOf(data);
        //db.userOff(data,function(users){
        usersOn.splice(i, 1);
        socks.splice(i,1)
      //  console.log(users)
        io.sockets.emit('disc',usersOn)
      //  })

      })
 
  //Reply to Client
  socket.on('chat', function(data){
    io.sockets.emit('chat',data)
  })
  
  socket.on('typing', function(data){

    socket.broadcast.emit('typing',data)
  })
  
  
})

app.get("/", function (request, response){
  response.sendFile(__dirname + '/public/index.html');
});




