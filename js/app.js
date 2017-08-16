'use strict';

//Game object with original stats of the game.
var game = {
    width: 505,
    height: 606,
    playerStartPositionX: 200,
    playerStartPositionY: 400,
    isGameStarted: false,
    lifes: 3,
    score: 0,
    gemCollected: 0
};

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (game.isGameStarted) {
        this.x = (this.x + 100 + (this.speed * dt)) % (game.width + 150) - 100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if (game.isGameStarted) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = game.playerStartPositionX;
    this.y = game.playerStartPositionY;
    this.sprite = 'images/char-boy.png';
    this.reset = function() {
        this.x = game.playerStartPositionX;
        this.y = game.playerStartPositionY;
    };
};

//The Player update() method updates the player position and handles collision with enemy.
Player.prototype.update = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if ((this.x < allEnemies[i].x + 50 &&
                this.x > allEnemies[i].x - 50) &&
            this.y < allEnemies[i].y + 45 &&
            this.y > allEnemies[i].y - 45) {
            if (game.lifes > 1) {
                game.lifes -= 1;
                this.reset();
            } else {
                game.lifes = 0;
                game.isGameStarted = false;
                document.querySelector('.gameOver').style.display = 'block';
            }
        }
    };
};

//Draw the player on the screen.
Player.prototype.render = function() {
    if (game.isGameStarted) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'spacebar') {
      game.isGameStarted = true;
      document.querySelector('.gameStart').style.display = 'none';
      ctx.clearRect(1, 1, game.width, game.height);
    }
    if (keyCode === 'left') {
        if (this.x > 0) {
            this.x -= 101;
        }
    }
    if (keyCode === 'right') {
        if (this.x < game.width - 110) {
            this.x += 101;
        }
    }
    if (keyCode === 'up') {
        if (this.y > 55) {
            this.y -= 81;
        } else {
            game.score += 10;
            this.reset();
        }
    }
    if (keyCode === 'down') {
        if (this.y < game.height - 230) {
            this.y += 80;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

//Creates the enemies and populates the allEnemies array.
(function createEnemies() {
    function pushToEnemiesArray(x, y, speed) {
        allEnemies.push(new Enemy(x, y, speed));
    }
    pushToEnemiesArray(101, 53, 250);
    pushToEnemiesArray(505, 136, 100);
    pushToEnemiesArray(505, 219, 150);
    pushToEnemiesArray(505, 302, 200);
})();

//Gem that the player must collect.
var Gem = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/Star.png';
};

Gem.prototype.update = function() {
  //Checks if the player collected the star.
  if ((player.x < this.x + 50 &&
          player.x > this.x - 50) &&
      player.y < this.y + 45 &&
      player.y > this.y - 45) {
        if (game.gemCollected === 5) {
          game.isGameStarted = false;
          document.querySelector('.youWon').style.display = 'block';
        } else {
          game.gemCollected += 1;
          game.score += 50;
          this.gemReset();
        }
  }
};

//Creates the new gem after the player collected the previous one.
Gem.prototype.gemReset = function() {
  if (game.gemCollected === 1) {
    this.x = 205;
    this.y = 240;
  } else if (game.gemCollected === 2) {
    this.x = 415;
    this.y = 70;
  } else if (game.gemCollected === 3) {
    this.x = 0;
    this.y = 325;
  } else if (game.gemCollected === 4) {
    this.x = 415;
    this.y = 155;
  }
};

//Draw  the gem on the screen
Gem.prototype.render = function() {
    if (game.isGameStarted) {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

//Creates the first gem.
var allGems = new Gem(100, 70);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'spacebar'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
