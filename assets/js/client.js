var men = '';
var chat = document.getElementById('chat-body');

var user = document.getElementById('user_name');
var ucolor;
var color = ['#9a3dad','#45ad3d','#3d8aad'];
var rig = document.getElementById('rigt');
var i = 0
const socket = io.connect('http://localhost:3000/',{'forceNew': false});

user.textContent = localStorage.user;


document.addEventListener('keyup',function(e){
    if(e.which === 13){
      senMessage();
      socket.emit('stop');
    }

  });



document.addEventListener('keydown',function(e){

socket.emit('escribiendo');

})


socket.on('stopIt',function () {
  rig.innerHTML = '';
  i=0;
})


socket.on('escribe', function () {
    if (i===0) {
      var d = document.createElement('span');
      d.id = "esc";
      d.textContent = 'escribiendo...';
      rig.appendChild(d);
      i++;
    }

})



socket.on('get_message', function (data) {

  if (chat.children.length === 0) {
    chat.innerHTML = `<p class="texto"><strong style='color:${data.color};' >${data.nombre}: </strong> ${data.mensaje}</p>`
  }else {
    var mens = chat.children;
    var c = document.createElement('p');
    var d = document.createElement('strong');
    d.style.color = data.color;

    d.textContent = data.nombre+': ';
    c.innerHTML = d.outerHTML;
    c.classList.add('texto')
    c.append(data.mensaje)

    chat.appendChild(c);
  }
})



function senMessage() {
  var men = document.getElementById('int');
  var mensaje = men.value;
  men.value = '';
   ucolor = color[localStorage.num];
  var usuario = {
    id:1,
    nombre:localStorage.user,
    mensaje:mensaje,
    color:ucolor,
  }

  socket.emit('new_message', usuario);
}
