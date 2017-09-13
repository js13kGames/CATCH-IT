

game.initapp = {
  started: false,
  start: function(){
  	
  	game.gcontainer = document.getElementById("gcontainer");   
    
    var c = "<div class='container'><img src='catch.svg' /><div class='roundbutton big'><a>😸</a></div></div>";
    
    
    game.gameStatusBuilder();
    game.setPage(c);

      //getting the game's container  page
 
 
 
 game.sound = document.createElement("audio");
 document.body.appendChild(game.sound);
 game.sound.setAttribute("src", "snd.wav");
 game.sound.addEventListener("canplaythrough",game.loaded,false);

 game.sound2 = document.createElement("audio");
 document.body.appendChild(game.sound2);
 game.sound2.setAttribute("src", "snd.wav");
 game.sound2.addEventListener("canplaythrough",game.loaded,false);

 game.sound3 = document.createElement("audio");
 document.body.appendChild(game.sound3);
 game.sound3.setAttribute("src", "snd.wav");
 game.sound3.addEventListener("canplaythrough",game.loaded,false);

    
  },//start

};//game.initapp

game.start = {
  started: false,
  start: function(){
     
    var c = "<div class='container'><div class='roundbutton big'><img src='catch.svg' class='title'/><a>😸</a></div><div class='roundbutton right'><a href='help'>👉</a></div></div>";
    
    game.setPage(c);
    //game.start.started = false;
    
  },//start

};//game.start


game.help = {

  started: false,
  start: function(){
    var content;
    
    content = "<h1>HELP US</h1>";
    content += "<p>The cat has run away from home. Tap on and help him to find his way back. Tap the other stuff to make points and to clear the sky. Please, hurry, otherwise he will be forever <b>LOST</b></p>";
    content += "<div class='roundbutton right'><a href='gameon'>👉</a></div>";

    game.setPage(content);
   
},// start

 };//game.help



game.lost = {

  started: false,
  start: function(){
    var content;
     
    game.desapBalls();
    game.lost.started = true;
    game.gameon.started = false;
   
    
    game.ctx.clearRect(0,0,game.width,game.height);
    content = "<div class='container'><h1 class='roundbutton big'> 🙀 </h1></div> ";
    content += "<div class='roundbutton left'><a href='gameon'> 🔄 </a></div>";

    game.setPage(content);
    
},// start

};//game.lost

game.win = {

  started: false,
  start: function(){
    var content;
    
    game.desapBalls(); 
    game.win.started = true;
    game.gameon.started = false;
    game.v.level = parseInt(game.v.level)+1;
    
    
    game.ctx.clearRect(0,0,game.width,game.height);
    content = "<div class='container'><h1 class='roundbutton big'> 👌 </h1></div> ";
    content += "<div class='roundbutton left'><a href='gameon'> 🔄 </a></div>";
    
    game.saveToStorage(game.v);
    game.setPage(content);
    
},// start

};//game.win






