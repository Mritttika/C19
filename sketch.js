var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockGroup;
var gameState = "PLAY";


function preload(){
  
  towerImg =loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
}


function setup(){
  
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300);
  ghost.addImage("ghost1",ghostImg);
  ghost.scale = 0.25;
  
  

  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw(){
  
  background(222);

  if (gameState === "PLAY"){
    
      if (tower.y >400){
        tower.y = 300;
      }

      if(keyDown("space")){

        ghost.velocityY = -5;
      }

      if (keyDown("left_arrow")){

        ghost.x = ghost.x -2;
      }

      if (keyDown("right_arrow")){

        ghost.x = ghost.x +2;
      }

      ghost.velocityY = ghost.velocityY +0.8;

      if (ghost.isTouching(climberGroup)){

        ghost.velocityY = 0;
      }
    
      if (ghost.isTouching(invisibleBlockGroup)||ghost.y >600){
        
        ghost.destroy();
        gameState = "END";
      
         }
    
      spawnDoors();
  }
  
  if(gameState === "END"){
    
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 240,250);
 }

  
  drawSprites();
}


function spawnDoors(){
  
  if (frameCount %240 === 0){
    
    door = createSprite(200,-50);
    door.addImage("door",doorImg);
    
    climber = createSprite(200,10);
    climber.addImage("climber",climberImg);
    climber.velocityY = 1;
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.velocityY = 1;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.lifetime = 800;
    invisibleBlock.debug = true;
    
    
    
    door.x = Math.round(random(100,450));
    door.velocityY = 1;
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.lifetime = 800;
    climber.lifetime = 800;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;
 }
  
  
}
