// setup canvas
// TODO: (Jonathan) Fix asteroid physics. 
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var pScores = document.getElementById("scores");
pScores.innerHTML = "test";

class GameTile
{
	constructor(imageURL, hitRadius) {
		this.isLoaded = false;
		this.hitRadius = hitRadius;

		this.image = new Image();
		this.image.src = imageURL;
	}

}


var ship = new GameTile("ship.png", 25);
var shipThrust1 = new GameTile("shipthrust1.png", 25);
var shipThrust2 = new GameTile("shipthrust2.png", 25);
var asteroidLarge = new GameTile("asteroid_large.png", 50);


// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

class Item {
  constructor(x, y, exists){
    this.x = x;
    this.y = y;
    this.exists = exists;
  }
}

class PowerUp extends Item {
  constructor(x, y, size, exists){
    super(x, y, exists);
    this.size = size;
  }

  draw() {
    ctx.beginPath()
    ctx.fillRect(this.x, this.y, this.size, this.size);
  };

  update() {
    // white
    setTimeout(function() {ctx.fillStyle = "#FFFFFF";}, 2000);
    // gold
    setTimeout(function() {ctx.fillStyle = "#FFC300";}, 2000);
    // orange
    setTimeout(function() {ctx.fillStyle = "#E39D3D";}, 2000);
  };

  collisionDetect(enemy){
    var dx = this.x - enemy.x;
    var dy = this.y - enemy.y;
    var distance = Math.sqrt(dx * dx + dy *dy);
    if (distance < this.size + enemy.size){
      this.exists = false;
      enemy.PowerUp(true);
      // Power up will last 7 seconds.
      setTimeout(function() {enemy.PowerUp(false);}, 7000)
    }
  };
}

class Shape {
	constructor(x, y, velX, velY, exists) {
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
		this.exists = exists;
	}

}
class Asteroid extends Shape {
	constructor(x, y, velX, velY, size, exists) {
		super(x, y, velX, velY, exists);

		this.size = size;
	}


	draw() {
		ctx.beginPath();
		ctx.drawImage(asteroidLarge.image, this.x - asteroidLarge.image.width / 2,
			this.x - asteroidLarge.image.width / 2, this.size, this.size);
	};

	update() {
		if((this.x + this.size) >= width) {
			this.velX = -(this.velX);
		}

		if((this.x - this.size) <= 0) {
			this.velX = -(this.velX);
		}

		if((this.y + this.size) >= height) {
			this.velY = -(this.velY);
		}

		if((this.y - this.size) <= 0) {
			this.velY = -(this.velY);
		}

		this.x += this.velX;
		this.y += this.velY;
	};

	// collisionDetect(asteroids) {
	// 	for(var j = 0; j < asteroids.length; j++) {
	// 		if(this !== asteroids[j] && asteroids[j].exists) {
	// 			var dx = this.x - asteroids[j].x;
	// 			var dy = this.y - asteroids[j].y;
	// 			var distance = Math.sqrt(dx * dx + dy * dy);
	//
	// 			if (distance < this.size + asteroids[j].size) {
	// 				asteroids[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
	// 			}
	// 		}
	// 	}
	// };
}

class EnemyCircle extends Shape {
	constructor(x, y) {
		super(x, y, 4, 4, true);

		this.color = 'white';
		this.size = 30;
	}


	draw() {
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = this.color;
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ctx.stroke();

		ctx.drawImage(ship.image, this.x - ship.image.width / 2, this.y - ship.image.height / 2);
	};

  PowerUp(powerup) {
    // 2x speed for power-up
    if (powerup){
      this.color = 'yellow';
      this.velX *= 2;
      this.velY *= 2;
    }

    else {
      this.color = 'white';
      this.velX /= 2;
      this.velY /= 2;
    }
  };

	update() {
		// left
		if (direction == 1)
			this.x -= this.velX;

		// up
		if (direction == 2)
			this.y -= this.velY;

		// right
		if (direction == 3)
			this.x += this.velX;

		// down
		if (direction == 4)
			this.y += this.velY;

		// if we hit a wall, stop

		if((this.x + this.size) >= width) {
			this.x = width - this.size - 1;
			direction = 0; // stop
		}

		if((this.x - this.size) <= 0) {
			this.x = this.size + 1;
			direction = 0; // stop
		}

		if((this.y + this.size) >= height) {
			this.y = height - this.size - 1;
			direction = 0; // stop
		}

		if((this.y - this.size) <= 0) {
			this.y = this.size + 1;
			direction = 0; // stop
		}

	};


	setControls() {
		var _this = this;
		window.onkeydown = function(e) {
			// 65 = a, 37 = left arrow
			if (e.keyCode === 65 || e.keyCode === 37) {
				direction = 1;
			}
			// 87 = w, 38 = up arrow
			else if (e.keyCode === 87 || e.keyCode === 38) {
				direction = 2;
			}
			// 68 = d, 39 = right arrow
			else if (e.keyCode === 68 || e.keyCode === 39) {
				direction = 3;
			}
			// 83 = s, 40 = down arrow
			else if (e.keyCode === 83 || e.keyCode === 40) {
				direction = 4;
			}
		}
	}

	collisionDetect(asteroids) {
		for(var j = 0; j < asteroids.length; j++) {
			if(asteroids[j].exists) {
				var dx = this.x - asteroids[j].x;
				var dy = this.y - asteroids[j].y;
				var distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < this.size + asteroids[j].size) {
					this.exists = false;
				}
			}
		}
	};

}

	// 0 = stop - this will happen if you run into a wall
	// 1 = left
	// 2 = up
	// 3 = right
	// 4 = down
	var direction=0;

// define array to store asteroids and populate it

var asteroids = [];

// define array to store power-ups and populate it

var power_ups = [];

while(asteroids.length < 5) {
	sizes = [50, 100, 150, 200]
	var size = sizes[random(0, 4)];

	var asteroid = new Asteroid(
		// asteroid position always drawn at least one asteroid width
		// away from the adge of the canvas, to avoid drawing errors
		random(0 + size,width - size),
		random(0 + size,height - size),
		random(-7,7),
		random(-7,7),
		size,
		true
	);
	asteroids.push(asteroid);
}

while(power_ups.length <= 5 ){
  var power_up = new PowerUp(
    random(10, width - 10),
    random(10, height - 10),
    10, // size is 10px for a power up
    true);
    power_ups.push(power_up);
}

var enemy = new EnemyCircle(
		random(0 + size,width - size),
		random(0 + size,height - size)
	);

enemy.setControls();

// define loop that keeps drawing the scene constantly
function loop(timestamp) {
	var numberDead = 0;
	ctx.fillStyle = 'rgba(0,0,0,0.25)';
	ctx.fillRect(0,0,width,height);

	for(var i = 0; i < asteroids.length; i++) {
		if (asteroids[i].exists) {
			asteroids[i].draw();
			asteroids[i].update();
		}
		else
		{
			numberDead += 1;
		}
	}

	for(var i = 0; i < power_ups.length; i++) {
		if (power_ups[i].exists){
		power_ups[i].draw();
		power_ups[i].collisionDetect(enemy);
		}
	}


	pScores.innerHTML = "Score: " + numberDead;
	enemy.draw();
	enemy.update();
	enemy.collisionDetect(asteroids);

	// This method will aim for 60 fps depending on your monitor refresh rate,
	// and is always called before the next buffer drawn in the browser.
	// This is a special method optimized for animations.
	// The method will not run if the canvas is offscreen (I'll need to verify).
	// Can be cancelled using cancelAnimationFrame()
	requestAnimationFrame(loop);
}



loop();
