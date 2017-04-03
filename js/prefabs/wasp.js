var Platformer = Platformer || {};

Platformer.Wasp = function(game, x, y, boundary, type, health, enemyBullets, player) {
	console.log(type);
  Phaser.Sprite.call(this, game, x, y, type);
  console.log(player);
  this.game.physics.arcade.enable(this);	    
  this.anchor.setTo(0.5);
  this.health = 5;

  this.customParams = {};
  this.customParams.player = player;
  this.animations.add('walk', [0, 1, 2, 3, 2, 1], 25, true);

    this.play('walk');

  this.body.allowGravity = false;
  this.body.velocity.y = 5;
  console.log(this);

  this.play('walk');  
}

Platformer.Wasp.prototype = Object.create(Phaser.Sprite.prototype);  // create an object that is the same as sprite prototype
Platformer.Wasp.prototype.constructor = Platformer.Wasp; // when a new object is created Platformer.Wasp is called


Platformer.Wasp.prototype.update = function() {

	// if(this[this.axis] < this.customParams.min) {
	// 	this[this.axis] = this.customParams.min+2;
	// 	this.body.velocity[this.axis] *= -1;
	// 	this.scale.setTo(-1, 1);
	// }
	// if(this[this.axis] > this.customParams.max) {
	// 	this[this.axis] = this.customParams.max-2;
	// 	this.body.velocity[this.axis] *= -1;
	// 	this.scale.setTo(1, 1);
		
		console.log(this.customParams.player);
		if(this.x > this.customParams.player.x) {
			this.body.velocity.x -= 1;
			this.scale.setTo(-1, 1);
		} else if (this.x < this.customParams.player.x) {;
			this.body.velocity.x += 1;
			this.scale.setTo(1, 1);			
		}
  
	}

	Platformer.Wasp.prototype.damage = function(amount) {
	Phaser.Sprite.prototype.damage.call(this, amount);
	console.log(this.health);
	// this.play('getHit');
	// this.animations.currentAnim.onComplete.add(function () {	
	// 	this.play('walk');
	// }, this);
	this.health--;
	
	if(this.health <= 0) {
		this.kill();
		this.destroy();
	}
}