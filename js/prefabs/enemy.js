var Platformer = Platformer || {};

Platformer.Enemy = function(game, x, y, boundary, type, health, enemyBullets) {
  Phaser.Sprite.call(this, game, x, y, type);
  
//  this.game = game;
//  this.enemyData = JSON.parse(this.game.cache.getText('enemy'));
//  console.log(Platformer.GameState.enemyData[type]);
  
  var typeData = Platformer.GameState.enemyData[type];
  
//	console.log(type);
  this.animations.add('walk', [0, 1, 2, 1], typeData.frameRate, true);
	this.animations.add('getHit', [3, 1], typeData.frameRate, false);
	
  this.enableBody = true;
  
  this.game.physics.arcade.enable(this);	    


  this.anchor.setTo(0.5);
//	this.leftLimit = boundary.left;
//	this.rightLimit = boundary.right;
//	this.enableBody = true;


	
//  	//custom properties
//  	this.pet.customParams = {health: 100, fun: 100};
	this.customParams = {min: boundary.min, max: boundary.max, direction: -1};
  this.axis = typeData.axis;
  this.health = typeData.health;
//  console.log(this)
	this.body.velocity[this.axis] = typeData.speed;
  
  if(type === 'mossie') {
    this.body.allowGravity = false;
  }
  
  console.log(this.body.velocity);
  
  this.play('walk');
  console.log(this);
};

Platformer.Enemy.prototype = Object.create(Phaser.Sprite.prototype);  // create an object that is the same as sprite prototype
Platformer.Enemy.prototype.constructor = Platformer.Enemy; // when a new object is created Platformer.Enemy is called

Platformer.Enemy.prototype.update = function() {

	if(this[this.axis] < this.customParams.min) {
		this[this.axis] = this.customParams.min+2;
		this.body.velocity[this.axis] *= -1;
		this.scale.setTo(-1, 1);
	}
	if(this[this.axis] > this.customParams.max) {
		this[this.axis] = this.customParams.max-2;
		this.body.velocity[this.axis] *= -1;
		this.scale.setTo(1, 1);
	}
  
//  if(this[this.axis] <= this.customParams.max ) {
//
//     this.body.velocity[this.axis] *= -1;
//     this.scale.setTo(-1, 1);
//     this[this.axis] = this.customParams.max
//  }
//  
//  
//  if(this[this.axis] >= this.customParams.min ) {
//
//     this.body.velocity[this.axis] *= -1;
//     this.scale.setTo(1, 1);
//     this[this.axis] = this.customParams.min
//  }  
  
  
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