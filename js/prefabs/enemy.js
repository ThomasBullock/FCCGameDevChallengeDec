var Platformer = Platformer || {};

Platformer.Enemy = function(game, x, y, boundary, type, health, enemyBullets) {
  Phaser.Sprite.call(this, game, x, y, type);
  
//  this.game = game;

  this.animations.add('walk', [0, 1, 2, 1], 5, true);
	this.animations.add('getHit', [3, 1], 5, false);
	
  this.enableBody = true;
  this.game.physics.arcade.enable(this);	
  this.anchor.setTo(0.5);
//	this.leftLimit = boundary.left;
//	this.rightLimit = boundary.right;
//	this.enableBody = true;
	this.body.velocity.x = -50;

	
//  	//custom properties
//  	this.pet.customParams = {health: 100, fun: 100};
	this.customParams = {leftLimit: boundary.left, rightLimit: boundary.right, direction: -1};
  this.health = health;
  console.log(this)

  this.play('walk');
};

Platformer.Enemy.prototype = Object.create(Phaser.Sprite.prototype);  // create an object that is the same as sprite prototype
Platformer.Enemy.prototype.constructor = Platformer.Enemy; // when a new object is created Platformer.Enemy is called

Platformer.Enemy.prototype.update = function() {

	if(this.x < this.customParams.leftLimit) {
		this.x = this.customParams.leftLimit+2;
		this.body.velocity.x *= -1;
		this.scale.setTo(-1, 1);
	}
	if (this.x > this.customParams.rightLimit) {
		this.x = this.customParams.rightLimit-2;
		this.body.velocity.x *= -1;
		this.scale.setTo(1, 1);
	}
}
Platformer.Enemy.prototype.damage = function(amount) {
	Phaser.Sprite.prototype.damage.call(this, amount);
	console.log(this.health);
	this.play('getHit');
	this.animations.currentAnim.onComplete.add(function () {	
		this.play('walk');
	}, this);
	this.health--;
	
	if(this.health <= 0) {
		this.kill();
	}
}