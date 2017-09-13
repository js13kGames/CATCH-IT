 game.init = function(){
 
  var cs = window.getComputedStyle(document.body);
  var w = parseInt(cs.getPropertyValue("width"),10);
  var h = parseInt(cs.getPropertyValue("height"),10);
  var dpr = window.devicePixelRatio;
    
  game.canvas = document.createElement("canvas");
  game.canvas.setAttribute("width",w*dpr);
  game.canvas.setAttribute("height",h*dpr);
    
  game.canvas.style.width = w;
  game.canvas.style.height = h;
  game.ctx = game.canvas.getContext("2d");
  
  game.width = w;
  game.height = h;
  
  document.body.appendChild(game.canvas);

}//init

game.gameon = {
	
	started: false,
    opacity: 1,
	 rPos: function(){  	  
    	 var x,y,n;
    		
    		x = Math.floor(game.width*Math.random()); 
    		y = Math.floor(game.height*Math.random()); 
    		n=[x,y];
    		return n;
    	},//rPos
   
    start: function(){
      game.createBalls = function () {
     
	      var ch = ["😸","🍼","🍔","🍞","🍏","🏤","⚾","⚽","💡"]; 
//🍒🍑🍉🐾 🔄 
	      var v =  [10,8,7,6,5,4,3,2,1];
      	var n,i,p,c;
      	
      	for (i=0 ;i<ch.length;i++) {
      	  p = game.gameon.rPos();
      	  n = document.createElement("div");
      	  n.style.left = p[0]+"px";
      	  n.style.top = p[1]+"px";
      	  n.innerHTML = ""+ch[i];
      	  n.setAttribute("class", "roundball");
      	  n.setAttribute("data-val", ""+v[i]);
      	  game.gameon.list.push(n);
      	  document.body.appendChild(n);
        }//for
      };//createBalls

     game.gameon.fill = 0;
     game.gameon.hits = 4 + parseInt(game.v.level);
     game.gameon.c= 0;
	 game.gameon.c1= 0;
	 game.gameon.list= [];
	 game.gameon.score = 0;
	  
     c = "<div id='stage' class='container'><div id='score' class='annotations right'><span >"
     c += game.v.score +"</span></div>";
     c += "<div id='hits'  class='annotations left'><span>"
     c += game.gameon.hits+"</span></div>";
     c += "<div class='roundbutton big faded'> 🏤 </div></div>";

     game.setPage(c);
    !game.canvas && game.init();  //Initiating the canvas
     game.createBalls(); //creating the Balls

 game.stage = document.getElementById("stage");
 game.score = document.getElementById("score");
 game.hits = document.getElementById("hits");
 
  },
    update: function () {
    	
    	var fadeBalls = function() { 
    	  var i;
    	  var l = document.getElementsByClassName("roundball");
    	  for (i=0;i < l.length;i++) {
    	  	
    	  	l[i].style.opacity = 1-game.gameon.fill;
    	  	
    	  }//for
    	};//fadeBalls
    	
   	   	
  game.gameon.c1++;
  
  game.ctx.clearRect(0,0,game.width,game.height);
  
  if (game.gameon.hits === 0){
  	game.v.score += game.gameon.score;
  	game.gameon.score = 0;
  	game.v.state = "win";}
  else if ( game.gameon.fill >= 1 ){
          game.desapBalls();
          game.v.state = "lost";
         
     }//if
     
    	  game.gameon.fill += 0.005;
    	  game.ctx.fillStyle = "rgba(0,0,0,"+game.gameon.fill+")";
          fadeBalls();
    	  game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
    
    	  
     if (game.gameon.c1 > 50) {    		
    	  game.gameon.c1 = 0;
        game.desapBalls();
    	  game.createBalls();
    	 
     }
 
  },

    event: function(e){
    	
    	var v = parseInt(e.target.getAttribute("data-val"));
    	
    	if (v) {
    	  game.gameon.score = parseInt(game.gameon.score)+v;
    	  game.playsound("snd.wav",0.8);
    	  
   	 if (game.gameon.fill>0.5){game.gameon.fill=0.5}
       game.updateAnnotations(""+parseInt(game.v.score+game.gameon.score) , game.score);
   if (v === 10){
     game.gameon.hits -= 1; 
     game.updateAnnotations(""+game.gameon.hits, game.hits);
      }//if
    	}//if
 
  },//event

};



