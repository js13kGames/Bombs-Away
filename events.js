function mouseClick(event){
    game.ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);     
    var gameArea = document.getElementById('gameArea');
    
    var x = (event.clientX - (window.innerWidth - gameCanvas.width)/2)/gameCanvas.width*game.gameWidth;
    var y = (event.clientY - (window.innerHeight - gameCanvas.height)/2)/gameCanvas.height*game.gameHeight;
    
    //var x = (event.pageX - (window.innerWidth - gameCanvas.width)/2)/gameCanvas.width*game.gameWidth;
    //var y = (event.pageY - (window.innerHeight - gameCanvas.height)/2)/gameCanvas.height*game.gameHeight;
    
    //game.players[0].velX = 5;
    
    //Demo: Add a bomb on click
    //game.bombs.push(new bomb(x, y));    
    //game.bombs.push(new bomb(game.players[0].x, game.players[0].y, 0, 0, game.mouseX, game.mouseY));
    for(var b = 0; b < game.buttons.length; b++)
    {
        if(mouseHitButton(x, y, game.buttons[b]))
        {
            game.selectedWeapon = game.buttons[b].type;  
            return null;
        }
    }
    
    game.players[0].shoot(game.players[0], x, y);
    
    
    //game.bombs[0] = 
}

function mouseUp(event){
    game.ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);     
    var gameArea = document.getElementById('gameArea');
    
    var x = (event.clientX - (window.innerWidth - gameCanvas.width)/2)/gameCanvas.width*game.gameWidth;
    var y = (event.clientY - (window.innerHeight - gameCanvas.height)/2)/gameCanvas.height*game.gameHeight;
    
    
    //var x = (event.pageX - (window.innerWidth - gameCanvas.width)/2)/gameCanvas.width*game.gameWidth;
    //var y = (event.pageY - (window.innerHeight - gameCanvas.height)/2)/gameCanvas.height*game.gameHeight;
    
    
    //Demo: Add a bomb on click
    //game.bombs.push(new bomb(x, y));    
    //game.bombs.push(new bomb(game.players[0].x, game.players[0].y, 0, 0, game.mouseX, game.mouseY));   
    /*
    if(game.bombs[0]){
        if(game.bombs[0].state == game.bombs[0].states.Placed){
            game.bombs[0].explode();
        }
    }
    */
    
    if(game.liveBomb){
        if(game.liveBomb.state == game.liveBomb.states.Placed){
            game.liveBomb.explode();
        }
    }
    if(game.liveWell){
        if(game.liveWell.state == game.liveWell.states.Placed){
            game.liveWell.explode();
        }
    }
}


function mouseMoved(event){
    var x = (event.clientX - (window.innerWidth - gameCanvas.width)/2)/gameCanvas.width*game.gameWidth;
    var y = (event.clientY - (window.innerHeight - gameCanvas.height)/2)/gameCanvas.height*game.gameHeight;
    
    game.mouseX = x;
    game.mouseY = y;
}

function switchWeapon(event){
    game.selectedWeapon++
    game.selectedWeapon %= 2;
}
    

function keyDown(event){ 
  game.keys[event.keyCode] = true;
}

function keyUp(event){ 
  game.keys[event.keyCode] = false;
}

window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);

//if(!game.isMobile()){
gameCanvas.addEventListener('mousedown', mouseClick, false);
gameCanvas.addEventListener('mouseup', mouseUp, false);
gameCanvas.addEventListener('mousemove', mouseMoved, false);
window.addEventListener("wheel", switchWeapon, false);
//}


gameCanvas.addEventListener('touchstart', mouseClick, false);
gameCanvas.addEventListener('touchend', mouseUp, false);

window.addEventListener("shake", switchWeapon, false);
//}


window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);