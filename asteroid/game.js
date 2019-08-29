// setup canvas
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var playerScore = document.getElementById("scores");
playerScore.innerHTML = "test";
var GameTile = /** @class */ (function () {
    function GameTile(imageURL) {
        this.isLoaded = false;
        this.image = new Image();
        this.image.src = imageURL;
    }
    return GameTile;
}());
;
var ship_tile = new GameTile("ship.png");
var asteroid_tile = new GameTile("asteroid.png");
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}
;
function notZero(n, min, max) {
    if (n == 0) {
        return notZero(random(min, max), min, max);
    }
    return n;
}
var VectorObject = /** @class */ (function () {
    function VectorObject(x, y, velX, velY, exists) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    }
    return VectorObject;
}());
;
var Asteroid = /** @class */ (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(_a) {
        var x = _a.x, y = _a.y, velX = _a.velX, velY = _a.velY, exists = _a.exists, size = _a.size;
        var _this_1 = _super.call(this, x, y, velX, velY, exists) || this;
        _this_1.size = size;
        return _this_1;
    }
    Asteroid.prototype.draw = function () {
        ctx.beginPath();
        ctx.drawImage(asteroid_tile.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        // For debugging
        //ctx.fillStyle = "green";
        //ctx.fillRect(this.x, this.y, 3, 3)
    };
    ;
    Asteroid.prototype.update = function () {
        if ((this.x - this.size / 2) >= width) {
            this.exists = false;
        }
        if ((this.x + this.size / 2) <= 0) {
            this.exists = false;
        }
        if ((this.y - this.size / 2) >= height) {
            this.exists = false;
        }
        if ((this.y + this.size / 2) <= 0) {
            this.exists = false;
        }
        this.x += this.velX;
        this.y += this.velY;
    };
    ;
    return Asteroid;
}(VectorObject));
;
var Ship = /** @class */ (function (_super) {
    __extends(Ship, _super);
    function Ship(_a) {
        var x = _a.x, y = _a.y, exists = _a.exists;
        var _this_1 = _super.call(this, x, y, 4, 4, exists) || this;
        _this_1.size = 30;
        return _this_1;
    }
    ;
    Ship.prototype.draw = function () {
        ctx.beginPath();
        ctx.drawImage(ship_tile.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        // For debugging
        //ctx.fillStyle = "green";
        //ctx.fillRect(this.x, this.y, 3, 3)
    };
    ;
    Ship.prototype.update = function () {
        // left
        if (this.direction == 1)
            this.x -= this.velX;
        // up
        if (this.direction == 2)
            this.y -= this.velY;
        // right
        if (this.direction == 3)
            this.x += this.velX;
        // down
        if (this.direction == 4)
            this.y += this.velY;
        // if we hit a wall, stop
        if ((this.x + this.size / 2) >= width) {
            this.x = width - this.size / 2 - 1;
            this.direction = 0; // stop
        }
        if ((this.x - this.size / 2) <= 0) {
            this.x = this.size / 2 + 1;
            this.direction = 0; // stop
        }
        if ((this.y + this.size / 2) >= height) {
            this.y = height - this.size / 2 - 1;
            this.direction = 0; // stop
        }
        if ((this.y - this.size / 2) <= 0) {
            this.y = this.size / 2 + 1;
            this.direction = 0; // stop
        }
    };
    ;
    Ship.prototype.setControls = function () {
        var _this = this;
        window.onkeydown = function (e) {
            // 65 = a, 37 = left arrow
            if (e.keyCode === 65 || e.keyCode === 37) {
                _this.direction = 1;
            }
            // 87 = w, 38 = up arrow
            else if (e.keyCode === 87 || e.keyCode === 38) {
                _this.direction = 2;
            }
            // 68 = d, 39 = right arrow
            else if (e.keyCode === 68 || e.keyCode === 39) {
                _this.direction = 3;
            }
            // 83 = s, 40 = down arrow
            else if (e.keyCode === 83 || e.keyCode === 40) {
                _this.direction = 4;
            }
        };
    };
    ;
    Ship.prototype.collisionDetect = function (asteroids) {
        for (var j = 0; j < asteroids.length; j++) {
            if (asteroids[j].exists) {
                var dx = this.x - asteroids[j].x;
                var dy = this.y - asteroids[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.size / 2 + asteroids[j].size / 2) {
                    this.exists = false;
                }
            }
        }
    };
    ;
    return Ship;
}(VectorObject));
var asteroids = [];
while (asteroids.length < 10) {
    var sizes = [50, 100, 150];
    var size = sizes[random(0, 3)];
    var ast = new Asteroid({ x: random(0 + size, width - size), y: random(0 + size, height - size), velX: notZero(random(-3, 3), -3, 3), velY: notZero(random(-3, 3), -3, 3), exists: true, size: size });
    asteroids.push(ast);
}
var player = new Ship({ x: random(0 + 30, width - 30), y: random(0 + 30, height - 30), exists: true });
player.setControls();
function gameLoop(timestamp) {
    ctx.fillStyle = 'rgba(54,53,87,0.5)';
    ctx.fillRect(0, 0, width, height);
    for (var i = 0; i < asteroids.length; i++) {
        if (asteroids[i].exists) {
            asteroids[i].draw();
            asteroids[i].update();
        }
    }
    ;
    if (player.exists) {
        player.draw();
        player.update();
        player.collisionDetect(asteroids);
    }
    requestAnimationFrame(gameLoop);
}
;
requestAnimationFrame(gameLoop);
//# sourceMappingURL=game.js.map