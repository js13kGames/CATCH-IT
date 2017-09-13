/*++++++++++++++++++++++++
+         main app       +
+ the global object      +
+game  holds the entire  +
+ game                   +
++++++++++++++++++++++++*/

window.onload = function(){
	
// the event listener redirects the event object
// to the corresponding game.state

var events = function(e){
   var h = e.target.getAttribute("href");
    e.preventDefault();
    e.stopPropagation();
    
    // if the target has an href attribute, it will change 
    // the game state
    if (h){
           game[game.v.state].started = false; 
           game.v.state = h;
            
    }//if
    //otherwise it will go to the event method of the state
    // for example game.gameon.event()
    
    else if ("event" in game[game.v.state]){game[game.v.state].event(e);}
  };


  //game Engine
  /*
    There are five game states, start, gameon, lost, and win
    the game engine seeks for methods start, update and event
    if they exist, it passes to the animate's game method
  */

game.animate( function(){
 if ( "start" in game[game.v.state] && !game[game.v.state].started){

    game[game.v.state].start();
    game[ game.v.state ].started = true; 

}//if
 else if ("update" in game[game.v.state]){
  game[game.v.state].update();
}//elseif
 });//game.animate
 
 //event listeners, can be tested/played on a computer as well

document.body.addEventListener("touchstart",events, false);
document.body.addEventListener("click", events, false);

};//window.onload 




