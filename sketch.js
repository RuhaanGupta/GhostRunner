var tower,towerImg;
var doorGroup,doorImg;
var climberImg;
var ghost,ghostImg;
var ivGroup;
var gameState = "play";
var spookySound;
var score = 0;
function preload(){
  
  towerImg = loadImage("tower.png");
  doorImg  =  loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
}
function setup(){
  createCanvas(600,600);
  
   tower = createSprite(300,300);
   tower.addImage("towerImage",towerImg);
   tower.velocityY = 1;
   
   ghost = createSprite(200,200,50,50);
   ghost.addImage("ghostImage",ghostImg);
   ghost.scale = 0.3;

  
   doorGroup = new Group();
   climberGroup = new Group();
   ivGroup = new Group();
  
  
  
}
function draw(){
  background(0);
  if(gameState == "play"){
    
  spookySound.play();
    
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
  }  
   
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY+1;
   
  if(tower.y > 400){
    tower.y = 300;
  }
    
   spawnDoors(); 
    
    if(climberGroup.isTouching(ghost)){
    ghost.velocity = 0;
  }
    
   if(ivGroup.isTouching(ghost) || ghost.y > 600){
  ghost.destroy();
  gameState  = "end";
  }
    score = score + Math.round(getFrameRate()/60);
    
    drawSprites(); 
    
      stroke("blue");
      fill("blue");
      textSize(30);
      text("SCORE: " + score,400,50);
    
  }
  
  if(gameState == "end"){
    
      stroke("blue");
      fill("blue");
      textSize(30);
      text("GAME OVER",230,250);
      
      text("SCORE: " + score,400,50);
    }

  
 
}
function spawnDoors(){
  
  if(frameCount % 240 === 0 ){
    var door = createSprite(200,-50);
    var climber = createSprite(200,10);
    var ib  = createSprite(200,15);
    
    ib.width = climber.width;
    ib.x = door.x;
    ib.velocity = 1;
    ib.hieght = 2;
    
    door.addImage("doorImage",doorImg);
    climber.addImage("climberImage",climberImg)
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    
    door.velocityY = 1;
    climber.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth+=1;
    
    door.lifeTime = 800;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    ivGroup.add(ib);
  }
  
}




