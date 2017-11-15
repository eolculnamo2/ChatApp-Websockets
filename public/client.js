var socket = io.connect()
var username = prompt("Please enter your name")
socket.emit('log', username)
var btn = document.getElementById("send"),
    msg = document.getElementById("message"),
    isTyping = document.getElementById("isTyping"),
    screen = document.getElementById("messageScreen")

//responsive styling
if(window.innerWidth < 1000){
  $("#messageScreen").css({"height": "300px", 
                           "width": "50px"})
}


//Socket Emits

function disc(){
  socket.emit('disc', username)
}
window.addEventListener("beforeunload", function (e) {
  disc();
  return null;
})
                      
btn.addEventListener('click', function(){
  socket.emit('chat', {
    message: msg.value,
    user: username
  })  
  msg.value = null;
})

window.addEventListener('keypress', function (e) {
  socket.emit('typing', username);
    var key = e.which || e.keyCode;
    if (key === 13) {
      
     socket.emit('chat', {
    message: msg.value,
    user: username
  })  
  msg.value = null;
    }
});


//listen
socket.on('chat', function(data){
  if(data.user === null){
    data.user = "Guest";
  }
  isTyping.innerHTML = "";
  screen.innerHTML += "<p><strong>"+data.user+": </strong>"+data.message+"</p>";
})


socket.on('typing', function(data){

  isTyping.innerHTML = "<p><em>"+data+" is typing...</p></em>";
})

socket.on('log',function(data){
   document.getElementById("usersOnline").innerHTML = "";
  data.forEach((x)=>{
    if(x === null){
      x = "Guest";
    }
    document.getElementById("usersOnline").innerHTML += "<br>"+x;
  })
})

socket.on('disc',function(data){
  document.getElementById("usersOnline").innerHTML = "";
    data.forEach((x)=>{
    document.getElementById("usersOnline").innerHTML += "<br>"+x;
  })
  
})