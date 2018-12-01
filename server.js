// server.js
// where your node app starts

// init project



const express = require('express');
const app = express();

app.use(express.static('public'));

// listen for requests :)
const server = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + server.address().port);
});

const io = require('socket.io')(server);    //http://socket.io/docs/
const name_spaced_com = io.of('/whatsuuuup'); 

let index = 1;
const colors = ["rot", "orange", "gelb", "grün" , "blau", "indigo", "violett"];
let square = ["blau","blau","blau","blau" ]

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html

//io.on('connect', (socket) => {socket.emit('color', square);} );

name_spaced_com.on('connection', function (socket) {
  
  setTimeout(() => name_spaced_com.emit('color', square, index), 500)
  
  console.log("Client ID"+socket.id+" connected");
  
  app.get('/addcolor', function(request, response) {
    
    let newcolor;
    const s = [...square]
    if (colors.includes(request.query.color)){
      newcolor = request.query.color
      s[index] = newcolor
      index += 1
      index = index > 3 ? 0 : index
      
      square = s
    }

    response.send("ok" +  (newcolor ? ", setze " + newcolor : ", mache aber nix"))
    
    name_spaced_com.emit('color', s, index);
  });
});



// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  
  response.sendFile(__dirname + '/views/index.html');
});

