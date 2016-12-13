var Platformer = Platformer || {};

Platformer.Enemy = function(game, x, y, type, health, enemyBullets) {
  Phaser.Sprite.call(this, game, x, y, type);
  
//  this.game = game;

  this.animations.add('walk', [0, 1], 10, true);
//  this.enableBody = true;
  this.anchor.setTo(0.5);
  this.health = health;
  console.log(this)

  this.play('walk');
};

Platformer.Enemy.prototype = Object.create(Phaser.Sprite.prototype);  // create an object that is the same as sprite prototype
Platformer.Enemy.prototype.constructor = Platformer.Enemy; // when a new object is created Platformer.Enemy is called