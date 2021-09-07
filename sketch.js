//important matterJS variables
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world, body;

var board, die;
var bluePiece, blueSpaces, blueMoved;
var redPiece, redSpaces, redMoved;

function preload() {
  board = loadImage("sprites/bg.png");
}

function drawDie(x, y, side) {
  fill("white");
  strokeWeight(8);
  rectMode(CENTER);
  rect(x, y, 100, 100, 20);

  fill("black");
  strokeWeight(3);
  if (side === 1) {
    circle(x, y, 20);
  } else if (side === 2) {
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
  } else if (side === 3) {
    circle(x - 25, y - 25, 20);
    circle(x, y, 20);
    circle(x + 25, y + 25, 20);
  } else if (side === 4) {
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
  } else if (side === 5) {
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x, y, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
  } else if (side === 6) {
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
    circle(x - 25, y, 20);
    circle(x + 25, y, 20);
  }
}

function checkForBlueUpsAndDowns() {
  //ladders
  if (blueSpaces === 3) {
    Matter.Body.setVelocity(bluePiece.body, { x: 0, y: -22 });
    blueSpaces = 15;
  }
  if (blueSpaces === 8) {
    Matter.Body.setVelocity(bluePiece.body, { x: 10, y: -13 });
    blueSpaces = 18;
  }
  if (blueSpaces === 12) {
    Matter.Body.setVelocity(bluePiece.body, { x: 0, y: -22 });
    blueSpaces = 24;
  }
  if (blueSpaces === 16) {
    Matter.Body.setVelocity(bluePiece.body, { x: 0, y: -22 });
    blueSpaces = 28;
  }
  if (blueSpaces === 25) {
    Matter.Body.setVelocity(bluePiece.body, { x: 10, y: -13 });
    blueSpaces = 35;
  }
  if (blueSpaces === 30) {
    Matter.Body.setVelocity(bluePiece.body, { x: -10, y: -10 });
    blueSpaces = 32;
  }
}

function setup() {
  //create canvas
  createCanvas(600, 725);

  //setup
  engine = Engine.create();
  world = engine.world;

  //set gravity
  engine.world.gravity.y = 0;

  //create the die array
  die = [false, 1, 0, false, 0];

  //create the pieces
  bluePiece = new BluePiece(50, 550, 60, 60);
  blueSpaces = 1;
  blueMoved = false;
}

function draw() {
  //draw the background
  background(158, 113, 79);

  //update the engine
  Engine.update(engine);

  //draw the board
  image(board, 0, 0, 600, 600);

  //display the pieces
  bluePiece.display();

  //add a divider
  stroke("black");
  strokeWeight(8);

  line(0, 602.5, 600, 602.5);

  //draw die or make it blink or move it
  if (die[3] === false) {
    drawDie(525, 665, die[1]);
  } else {
    if (die[4] % 2 === 0) {
      drawDie(525, 665, die[1]);

      if (blueMoved === false && blueSpaces !== 36) {
        if (blueSpaces % 6 === 0) {
          bluePiece.moveUp();
        } else {
          var num = Math.floor(blueSpaces / 6);
          if (num === 0 || num === 2 || num === 4 || num === 6) {
            bluePiece.moveRight();
          } else {
            bluePiece.moveLeft();
          }
        }
        blueMoved = true;
        blueSpaces++;
        console.log(blueSpaces);
      }
    }

    if (frameCount % 15 === 0) {
      die[4]--;
      blueMoved = false;

      if (die[4] === 0) {
        die[3] = false;
        die[0] = false;
        checkForBlueUpsAndDowns();
      }
    }
  }

  //make the die roll
  if (die[0] === true && die[2] > 0 && frameCount % 5 === 0) {
    die[2]--;

    die[1]++;
    if (die[1] > 6) {
      die[1] = 1;
    }

    if (die[2] === 0) {
      die[3] = true;
      die[4] = die[1] * 2;
    }
  }
  if (blueSpaces >= 36) {
    keyPressed = false;
  }
}

function keyPressed() {
  if (keyCode === 32 && die[0] === false) {
    die[0] = true;
    die[2] = round(random(12, 18));
  }
}
