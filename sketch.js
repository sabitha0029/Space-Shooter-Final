 var PLAY = 1;
var END = 0;
var gameState = PLAY;
var backgroundImg1,backgroundImg;
var laserImg,shipImg,sunImg,alienImg,rockImg,planetImg;
var gameOverImg,restartImg,laser;
var laser,planet,obstacles,sunImg,sunGroup;
var backGroundSound;

function preload(){
 backgroundImg = loadImage("background.png");
  laserImg = loadImage("laser.png");
  shipImg=loadImage("ship.png");
  sunImg = loadImage("sun.png");
 alienImg = loadImage("alien.png");
   rockImg = loadImage("rock.png");
 planetImg = loadImage("planet.png");
gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  backGroundSound = loadSound("backGround.mp3");
    gameOverSound = loadSound("gameOver.mp3");
    winSound = loadSound("win.mp3");
   laserShotSound = loadSound("laserShot.mp3");
}


function setup() {
  
  createCanvas(600,600)
  backGroundSound.play(); 
  
  backgroundImg1 = createSprite(0,0,600,600);
  backgroundImg1.addImage(backgroundImg);
 // backgroundImg.scale = 2.5
  ship= createSprite(480,220,20,50);
  ship.addImage(shipImg); 
  ship.scale = 0.18;
  score = 0 ;
  restart = createSprite(300, 500);
  restart.addImage(restartImg);
  restart.scale = 0.25;
   
  gameOver = createSprite(300, 300);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5; 
   gameOver.visible = false;
  restart.visible = false;
    alienGroup= new Group();
  planetGroup= new Group();
  sunGroup= new Group();
  obstaclesGroup= new Group();
  laserGroup= new Group();
 
}


function draw() 
{
  if (gameState===PLAY){
    
      backgroundImg1.velocityY = -4.5;

  if(backgroundImg1.y < 100){ 
  backgroundImg1.y = backgroundImg1.height/2;
}
  
  ship.y = World.mouseY;
   ship.x = World.mouseX;
  if (keyDown("space")) {
    laserShotSound.play();
    createLaser();
  }
   var select_object = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {
    if (select_object == 1) {
      spawnAlien();
    } else if (select_object == 2) {
      spawnObstacles();
    }
    else if (select_object == 3) {
      spawnSun();
    }
      else {
spawnPlanet();
    }
  }
  
    if (alienGroup.isTouching(laser)) {
      winSound.play();
            alienGroup.destroyEach();
      score=score+2;
            alienGroup.destroyEach();
      laserGroup.destroyEach();
      sunGroup.destroyEach();
      obstaclesGroup.destroyEach();
}
   if (obstaclesGroup.isTouching(ship)) {
             gameState = END;
     gameOverSound.play();
     //backgroundImg1.velocityY = 0;
       //obstaclesGroup.destroyEach();
      //alienGroup.destroyEach();
      //laserGroup.destroyEach();
     }
  
  if (planetGroup.isTouching(ship)) {
    gameState = END;
    gameOverSound.play();
    //backgroundImg1.velocityY = 0;
    //planetGroup.destroyEach();
     // alienGroup.destroyEach();
     //laserGroup.destroyEach();
   }
 if (sunGroup.isTouching(ship)) {
    gameState = END;
   gameOverSound.play();
    //backgroundImg1.velocityY = 0;
    //planetGroup.destroyEach();
     // alienGroup.destroyEach();
     //laserGroup.destroyEach();
   }
  }
  
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;    
    backgroundImg1.velocityY = 0;
    obstaclesGroup.destroyEach();
      alienGroup.destroyEach();
      laserGroup.destroyEach();
    sunGroup.destroyEach();
      sunGroup.setLifetimeEach(-1);
    laserGroup.setLifetimeEach(-1);
    alienGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  
  drawSprites();
      fill("white")
textSize(23);
stroke("blue");
text("Score: "+ score, 500,50);

}
function spawnAlien() {
  var Alien = createSprite(350,Math.round(random(50, 200)), 10, 10);
  Alien.addImage(alienImg);
  Alien.velocityY = 3;
  Alien.lifetime = 150;
  Alien.scale = 0.2;
  alienGroup.add(Alien);
}
function spawnObstacles() {
obstacles = createSprite(260,Math.round(random(100, 340)), 10, 10);
  obstacles.addImage(rockImg);
  obstacles.velocityY = 3;
 obstacles.lifetime = 150;
  obstacles.scale = 0.2;
  obstaclesGroup.add(obstacles);
}
function spawnPlanet() {
  planet = createSprite(380,Math.round(random(80, 290)), 10, 10);
  planet.addImage(planetImg);
  planet.velocityY = 3;
planet.lifetime = 150;
  planet.scale = 0.2;
 planetGroup.add(planet);
}
function spawnSun() {
  sun = createSprite(420,Math.round(random(120, 410)), 10, 10);
  sun.addImage(sunImg);
  sun.velocityY = 3;
sun.lifetime = 150;
  sun.scale = 0.2;
 sunGroup.add(sun);
}
function createLaser() {
  laser= createSprite(100, 100, 60, 10);
  laser.addImage(laserImg);
  //laser.x = 360;
  laser.y=ship.y;
  laser.x=ship.x;
  laser.velocityY = -4;
  laser.lifetime = 100;
  laser.scale = 0.3;
  laserGroup.add(laser);
}
function reset() {
  
gameState = PLAY;

gameOver.visible = false;
restart.visible = false;
 
score = 0;
  
alienGroup.destroyEach();
obstaclesGroup.destroyEach();
planetGroup.destroyEach(); 
  sunGroup.destroyEach(); 
}