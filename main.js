window.requestAnimFrame = (function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        })();
    

function animLoop() {
    game.nowTime = Date.now();
    //var dt = (now - last)/16.66666666666666 * (.8);
    
    var dt = (game.nowTime-game.lastTime)/1000;
    update(dt);
    draw.drawScene();
    requestAnimFrame(animLoop);
    game.lastTime = game.nowTime;
    
}

function update(dt){    
    if(game.keys[32]){
        //game.bombs[32]
        if(!game.bombMap[32]){                        
            game.bombMap[32] = true;
            game.bombs.push(new bomb(game.mouseX, game.mouseY, 0, 0));   
        }
    }
    if(!game.keys[32]){
       if(game.bombMap[32]){
            game.bombMap[32] = false;
        }
    }
    //G
    if(game.keys[71]){
        game.gravity++;
    }
    //H
    if(game.keys[72]){
        game.gravity--;
    }

    for(var p = 0; p < game.players.length; p++){
        game.players[p].update(dt);
    }
    
    if(game.liveBomb)
        game.liveBomb.update(dt);
    
    if(game.liveWell)
        game.liveWell.update(dt);
    
    for(var b = 0; b < game.bombs.length; b++){
        game.bombs[b].update(dt);
    }
    
    for(var w = 0; w < game.wells.length; w++){
        game.wells[w].update(dt);
    }
}

game = new gameObject();
draw = new drawLevelCentricObject();
//draw = new drawPlayerCentricObject();
resizeGame();
animLoop();