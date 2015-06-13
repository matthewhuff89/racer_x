var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/background.jpg";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "images/Megaman.png";

// finish image
var finishReady = false;
var finishImage = new Image();
finishImage.onload = function () {
  finishReady = true;
};
finishImage.src = "images/finish.png";

// Game objects
var hero = {
  speed: 50 // movement in pixels per second
};
var finish = {};
var wins = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a finish
var reset = function () {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;

  // Throw the finish somewhere on the screen randomly
  finish.x = 32 + (Math.random() * (canvas.width - 64));
  finish.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update position of Megaman
var update = function (modifier) {
  if (38 in keysDown) { // Player holding up
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) { // Player holding down
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) { // Player holding left
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) { // Player holding right
    hero.x += hero.speed * modifier;
  }

  // Is megaman at the finish line?
  if (
    hero.x <= (finish.x + 32)
    && finish.x <= (hero.x + 32)
    && hero.y <= (finish.y + 32)
    && finish.y <= (hero.y + 32)
  ) {
    ++wins;
    ctx.fillText("YOU WON!", 50, 100);
    reset();
  }
};

// Draw everything
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }

  if (finishReady) {
    ctx.drawImage(finishImage, finish.x, finish.y);
  }

  // Score
  ctx.fillStyle = "purple";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Number of times you've won: " + wins, 32, 32);
};


// Where the game is played
// Time is in there for movement purposes
var main = function () {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  // Request to do this again ASAP
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
