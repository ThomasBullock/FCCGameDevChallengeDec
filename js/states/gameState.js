var Platformer = Platformer || {};

Platformer.GameState = {
    create: function() {

//        function render() { // setup Debug - call renderGroup on each of the alive members      		     
//		 	    this.group.forEachAlive(renderGroup, this);
//		    }function renderGroup(member) {    
//          this.game.debug.body(member);
//        }
		
				//parse the file
				this.levelData = JSON.parse(this.game.cache.getText('level'));
      
        this.enemyData = JSON.parse(this.game.cache.getText('enemyData'));

			  // make background from levelData
        this.background = this.add.sprite(0, 0, this.levelData[this.game.currentLevel].background);
				this.background.scale.setTo(1.59);
			
				console.log(this.enemyData);			
			
        // make platforms group
        this.platforms = this.add.group();
        this.platforms.enableBody = true;
    
        // add platforms
        this.levelData[this.game.currentLevel].platformData.forEach(function(element){
            this.platforms.create(element.x, element.y, element.size);
        }, this);
        this.game.physics.arcade.enable(this.platforms);
        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
        this.platforms.forEach(function(platform){
//            console.log(platform);
          platform.body.setSize(platform.width-24, 72, 12, 10);
        })
			
        // make a ground
        this.ground = this.platforms.create(-30, this.world.height-62, 'platform-large');
        this.game.physics.arcade.enable(this.ground);
        this.ground.body.allowGravity = false;        
        this.ground.body.immovable = true;
        this.ground.body.setSize(866, 72, 0, 10);
//        this.ground.scale.setTo(2,2);
        
				// make goal
				this.goal = this.add.sprite(this.levelData[this.game.currentLevel].goal.x, this.levelData[this.game.currentLevel].goal.y, 'sundae'); 
        this.game.physics.arcade.enable(this.goal);
				this.goal.body.allowGravity = false;
        
        // make player
        this.player  = this.add.sprite(this.levelData[this.game.currentLevel].playerStart.x, this.levelData[this.game.currentLevel].playerStart.y, 'player');       
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.scale.setTo(1);
        this.player.anchor.setTo(0.5);
        this.player.body.setSize(34, 60, 11, 5);  // adjust the body of the sprite
        this.player.animations.add('shooting', [0, 1, 2, 1], 10, false);
        this.player.animations.add('walking', [3, 0, 4, 0], 10, false);
        this.player.direction = 'right';
			  this.game.camera.follow(this.player);  
        
        // make enemies
        this.enemies = this.add.group();
        this.levelData[this.game.currentLevel].enemyData.forEach(function(item){
          var enemy = new Platformer.Enemy(this.game, item.x, item.y, item.boundary, item.type, 4);
          this.enemies.add(enemy);
        }, this);
        this.game.physics.arcade.enable(this.enemies);

        // make bubbles
        this.bubbles = this.add.group();
        this.bubbles.enableBody = true;
        this.bubbles.createMultiple(100, 'bubble');
        this.bubbles.setAll('body.allowGravity', false);
        this.bubbles.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBubble);
        this.bubbles.callAll('anchor.setTo', 'anchor', 0.5,0.5);
        this.bubbles.callAll('checkWorldBounds', true);

        // add spacekey event
        this.game.spaceKey.onDown.add(this.shootBubble, this);
    },
   render: function() { // allows us to see the body of objects
//      this.game.debug.body(this.player);
//      this.game.debug.body(this.platforms);  
//        this.platforms.forEach(function(platform) {
//          this.game.debug.body(platform);
//        }, this)
//      this.game.debug.bodyInfo(this.player, 0, 20);
   },  
  
    update: function() {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.enemies, this.platforms);

        // player touching enemies
        this.game.physics.arcade.overlap(this.player, this.enemies, this.playerAgainstEnemy, null, this);      
        
        // bubble touching enemies
        this.game.physics.arcade.overlap(this.bubbles, this.enemies, this.enemyAgainstBubble, null, this);
			
				// player reach goal
				this.game.physics.arcade.overlap(this.player, this.goal, this.levelComplete, null, this);

        this.player.body.velocity.x = 0;

        if(!this.player.body.touching.down) {
          this.player.frame = 2;
        }
                  
        if(this.game.cursors.right.isDown){
            this.player.scale.setTo(-1, 1);
            this.player.body.velocity.x = 250;
            this.player.play('walking');
            this.player.direction = 'right';
        } else if (this.game.cursors.left.isDown) {
            this.player.scale.setTo(1);
            this.player.play('walking');          
            this.player.body.velocity.x = -250;
            this.player.direction = 'left';
        }
        
        if(this.game.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -600;
        }
        
        
  },
  restart: function() {
      this.game.state.start('GameState');
  },
  shootBubble: function() {
      // animate player when shooting
      this.player.play('shooting');

      // display a bubble at player position
      // bubble's direction depends on player's direction
      var bubble = this.bubbles.getFirstExists(false);
      if(bubble) {
          bubble.reset(this.player.x, this.player.y + 8);
          bubble.body.velocity.x = this.player.direction === 'right' ? 750 : -750;
      }
  },
  resetBubble: function(bubble) {
      bubble.kill();
  },
  playerAgainstEnemy: function(player) {
      // make player disappear
      player.kill();
      // wait 2 seconds and restart level
      this.game.time.events.add(Phaser.Timer.SECOND * 2, this.restart, this);
  },
  enemyAgainstBubble: function(bubble, enemy) {
      bubble.kill();
//      enemy.kill();
			enemy.damage(1);
  },
	levelComplete: function() {
		console.log(this.game.currentLevel + ' complete');
		this.game.currentLevel++;
    this.game.state.start('GameState', true, false);
	}
}