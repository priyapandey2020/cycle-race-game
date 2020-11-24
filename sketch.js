var path,mainCyclist;
var pathImg,mainRacerImg,biker1Img, biker2Img, biker3Img,gameOverImg;
var cycleBell;
var opponentCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;


function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  cyclists1Img = loadAnimation("player1.png","player2.png");
  cyclists2Img = loadAnimation("player3.png","player4.png");
  cyclists3Img = loadAnimation("player5.png","player6.png");
  cycleBell = loadSound("horn1.mp3");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(800,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,100,20,20);
mainCyclist .addAnimation("SahilRunning",mainRacerImg);
mainCyclist.scale=0.07;
  
gameOver = createSprite(400,130);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
opponentCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,650,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
    
   path.velocityX = -(6 + 2*distance/150);
  
  mainCyclist .y = World.mouseY;
  
  edges= createEdgeSprites();
  mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    opponentCyclists();
    
   if(keyDown("space")) {
    cycleBell.play();
  }
  
   if(opponentCG.isTouching(mainCyclist)){
        gameState = END;
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 240,220);
  
    path.velocityX = 0;
    mainCyclist .velocityY = 0;
  
    opponentCG.setVelocityXEach(0);
    opponentCG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}
}

function opponentCyclists(){
  
  if(World.frameCount%100===0){
    var cyclists=createSprite(800,Math.round(random(10, 250), 10, 10));
     cyclists.scale =0.07;
    
    cyclists.velocityX = -(6 + 2*distance/150);
    
     var r=Math.round(random(1,3));
    
    if (r == 1) {
      cyclists.addAnimation("opponentPlayer",cyclists1Img);
    } else if (r == 2) {
      cyclists.addAnimation("opponentPlayer",cyclists2Img);
    } else{
      cyclists.addAnimation("opponentPlayer",cyclists3Img);
    } 
         
    cyclists.setLifetime=170;
    
    opponentCG.add(cyclists);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  
  opponentCG.destroyEach();
  distance = 0;
}