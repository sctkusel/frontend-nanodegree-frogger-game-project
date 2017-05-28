var game = {
    width: 505,
    height: 606,
    playerStartPositionX: 200,
    playerStartPositionY: 400,
    enemySize: 50,
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
    this.x = (this.x + 100 + (this.speed * dt)) % (game.width + 150) - 100;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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

Player.prototype.update = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if ((this.x < allEnemies[i].x + 50 &&
                this.x > allEnemies[i].x - 50) &&
            this.y < allEnemies[i].y + 45 &&
            this.y > allEnemies[i].y - 45) {
            this.reset();
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'spacebar') {

    }
    if (keyCode === 'left') {
        if (player.x > 0) {
            this.x -= 101;
        }
    }
    if (keyCode === 'right') {
        if (player.x < game.width - 110) {
            this.x += 101;
        }
    }
    if (keyCode === 'up') {
        if (player.y > 55) {
            this.y -= 82;
        } else {
            this.reset();
        }
    }
    if (keyCode === 'down') {
        if (player.y < game.height - 230) {
            this.y += 85;
        }
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

(function createEnemies() {
    function pushToEnemiesArray(x, y, speed) {
        allEnemies.push(new Enemy(x, y, speed));
    }
    pushToEnemiesArray(101, 53, 250);
    pushToEnemiesArray(505, 136, 100);
    pushToEnemiesArray(505, 219, 150);
    pushToEnemiesArray(505, 302, 200);
})();


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