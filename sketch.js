var PLAY = 1; 
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var Cactus, o1, o2, o3, o4, o5, o6, obstaclesGroup;

var Score;
//no sé para qué es
var newImage;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");

}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);

  //Animación de cuando muere el trex
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //crear grupos de obstáculos y nubes
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hola" + 5);
  
  //trex.setCollider("circle",0,0,40);
  //trex.debug = true;
  
  Score = 0;
  
}

function draw() {
  
  background(180);
  //mostrar la puntuación
  text("Score: "+ Score, 510,30);
  
  console.log("esto es ",gameState)
  
  if(gameState === PLAY){

    //mover el suelo
    ground.velocityX = -4;
    //puntuación
    //Score = Score + Math.round(frameCount/5);
    
    //puntuación ESTABA MAL POSICIONADA
    Score = Math.round(frameCount/5);

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //hacer que el Trex salte al presionar la barra espaciadora
    if(keyDown("space")&& trex.y >= 160) {
        trex.velocityY = -13;
    }
    
    //agregar gravedad
    trex.velocityY = trex.velocityY + 0.8;
  
    //aparecer nubes
    spawnClouds();
  
    //aparecer obstáculos en el suelo
    spamCactus();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      console.log("hey");

      ground.velocityX = 0;
     
      //cambiar la animación del Trex
      trex.changeAnimation("collided", trex_collided);

      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
     
      //establecer Lifetime (ciclo de vida) de los objetos del juego para que no sean destruidos nunca
      //obstaclesGroup.setLifetimeEach(-134);
      //cloudsGroup.setLifetimeEach(-134);
     
   }
  
  //evitar que el Trex caiga
  trex.collide(invisibleGround);
  
  //sprites
  drawSprites();
}

function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
     //asignar lifetime (ciclo de vida) a la variable
    cloud.lifetime = 134;
    
    //ajustar la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //agregar nube al grupo
   cloudsGroup.add(cloud);
    }
}

function spamCactus(){
  if (frameCount % 60 === 0){
    Cactus= createSprite(600,160,20,20);
    Cactus.velocityX = -4;
    
     //generar obstáculos al azar
     var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: Cactus.addImage(o1);
              break;

      case 2: Cactus.addImage(o2);
              break;

      case 3: Cactus.addImage(o3);
              break;
              
      case 4: Cactus.addImage(o4);
              break;

      case 5: Cactus.addImage(o5);
              break;

      case 6: Cactus.addImage(o6);
              break;

      default: break;
    }

    
     //asignar escala y ciclo de vida al obstáculo          
    Cactus.scale = 0.5;

    //no tenías linea de vida
    Cactus.lifetime = 300;
   
   //agregar cada obstáculo al grupo
    obstaclesGroup.add(Cactus);

  }
 }





