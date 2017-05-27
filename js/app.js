var game = {
    width: 505,
    height: 606,
    playerStartPositionX: 200,
    playerStartPositionY: 430,
    enemySpeed: 50
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
    this.x = (this.x + 100 + (game.enemySpeed * dt)) % (game.width + 150) - 100;
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
    this.speed = 50;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    if (this.y < 10) {
        this.x = game.playerStartPositionX;
        this.y = game.playerStartPositionY;
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
            this.x -= player.speed;
        }
    }
    if (keyCode === 'right') {
        if (player.x < game.width - 110) {
            this.x += player.speed;
        }
    }
    if (keyCode === 'up') {
        if (player.y > 0) {
            this.y -= player.speed;
        }
    }
    if (keyCode === 'down') {
        if (player.y < game.height - 200) {
            this.y += player.speed;
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
        allEnemies.push(new Enemy(Math.floor(Math.random() * x), y, speed));
    }
    pushToEnemiesArray(101, 53, 250);
    pushToEnemiesArray(505, 136, 200);
    pushToEnemiesArray(505, 219, 150);
    pushToEnemiesArray(505, 302, 100);
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