(function(){

  /* -------------------------------------------------------------------------------------------------------------- 
                                        Canvas Setup and Variables
  -------------------------------------------------------------------------------------------------------------- */

  var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      canvasWidth = canvas.width,
      canvasHeight = canvas.height;

  var Player = new Player(),
      gravity = 0.3,
      friction = 0.80,
      Platforms = [],
      Ground = [],
      Walls = [],
      Enemies = [],
      Exits = [],
      Elevators = [],
      EnemyElevators = [],
      Teleporters = [],
      keys = {};

  var level = 0,
      ElevatorOn = false,
      EnemyElevatorOn = false,
      TeleportersOn = false,
      isPlaying = true; 

  /* -------------------------------------------------------------------------------------------------------------- 
                              Start the loop when the Page is loaded
  -------------------------------------------------------------------------------------------------------------- */
  window.addEventListener("load", function(){
    //code executes once the page is loadedy
   TitleScreen();
   Loop();
  });

  /* -------------------------------------------------------------------------------------------------------------- 
                                  Setup Animation for each Browser Prefix 
  -------------------------------------------------------------------------------------------------------------- */

  var requestAnimFrame =  window.requestAnimationFrame || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame || 
  window.msRequestAnimationFrame  ||  
  window.oRequestAnimationFrame   || 
  function(callback) {
    window.setTimeout(callback, 1000/20);
  };

 /* -------------------------------------------------------------------------------------------------------------- 
                                  Clear The console memory
  -------------------------------------------------------------------------------------------------------------- */

  /*var clearConsole = setInterval(function(){
    console.clear();
  },1500);*/

  /* -------------------------------------------------------------------------------------------------------------- 
                                             Game Loop Function 
  -------------------------------------------------------------------------------------------------------------- */
  
  function Loop() {
    
    if (isPlaying == true) {

      pickups = [];
      Platforms = [];
      Enemies = [];
      Exits = [];
      pickups = [];
      Ground = [];

      Teleporters = [];
      Prepare();

      if(level === 0) {
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
      } else if(level === 1) {
        Level1();
        drawPlayer();
        //Level Info
        new TextDraw("Level 1: Get to the exit", 20, 30, "#fff", "15px");
      } else if(level === 2) {
        Level2();
        drawPlayer();
        //Level Info
        new TextDraw("Level 2: You can slide up walls", 20, 30, "#fff", "15px");
      } else if(level === 3) {
        Level3();
        drawPlayer();
        //Level Info
        new TextDraw("Level 3: More walls more slides", 20, 30, "#fff", "15px");
      } else if(level === 4) {
        Level4();
        drawPlayer();

        //Level Info
        new TextDraw("Level 4: R: Red, G: Green, B: Blue, SPACE: Less Gravity", 20, 30, "#fff", "15px");
      } else if(level === 5) {
        Level5();
        drawPlayer();

        //Level Info
        new TextDraw("Level 5: Get to the exit", 20, 30, "#fff", "15px");
      } else if(level === 6) {
        Level6();
        drawPlayer();

        //Level Info
        new TextDraw("Level 6: Dont Touch Yellow blocks", 20, 30, "#fff", "15px");
      } else {
        console.log("Game over - Still in development - Torean Joel 2017");
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        isPlaying = false;
        TitleScreen();
      }

      if(ElevatorOn == true) {
       drawElevators();
      } 

      if(EnemyElevatorOn == true) {
        drawEnemyElevators();
      }

      if(TeleportersOn == true) {
        drawTeleporters();
      }

      movePlayer();  
      Collisions();

      requestAnimFrame(Loop);
    }
  }

/* -------------------------------------------------------------------------------------------------------------- 
                            Prepare Function that will load before the scene is made 
  -------------------------------------------------------------------------------------------------------------- */

  function Prepare() {
    //also make menu before this
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
  }

  function TitleScreen() {
    //drawing text to screen
    var isTitleScreen = true;
    var startedGame = false;
    var startScreen = document.getElementById('start');
    //default properties of markup
    startScreen.style.display = "block";
    controls.style.display = "none";
    canvas.style.display = "none";
    level = 1;
    isPlaying = true;

    document.body.addEventListener('keydown', function(e){
      var keyID = e.keyCode || e.which || 0;

      if(keyID === 13 && isTitleScreen) {
        startedGame = true;
        isTitleScreen = false;
        startScreen.style.display = "none";
        canvas.style.display = "block";
        level = 1; //level 1
      }
      if(keyID === 72 && isTitleScreen && !startedGame) {
        isTitleScreen = false;
        startScreen.style.display = "none";
        controls.style.display = "block";
      }else {
        if(keyID === 72 && !isTitleScreen && !startedGame) {
          isTitleScreen = true;
          startScreen.style.display = "block";
          controls.style.display = "none";
        }
      }
    });
  }

  /* -------------------------------------------------------------------------------------------------------------- 
                                      Create Level Layouts (x,y,width,height,color)
  -------------------------------------------------------------------------------------------------------------- */

  function Level1() {
    //background - image(loc,x,y,w,h)
    new image("images/levels/01.png",0,0,canvasWidth,canvasHeight);

    //ground
    var ground1 = new PlatformNeutral(0,canvasHeight - 26,canvasWidth,canvasHeight)
    Ground.push(ground1);

    //end Exit
    var Exit1 = new Exit(canvasWidth - (canvasWidth - 680),canvasHeight - 46,8,20);
    Exits.push(Exit1);

  }

  function Level2() {
    //background - image(loc,x,y,w,h)
    new image("images/levels/02.png",0,0,canvasWidth,canvasHeight);

    //ground
    var ground1 = new PlatformNeutral(0,canvasHeight - 26,canvasWidth,canvasHeight)
    Ground.push(ground1);

    var ground2 = new PlatformNeutral(canvasWidth - 217,canvasHeight - 92,217,130)
    Ground.push(ground2);

    //end Exit
    var Exit1 = new Exit(canvasWidth - (canvasWidth - 750),canvasHeight - 112,8,20);
    Exits.push(Exit1);
  }

  function Level3() {
    //background - image(loc,x,y,w,h)
    new image("images/levels/03.png",0,0,canvasWidth,canvasHeight);

   //ground
   var ground1 = new PlatformNeutral(0,canvasHeight - 26,canvasWidth,canvasHeight)
   Ground.push(ground1);
   
   var ground2 = new PlatformNeutral(canvasWidth - 217,canvasHeight - 111,217,130)
   Ground.push(ground2);

   var ground3 = new PlatformNeutral(canvasWidth - 87,canvasHeight - 221,87,112)
   Ground.push(ground3);

   var ground4 = new PlatformNeutral(canvasWidth - 173,canvasHeight - 221,87,68)
   Ground.push(ground4);

    //end Exit
    var Exit1 = new Exit(canvasWidth - (canvasWidth - 780),canvasHeight - 241,8,20);
    Exits.push(Exit1);
  }

  function Level4() {
    //background - image(loc,x,y,w,h)
    new image("images/levels/04.png",0,0,canvasWidth,canvasHeight);

   //ground
   var ground1 = new PlatformNeutral(0,canvasHeight - 26,184,canvasHeight)
   Ground.push(ground1);
   
   var ground2 = new PlatformNeutral(canvasWidth - 198,canvasHeight - 26, 198,canvasHeight)
   Ground.push(ground2);

   //platforms
   var plat1 = new Platform(canvasWidth - 335,canvasHeight - 89, 214,25, '#F00')
   Platforms.push(plat1);
   
   var plat2 = new Platform(131,canvasHeight - 89, 214,25, '#6FDE41')
   Platforms.push(plat2);

    //end Exit
    var Exit1 = new Exit(canvasWidth - (canvasWidth - 760),canvasHeight - 46,8,20);
    Exits.push(Exit1);
  }

  function Level5() {
    //background - image(loc,x,y,w,h)
    new image("images/levels/05.png",0,0,canvasWidth,canvasHeight);

    /* 1 -red 2-blue 3-blue 4-green 5-red */
    //ground
    var ground1 = new PlatformNeutral(0,canvasHeight - 26,canvasWidth,canvasHeight)
    Ground.push(ground1);

    var ground2 = new PlatformNeutral(0,canvasHeight - 171,64,150)
    Ground.push(ground2);

    //platforms
    var plat1 = new Platform(111,canvasHeight - 317,25,181, '#F00')
    Platforms.push(plat1);

    var plat2 = new Platform(186,canvasHeight - 347,177,25, '#81CAFF')
    Platforms.push(plat2);

    var plat3 = new Platform(canvasWidth - 342,canvasHeight - 291,50,50, '#81CAFF')
    Platforms.push(plat3);

    var plat4 = new Platform(canvasWidth - 250,canvasHeight - 362,50,50, '#6FDE41')
    Platforms.push(plat4);

    var plat5 = new Platform(canvasWidth - 169,canvasHeight - 402,169,25, '#F00')
    Platforms.push(plat5);

    //ground level
    var ground8 = new PlatformNeutral(canvasWidth - 272,canvasHeight - 89,272,63)
    Ground.push(ground8);

    var ground9 = new PlatformNeutral(canvasWidth - 179,canvasHeight - 168,179,79)
    Ground.push(ground9);

    var ground10 = new PlatformNeutral(canvasWidth - 75,canvasHeight - 215,75,47)
    Ground.push(ground10);

    //end Exit
    var Exit1 = new Exit(canvasWidth - (canvasWidth - 760),canvasHeight - 422,8,20);
    Exits.push(Exit1);
  }

  function Level6() {
    //background - image(loc,x,y,w,h)
    new image("images/levels/06.png",0,0,canvasWidth,canvasHeight);

    //ground
    var ground1 = new PlatformNeutral(0,canvasHeight - 26,299,canvasHeight)
    Ground.push(ground1);

    var ground2 = new PlatformNeutral(canvasWidth - 99,canvasHeight - 52,299,26)
    Ground.push(ground2);

    //platforms
    var plat1 = new Platform(318,canvasHeight - 85,122,25, '#81CAFF')
    Platforms.push(plat1);

    var plat2 = new Platform(canvasWidth - 318,canvasHeight - 161,74,25, '#6FDE41')
    Platforms.push(plat2);

    var plat4 = new Platform(canvasWidth - 223,canvasHeight - 268,25,268, '#81CAFF')
    Platforms.push(plat4);

    //enemies
    var enemy1 = new Enemy(canvasWidth - 173,canvasHeight - 171,30,30, '#6FDE41');
    Enemies.push(enemy1);

    var enemy2 = new Enemy(canvasWidth - 56,canvasHeight - 171,30,30, '#6FDE41');
    Enemies.push(enemy2);

    //end Exit
    var Exit1 = new Exit(canvasWidth - 10,canvasHeight - 72,8,20);
    Exits.push(Exit1);
  }

  /* -------------------------------------------------------------------------------------------------------------- 
                              Drawing  objects to Canvase as per level 
  -------------------------------------------------------------------------------------------------------------- */

var parts = [],
    partCount = 30,   
    partsFull = false,    
    hueRange = 50,
    globalTick = 0,
    rand = function(min, max){
        return Math.floor( (Math.random() * (max - min + 1) ) + min);
    };

    var Part = function(){
      this.reset();
    };

    Part.prototype.reset = function(){
      this.startRadius = rand(5,15);
      this.radius = this.startRadius;
      this.x = Player.x + (Player.width/2);
      this.y = Player.y + (Player.height/2);      
      this.vx = 0;
      this.vy = 0;
      this.hue = Player.hue;
      this.saturation = Player.saturation;
      this.lightness = Player.lightness;
      this.startAlpha = rand(1, 10) / 100;
      this.alpha = this.startAlpha;
      this.decayRate = .1;  
      this.startLife = 7;
      this.life = this.startLife;
      this.lineWidth = rand(1, 3);
    }
        
    Part.prototype.update = function(){  
      this.vx += (rand(0, 200) - 100) / 1500;
      this.vy -= this.life/50;  
      this.x += this.vx;
      this.y += this.vy;  
      this.alpha = this.startAlpha * (this.life / this.startLife);
      this.radius = this.startRadius * (this.life / this.startLife);
      this.life -= this.decayRate;  
      if(
        this.x > canvasWidth + this.radius || 
        this.x < -this.radius ||
        this.y > canvasHeight + this.radius ||
        this.y < -this.radius ||
        this.life <= this.decayRate
      ){
        this.reset();  
      }  
    };
      
    Part.prototype.render = function(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = ctx.strokeStyle = 'hsla('+this.hue+', '+this.saturation+'%, '+this.lightness+'%, '+this.alpha+')';
      ctx.lineWidth = this.lineWidth;
      ctx.fill();
      ctx.stroke();
    };

    //create new instance of particles
    var createParts = function(){
      if(!partsFull){
        if(parts.length > partCount){
          partsFull = true;
        } else {
          parts.push(new Part()); 
        }
      }
    };
      
    //update particles position form array
    var updateParts = function(){
      var i = parts.length;
      while(i--){
        parts[i].update();
      }
    };

    //draw particles from array
    var renderParts = function(){
      var i = parts.length;
      while(i--){
        parts[i].render();
      }   
    };
        
    //particles main loop
    var loop = function(){
      createParts();
      updateParts();
      renderParts();
      globalTick++;
    };


  function drawPlayer() {
    ctx.fillStyle = Player.playerColour;
    ctx.fillRect(Player.x, Player.y, Player.width, Player.height);

    //run loop of particles
    loop();
  }

  function drawTeleporters() {
    for (var i = 0; i < Teleporters.length; i++) { 
      ctx.fillStyle = "#81BCF7";
      ctx.fillRect(Teleporters[i].x,Teleporters[i].y,Teleporters[i].width,Teleporters[i].height);
    }
  }

  //draw the pickups
  function drawPickups() {
    for (var i = 0; i < pickups.length; i++){
      ctx.fillRect(pickups.x, pickups.y, pickups.width, pickups.height);
    }
  }

  function drawElevators() {
    for (var i=0;i<Elevators.length;i++) { 

      if(Elevators[i].y + Elevators[i].height <= 0) {
        Elevators[i].y = canvasHeight;
      } else {
        ctx.fillStyle = Elevators[i].colour;
        ctx.fillRect(Elevators[i].x,Elevators[i].y,Elevators[i].width,Elevators[i].height);
        Elevators[i].y--;
      }
    }
  }

  /* -------------------------------------------------------------------------------------------------------------- 
                                  Check Collisions of Player vs Other Objects
  -------------------------------------------------------------------------------------------------------------- */

  function collisionTrueFalse(r1,r2){
      return !(r1.x >= r2.x + r2.width 
              || r1.x + r1.width <= r2.x 
              || r1.y > r2.y + r2.height 
              || r1.y + r1.height <= r2.y);
  }


  //check collision by sides and not corners
  function collisionSides(r1,r2) {
    var w = 0.5 * (r1.width + r2.width);
    var h = 0.5 * (r1.height + r2.height);
    var dx = (r1.x + r1.width/2) - (r2.x + r2.width/2);
    var dy = (r1.y + r1.height/2) - (r2.y + r2.height/2);
    var collision = 'none';

    if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
        var wy = w * dy;
        var hx = h * dx;

        if (wy > hx) {
            if (wy >= -hx) {
              collision = "top";
            } else {
              collision = "left";
            }
        } else {
          if (wy >= -hx) {
            collision = "right";
          } else {
            collision = "bottom";
          }
        }
    }
    return collision;
  }

  function Collisions() {

    //player touching ground platforms
    for (var i = 0; i < Ground.length; i++) { 
      var thisGround = Ground[i];
      var touching = collisionSides(Player,thisGround);

      if(touching === "left"){ 
          Player.jumping = false;
          Player.velX = -1;
          Player.velY = 1;
      }
      if(touching === "right"){ 
          Player.jumping = false;
          Player.velX = 1;
          Player.velY = 1;
      }
      if(touching === "top"){ 
          Player.jumping = true;
          Player.velY = 1;
      }
      if(touching === "bottom"){ 
          Player.jumping = false;
          Player.velY = -0.5;
          Player.y = thisGround.y - Player.height;
      }
    }

    //player touching platforms
    for (var i = 0; i < Platforms.length; i++) { 
      var currentPlatform = Platforms[i];
      var touching = collisionSides(Player,currentPlatform);

      if(touching === "left"){ 
        if(Player.playerColour === currentPlatform.colour) {
          Player.jumping = false;
          Player.velX = -1;
          Player.velY = 0.5;
        }
      }
      if(touching === "right"){ 
        if(Player.playerColour === currentPlatform.colour) {
          Player.jumping = false;
          Player.velX = 1;
          Player.velY = 0.5;
        }
      }
      if(touching === "top"){ 
        if(Player.playerColour === currentPlatform.colour) {
          Player.jumping = true;
          Player.velY = 1;
        }
      }
      if(touching === "bottom"){ 
        if(Player.playerColour === currentPlatform.colour) {
          Player.jumping = false;
          Player.velY = 0;
          Player.y = currentPlatform.y - Player.height;
        }
      }
    }

    //player touching Enemy Object
    for (var i = 0; i < Enemies.length; i++) { 
      var currentEnemy = Enemies[i];
      var touching = collisionTrueFalse(currentEnemy,Player);

      if(touching) { 
        Player.jumping = false;
        Player.velY = 0;
        Player.velX = 0;
        Player.x = canvasWidth/2 - 340;
        Player.y = canvasHeight - 47;
      }
    }

    //player touching level objective and resetting arrays and moving to next level
    for (var i=0;i<Exits.length;i++) { 
      var currentExit = Exits[i];
      var touching = collisionTrueFalse(currentExit,Player);

      if(touching) { 
        Player.jumping = false;
        Player.velY = 0;
        Player.velX = 0;
        Player.x = canvasWidth/2 - 340;
        Player.y = canvasHeight - 47;

        Ground = [];
        Platforms = [];
        Enemies = [];
        Exits = [];
        Elevators = [];
        EnemyElevators = [];
        Walls = [];
        ElevatorOn == false;
        EnemyElevatorOn == false;
        TeleportersOn == false;        

        level++;
      }
    }
  }

  /* -------------------------------------------------------------------------------------------------------------- 
                                  Moving The Player Object
  -------------------------------------------------------------------------------------------------------------- */

  function movePlayer() {

    //checking the keys
    keyChecks();

    //moving the player
    if(!(Player.isLeftKey) && !(Player.isRightKey)) {
      if (Player.velX > 0) {
        Player.velX *= friction;
      }
      if (Player.velX < 0) {
        Player.velX *= friction;
      }
    }

    if(Player.isLeftKey) {
      if (Player.velX > -Player.speed){
        Player.velX--;
      }
    } else if(Player.isRightKey) {
      if (Player.velX < Player.speed) {   
        Player.velX++;
      }    
    }

    if(Player.isUpKey) {
      if(!Player.jumping) {
        Player.jumping = true;
        Player.velY = -Player.speed*2;
      }
    }

    Player.velY += gravity;
    Player.x += Player.velX;
    Player.y += Player.velY;
    //Prevent player from dropping and then still being able to air jump
    Player.jumping = true; //Only jump from a standing position

    if (Player.x >= canvasWidth - Player.width)  {
      Player.x = canvasWidth - Player.width;
    } else if (Player.x <= 0) {  
      Player.x = 0;
    }   

    if(Player.y >= canvasHeight-Player.height) {
      /*Player.y = canvasHeight - Player.height;
      Player.jumping = false;*/
      Player.jumping = false;
      Player.velY = 0;
      Player.velX = 0;
      Player.x = canvasWidth/2 - 340;
      Player.y = canvasHeight - 47;
    }
  }

  /* -------------------------------------------------------------------------------------------------------------- 
                                          Event Listeners - Key Bindings
 -------------------------------------------------------------------------------------------------------------- */

  document.body.addEventListener('keydown', function(e){
    keys[e.keyCode] = true; 
  }, false);

  //check if key is not being pressed or has lifted up
  document.body.addEventListener('keyup', function(e){
    delete keys[e.keyCode];
  }, false);

  function keyChecks(){
    //checking keys pressed
    if (keys[82]) {
      Player.playerColour = '#F00'; //red
      Player.hue = 355;
      Player.saturation = 77;
      Player.lightness = 52;
    }
    if (keys[71]) {
      Player.playerColour = '#6FDE41'; //green
      Player.hue = 138;
      Player.saturation = 97;
      Player.lightness = 38;
    }
    if (keys[66]) {
      Player.playerColour = '#81CAFF'; //blue
      Player.hue = 210;
      Player.saturation = 79;
      Player.lightness = 55;
    }
    (keys[38]) ? Player.isUpKey = true : Player.isUpKey = false;
    (keys[39]) ? Player.isRightKey = true : Player.isRightKey = false;
    (keys[37]) ? Player.isLeftKey = true : Player.isLeftKey = false;
    (keys[32]) ? Player.isPowerJump = true : Player.isPowerJump = false;

    (Player.isPowerJump) ? gravity = 0.25 : gravity = 0.4;
  }

/* -------------------------------------------------------------------------------------------------------------- 
                                                       OBJECTS / functions
 -------------------------------------------------------------------------------------------------------------- */

  function Player() {
    this.width = 15;
    this.height = 15; // 15 default height
    this.x = canvasWidth/2 - 340;
    this.y = canvasHeight - 47;
    this.speed = 3;
    this.velX = 0;
    this.velY = 0;
    this.isUpKey = false;  
    this.isDownKey = false;
    this.isLeftKey = false;
    this.isRightKey = false;
    this.isPowerJump = false;
    this.jumping = false;
    this.playerColour = "#81CAFF";
    this.hue = 210;
    this.saturation = 79;
    this.lightness = 55;
  }

  function Platform(x,y,width,height,color) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.colour = color;

    ctx.fillStyle = 'rgba(0,0,0,0)'; //'rgba(0,0,0,0.2)';//this.colour;
    ctx.fillRect(x,y,width,height);
  }

  function PlatformNeutral(x,y,width,height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.colour = 'rgba(0,0,0,0)'; //'yellow'

    ctx.fillStyle = this.colour;
    ctx.fillRect(x,y,width,height);
  }

  function Enemy(x,y,width,height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    ctx.fillStyle = 'rgba(0,0,0,0)'; //'orange';
    ctx.fillRect(x,y,width,height);
  }

  function Exit(x,y,width,height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    ctx.fillStyle = "#fff";
    ctx.fillRect(x,y,width,height);
  }

  //image of the background
  function image(loc,x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    var img = new Image();
    img.src = loc;
    //background
    ctx.drawImage(img, x, y, w, h);
  }


/* -------------------------------------------------------------------------------------------------------------- 
                                                       Text to Canvas Functions  
 -------------------------------------------------------------------------------------------------------------- */

 function TextDraw(text, x, y, color, font_size){
    ctx.font = font_size + " Verdana";
    ctx.fillStyle = color || "#000";
    ctx.fillText(text, x, y);
  }

})();