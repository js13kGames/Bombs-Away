function gameObject(){
    
    //Game Dimensions in Game Units. I think of them as meters, but this is what you will do all of your position updating in. 
    this.gameWidth = 100;
    this.gameHeight = 100; 
    
    //http://www.colourlovers.com/palette/600798/(_t_r_a_v_e_l_e_r_)?widths=0
    //http://www.colourlovers.com/palette/3348506/Interstellar
    //http://www.colourlovers.com/palette/2450686/Space_Age_Love_Song
    //var SpaceAgeLoveSong = {"Background":"#1D0C20", };
    //var Interstellar = {"Background":"  }
    var FloatingInSpace = {"Background":"#5D6F72", "Ship":"#80CCD8", "Enemy":"#CEF5FB", "Bomb":"#343A3B", "Well":"#8AAAAF"}
    
    this.colors = FloatingInSpace;
    
    //Canvas Context for easy referencing
    this.Canvas = document.getElementById('gameCanvas');
    this.ctx = this.Canvas.getContext("2d"); 
    
    this.isMobile = function(){         
    if( navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)
         ){
            return true;
            }
         else {
            return false;
          }
    }        
    
    //Physics Variables
    //this.gravity = 10;
    this.gravity = 0;
    
    //Game Settings
    this.level = 0;
    this.score = 0;
    
    //Set up game object arrays here
    this.clicks = [];
    this.keys = [];
    this.buttons = [];
    this.meters = [];
    this.inputs = [];
    
    this.liveBomb;
    this.liveWell;
    this.bombs = [];
    this.wells = [];
    this.powerups = [];
    
    this.bombMap = [];
    this.floors = [];
    this.players = [];
    this.bots = [];
    this.generators = [];
    
    //Timers
    this.botCooldownTimer = 1;
    this.levelTime = 20;
    this.currentLevelTimer = 0;        
    
    //Game Objects
    this.weapons = {"Bomb":0, "Well":1};
    this.selectedWeapon = this.weapons.Bomb;
    
    this.meterTypes = {"Level":0, "Bomb":1, "Well":2, "Life":3};    
    this.powerupTypes = {"WellChargeRate": 0};
    
    this.init = function(){
        //Add a player
        //this.players.push(new player(this.gameWidth/2, this.gameHeight/2));
        this.players.push(new player(this.gameWidth/2, this.gameHeight/2));
        
        //Test Garbage
        this.powerups.push(new powerup(20, 20, 5, 5, this.powerupTypes.WellChargeRate));
        //game.bots.push(new bot(6, 6, 2, 2, .5, 10, this.weapons.Bomb));
        //game.bots.push(new bot(this.gameWidth -10, 6, 2, 2, 2, 10, this.weapons.Well));
        game.generators.push(new shipGenerator(6, 6, 3, 3, 5, this.weapons.Bomb));
        game.generators.push(new shipGenerator(40, 6, 3, 3, 5, this.weapons.Well));
                             

        //Add a floor
        this.floors.push(new floor(150, 40, 10, 5));

        //Add Some Buttons
        this.buttons.push(new roundButton(this.gameWidth/2+10, this.gameHeight-10, 5, this.weapons.Bomb, "#000000"));
        this.buttons.push(new roundButton(this.gameWidth/2-10, this.gameHeight-10, 5, this.weapons.Well, "#990099"));

        //Add Meters 
        this.meters.push(new meter(this.gameWidth/2 + 17.5, this.gameHeight - 10, this.meterTypes.Bomb));
        this.meters.push(new meter(this.gameWidth/2 - 17.5, this.gameHeight - 10, this.meterTypes.Well));
        this.meters.push(new meter(this.gameWidth/2, this.gameHeight - 10, this.meterTypes.Life));        
        this.meters.push(new meter(this.gameWidth/2, this.gameHeight - 17.5, this.meterTypes.Level));
        

        //Time Stuff
        this.lastTime = Date.now();
        this.nowTime = this.lastTime;
    }
    
    this.levelUp = function(){
        this.level++;
        this.currentLevelTimer = this.levelTime;
        this.bots = [];
        this.generators = [];
        game.generators.push(new shipGenerator(6, 6, 3, 3, 5, this.weapons.Bomb));
    }        
        
}