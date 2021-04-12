//for all var
var path,
      mainCyclist,
      cycleBell,
      pinkCG,
      yellowCG,
      redCG,
      bellSound,
      gameOver,
      red1,
      yellow,
      pink,
      obs1,
      obs2,
      obs3,
      obs1G,
      obs2G,
      obs3G;

var pathImg,
    mainRacerImg1,
    mainRacerImg2,
    obstacle1,
    obstacle2,
    obstacle3,
    gameOverImage,
    pinkOpponentIMG1,
    pinkOpponentIMG2,
    yellowOpponentIMG1,
    yellowOpponentIMG2,
    redOpponentIMG1,
    redOpponentIMG2;

  var END =0;

  var PLAY =1;

  var gameState = PLAY;

  var distance;

function preload(){
  //to load everything
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  pinkOpponentIMG1 = loadAnimation("opponent1.png","opponent2.png");
  pinkOpponentIMG2 = loadAnimation("opponent3.png");
  yellowOpponentIMG1 = loadAnimation("opponent4.png","opponent5.png");
  yellowOpponentIMG2 = loadAnimation("opponent6.png");
  redOpponentIMG1 = loadAnimation("opponent7.png","opponent8.png");
  redOpponentIMG2 = loadAnimation("opponent9.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  gameOverImage = loadImage("gameOver.png");
  
  bellSound = loadSound("sound/bell.mp3");
}

function setup(){
  
  createCanvas(displayWidth,displayHeight);
  // Moving background
  path=createSprite(displayWidth/2,displayHeight/2);
  path.addImage(pathImg);
  path.scale=0.5
  path.velocityX = -5;

  //to create boy cycling
  mainCyclist  = createSprite(70,150,20,20);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.addAnimation("fellDown",mainRacerImg2);
  mainCyclist.scale=0.07;
  mainCyclist.debug = true;
  
 
  //for the lose window    
  gameOver = createSprite(displayWidth/2,displayHeight/2);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.8;
  
  gameOver.visible = false;
  // all the groups
  obs1G = createGroup();
  obs2G = createGroup();
  obs3G = createGroup();
  pinkCG = createGroup();
  yellowCG = createGroup();
  redCG = createGroup();
 
  mainCyclist.setCollider("rectangle",0,0,1100,1500);
  
  distance = 0;
}

function draw() {
  background ("grey");
  
  drawSprites();
  //to make the play state
if(gameState === PLAY){
  
  mainCyclist.y = World.mouseY;
  
  distance = distance+Math.round(getFrameRate()/53);
    
  path.velocityX = -(4 + 2*distance/150);
  
  edges = createEdgeSprites();
  mainCyclist.collide(edges);
  
  //infinite background
if(path.x < 0 ){
  path.x = width/2;
}
    
if (mainCyclist.isTouching(pinkCG)){
  gameState = END;
  pink.changeAnimation("fellDown1");
}
  
if (mainCyclist.isTouching(redCG)){
  gameState = END;
  red1.changeAnimation("fellDown21");
}
  
if (mainCyclist.isTouching(yellowCG)){
  gameState = END;
  yellow.changeAnimation("fellDown3");
}
    
if (mainCyclist.isTouching(obs1G)){
  gameState = END;
}
  
if (mainCyclist.isTouching(obs2G)){
  gameState = END;
}
  
if (mainCyclist.isTouching(obs3G)){
  gameState = END;
}
    
    
var select_players = Math.round(random(1,6));
  
if (frameCount % 150 === 0) {
    
if (select_players === 1) {
  pinkCyclist(); 
}
  
if (select_players === 2) {
  redCyclist(); 
}
  
if (select_players === 3) {
  yellowCyclist(); 
}
  
if (select_players === 4){
  Obstacle1(); 
}
  
if (select_players === 5){
  Obstacle2(); 
}
  
if (select_players === 6){
  Obstacle3(); 
}
      
}
    
if (keyDown("space")){
  bellSound.play();
}
  
}
// to create end state
else if (gameState === END){
    
  gameOver.visible = true;
    
  text("Press space key to Restart the Game",displayWidth/2-100,displayHeight/2+40);
  textSize(20);
    
   obs1G.destroyEach();
  obs2G.destroyEach();
  obs3G.destroyEach();
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  path.velocityX = 0;
  mainCyclist.velocityX = 0;
     
  mainCyclist.changeAnimation("fellDown");  
  
  
  //reset function
  
if (keyDown("space")) {
  reset();
}
    
  obs1G.setLifetimeEach(-1);
  obs2G.setLifetimeEach(-1);
  obs3G.setLifetimeEach(-1);
 
  obs3G.setVelocityXEach(0);
  obs1G.setVelocityXEach(0);
  obs2G.setVelocityXEach(0);

  pinkCG.setLifetimeEach(-1);
  yellowCG.setLifetimeEach(-1);
  redCG.setLifetimeEach(-1);
  
  redCG.setVelocityXEach(0);
  pinkCG.setVelocityXEach(0);
  yellowCG.setVelocityXEach(0);

}
  
  textSize(20);
  fill(355);
  text("Distance: "+ distance,650,30);
  
 textSize(20);
  fill(355);
  text("by pushkar / omkar",displayWidth/2,displayHeight-20/2);

  movingBalls();
}


//all of the rest is function 
function pinkCyclist(){
  
  pink = createSprite(750,Math.round(random(50,250),10,10));
  pink.scale = 0.06;
  pink.addAnimation("Player1",pinkOpponentIMG1);
  pink.addAnimation("fellDown1",pinkOpponentIMG2);
  pink.setLifetime = 1;
  pink.velocityX = -(2 + 2*distance/150);
  pinkCG.add(pink);
}

function redCyclist(){
  
  red1 = createSprite(750,Math.round(random(50,250),10,10));
  red1.scale = 0.06;
  red1.addAnimation("Player2",redOpponentIMG1);
  red1.addAnimation("fellDown21",redOpponentIMG2);
  red1.setLifetime = 1;
  red1.velocityX = -(2 + 2*distance/150);
  redCG.add(red1);
}

function yellowCyclist(){
  
  yellow = createSprite(750,Math.round(random(50,250),10,10));
  yellow.scale = 0.06;
  yellow.addAnimation("Player3",yellowOpponentIMG1);
  yellow.addAnimation("fellDown3",yellowOpponentIMG2);
  yellow.setLifetime = 1;
  yellow.velocityX = -(2 + 2*distance/150);
  yellowCG.add(yellow);
}

function Obstacle1(){
  
  obs1 = createSprite(750,Math.round(random(50,250),10,10));
  obs1.scale = 0.1;
  obs1.addImage(obstacle1);
  obs1.setLifetime = 1;
  obs1.velocityX = -(2 + 2*distance/150);
  obs1G.add(obs1);
}

function Obstacle2(){
  
  obs2 = createSprite(750,Math.round(random(50,250),10,10));
  obs2.scale = 0.1;
  obs2.addImage(obstacle2);
  obs2.setLifetime = 1;
  obs2.velocityX = -(2 + 2*distance/150);
  obs2G.add(obs2);
}
  
function Obstacle3(){  
  
  obs3 = createSprite(750,Math.round(random(50,250),10,10));
  obs3.scale = 0.1;
  obs3.addImage(obstacle3);
  obs3.setLifetime = 1;
  obs3.velocityX = -1;
  obs3.velocityX = -(2 + 2*distance/150);
  obs3G.add(obs3);
}


function reset(){
  
  gameState = PLAY;
  mainCyclist.changeAnimation("SahilRunning");
  gameOver.visible = false;
  obs1G.destroyEach();
  obs2G.destroyEach();
  obs3G.destroyEach();
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  distance = 0;
}

function movingBalls(){

  camera.position.x=mainCyclist.x
 camera.position.y=mainCyclist.y

}