var Platformer = Platformer || {};

Platformer.GameState = {
    create: function() {

//        function render() { // setup Debug - call renderGroup on each of the alive members      		     
//		 	    this.group.forEachAlive(renderGroup, this);
//		    }function renderGroup(member) {    
//          this.game.debug.body(member);
//        }

        
        // make background
        this.background = this.add.sprite(0, 0, 'sunrise');

//    		game.load.text('level', 'assets/data/level-1.json'); 			
				//parse the file
		this.levelData = JSON.parse(this.game.cache.getText('level'));

		console.log(this.levelData);			
			
        // make platforms group
        this.platforms = this.add.group();
        this.platforms.enableBody = true;
    
        // add platforms
        this.levelData.platformData.forEach(function(element){
            this.platforms.create(element.x, element.y, 'platform');
        }, this);
        this.game.physics.arcade.enable(this.platforms);
        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);        
			
        // make a ground
        this.ground = this.platforms.create(0, this.world.height-50, 'platform');
        this.game.physics.arcade.enable(this.ground);
        this.ground.body.allowGravity = false;        
        this.ground.body.immovable = true;
        this.ground.scale.setTo(2,2);
        
        
        // make player
        this.player  = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player');       
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.scale.setTo(1);
        this.player.anchor.setTo(0.5);
        this.player.body.setSize(34, 60, 11, 5);  // adjust the body of the sprite
        this.player.animations.add('shooting', [0, 1, 2, 1], 10, false);
        this.player.animations.add('walking', [3, 0, 4, 0], 10, false);
        this.player.direction = 'right';
        
        // make enemies
        this.enemies = this.add.group();
        this.levelData.enemyData.forEach(function(item){
//          console.log(item);
          var enemy = new Platformer.Enemy(this.game, item.x, item.y, item.boundary, 'redEnemy');
          this.enemies.add(enemy);
        }, this)
//        this.enemies.enableBody = true;
//				this.enemies.body.velocity.x = 200;
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
        this.game.debug.bodyInfo(this.player, 0, 20);
   },  
  
    update: function() {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.enemies, this.platforms);      
        
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
  }
}