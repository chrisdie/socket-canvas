// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');

const colors = ["rot", "orange", "gelb", "grün" , "blau", "indigo", "violett"];
const drawcolors = ["red", "orange", "yellow", "green" , "blue", "indigo", "violett"];

let sqindex = 0
const socket = io('/whatsuuuup'); 
socket.on('color', function(data , index){
  sqindex = index
  console.log("color listener fired and said: "+ data);
  const newcolors = data.map((c) => {
    const idx = colors.findIndex(e => e === c)
    return drawcolors[idx]
  })
  
  const c = document.getElementById("x")
  const ctx=c.getContext("2d");
  
  
  newcolors.map((c,i) => {
  
    
    
    ctx.fillStyle=c;
    if (i === 0){
      ctx.fillRect(0,0,100,100);
      ctx.strokeStyle="#000";
      ctx.strokeRect(0,0,100,100);
    } 
    else if (i === 1){
      ctx.fillRect(100,0,100,100);
      ctx.strokeStyle="#000";
      ctx.strokeRect(100,0,100,100);
    }
    else if (i === 2){
      ctx.fillRect(0,100,100,100);
      ctx.strokeStyle="#000";
      ctx.strokeRect(0,100,100,100);
    }
    else if (i === 3){
      ctx.fillRect(100,100,100,100);
      ctx.strokeStyle="#000";
      ctx.strokeRect(100,100,100,100);
    }
    
    if (firsttime)
    {
      drawCircle()
      firsttime = false;
    }
    //ctx.fill();
    
  })
            
})

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
let co = 6699
let angle = 0;

var duration=1.0;

// starting and ending colors
var rgbStart='#ffffff';
var rgbEnd='#FFFF00';
// calculate the # of frames that requestAnimationFrame can
// draw during the duration
var opacitySteps=parseInt(25*duration);
let opacityStep = 0
let rdelta = 1
let firsttime = true
function drawCircle(){
  
  
  const c = document.getElementById("x")
  const ctx=c.getContext("2d");
  //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
    // calculate the current opacity as a percentage
  //     of opacityStep/opacitySteps
  var opacity=100*(opacityStep/opacitySteps);
  if(opacityStep>=opacitySteps-1){ opacity=100; rdelta = 1 }
  
  rdelta = 15 * (opacityStep/opacitySteps)

  let nextidx = sqindex 
  //console.log(nextidx)
  let startx = nextidx === 0 || nextidx === 2 ? 50 : 150
  let starty = nextidx === 0 || nextidx === 1 ? 50 : 150

  // draw the circle
  ctx.beginPath();
  var radius = 15 * Math.abs(Math.cos(angle));
  ctx.arc(startx, starty, radius, 0, Math.PI * 2, false);
  ctx.closePath();
  
  // draw with the starting color using a lessening opacity
  //ctx.globalAlpha=(100-opacity)/100;
  ctx.fillStyle=rgbStart;
  
  ctx.fill();
  
  ctx.beginPath();
  var radius = (rdelta ) + 1 * Math.abs(Math.cos(angle));
  ctx.arc(startx, starty, radius, 0, Math.PI * 2, false);
  ctx.closePath();

  // draw with the ending color using a increasing opacity
  //ctx.globalAlpha=(opacity)/100;
  ctx.fillStyle=rgbEnd;
  
  ctx.fill();

  // clean up, reset globalAlpha to it's default of 1.00
  //ctx.globalAlpha=1.00;

  // return if all steps have been played
  if(++opacityStep>=opacitySteps)
  {
    opacitySteps=parseInt(60*duration);
    opacityStep = 0
    rdelta = 1
  }
  
  
  
  // color in the circle

  
  //console.log ("drawing", ctx.fillStyle);

  angle += Math.PI / 64;

  
  requestAnimationFrame(drawCircle);
  
}


// our default array of dreams
const dreams = [
  'Find and count some sheep',
  'Climb a really tall mountain',
  'Wash the dishes'
];

// define variables that reference elements on our page
const dreamsList = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements['dream'];

// a helper function that creates a list item for a given dream
const appendNewDream = function(dream) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = dream;
  dreamsList.appendChild(newListItem);
}

// iterate through every dream and add it to our page
dreams.forEach( function(dream) {
  appendNewDream(dream);
});

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get dream value and add it to the list
  dreams.push(dreamInput.value);
  appendNewDream(dreamInput.value);

  // reset form 
  dreamInput.value = '';
  dreamInput.focus();
};


