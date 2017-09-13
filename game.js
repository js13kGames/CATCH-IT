(function() {  
 var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(b){ window.setTimeout(b, 1E3/30)};   
   window.requestAnimationFrame = requestAnimationFrame; })();

(function(exports){
 
 exports.spool = [];
 exports.scount = 0;
 exports.MAX_SOUNDS = 8;
 exports.sToLoad = 3;
 
 exports.loaded = function(e) {
   exports.scount++;
  if (exports.scount >= exports.sToLoad) {
  
   exports.sound.removeEventListener("canplaythrough",exports.loaded, false);
   exports.sound2.removeEventListener("canplaythrough",exports.loaded, false);
   exports.sound3.removeEventListener("canplaythrough",exports.loaded, false);
   
   exports.spool.push({name: "snd.wav", element: exports.sound, played:false});
   exports.spool.push({name: "snd.wav", element: exports.sound2, played:false});
   exports.spool.push({name: "snd.wav", element: exports.sound3, played:false});
   
   exports.v.state = "start";
	
}//if
}//loaded


exports.playsound = function(sound,volume) {
  
  var soundFound = false;
  var soundIndex = 0;
  var tempSound;
  
    if (exports.spool.length> 0) {
     while (!soundFound && soundIndex < exports.spool.length) {
       var tSound = exports.spool[soundIndex];
         if ((tSound.element.ended || !tSound.played) && tSound.name == sound) {
          soundFound = true;
          tSound.played = true;
          } //if 
          else {
             soundIndex++;
          }//else
       }//while
    }//if
  if (soundFound) {
       tempSound = exports.spool[soundIndex].element;
       tempSound.volume = volume;
        tempSound.play();
  }//if
  else if (exports.spool.length < exports.MAX_SOUNDS){
    tempSound = document.createElement("audio");
    tempSound.setAttribute("src", sound + "." + audioType);
    tempSound.volume = volume;
    tempSound.play();
  exports.spool.push({name:sound, element:tempSound, type:audioType, played:true});
}
}//playsound

  exports.v = {
  	 state: "initapp",
    level:      1,
    score:      0,
     };
     
  exports.animate   = function(frame){
    var running, lastFrame = +new Date;
    var loop = function(now){
      var deltaT ;
      if ( running !== false ){
        requestAnimationFrame( loop );
        now = now && now > 1E4 ? now : +new Date;
        deltaT = now - lastFrame;
        if ( deltaT < 160 ){
          running = frame( deltaT );
        }
        lastFrame = now;
       }//if 
     };//loop
     loop( lastFrame );
};//animate ---------------------------

exports.setPage = function(c){
	
  var a = exports.gcontainer;
  a.innerHTML = "";
  a.innerHTML = c;
}//setPage

exports.canvas = null;

exports.updateAnnotations = function(s,obj){
   
  obj.innerHTML = "";
  obj.innerHTML = "<span>"+s+"</span>";
 
};//updateAnnotations-------------------

//…………………saves in local storage ………………
exports.saveToStorage = function(ar) {
 localStorage.clear();
  var tojson = JSON.stringify(ar);
     localStorage.setItem("game", tojson );
}

//………………takes the game status out……………
exports.gameStatusBuilder = function() {
	
var k = localStorage.getItem("game");
var g={};
 if (k){ g = JSON.parse(k);
   
   game.v.level = g.level;
   game.v.score = g.score;
   
 }//if
 else {
 	
 	game.v.level = 1;
   game.v.score = 0;
   
 }//else
  
}//gameStatusBuilder

exports.desapBalls = function() {
    		var i;
    		var l = document.getElementsByClassName("roundball");
    		 for (i=0;i<l.length;i++){
    			 document.body.removeChild(l[i]);
    		}//for
    	};//desapBalls
})(this.game = {});
