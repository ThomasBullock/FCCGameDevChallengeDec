var Platformer = Platformer || {};

Platformer.GameState = {
    create: function() {

//        function render() { // setup Debug - call renderGroup on each of the alive members      		     
//		 	    this.group.forEachAlive(renderGroup, this);
//		    }function renderGroup(member) {    
//          this.game.debug.body(member);
//        }

        
        // make background
        this.sky = this.add.sprite(0, 0, 'sky');

//    		game.load.text('level', 'assets/data/level-1.json'); 			
				//parse the file
				this.levelData = JSON.parse(this.game.cache.getText('level'));

				console.log(this.levelData);			
			
        // make platforms group
        this.platforms = this.add.group();
        this.platforms.enableBody = true;
    

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
        
        // make ledges
//        this.ledge = this.platforms.create(400,400, 'platform');
//        this.ledge.body.immovable = true;
//        this.ledge = this.platforms.create(-150, 250, 'platform');
//        this.ledge.body.immovable = true;
//        this.ledge = this.platforms.create(400, 100, 'platform');
//        this.ledge.body.immovable = true;
        
        // make player
        this.player  = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player');
//        this.player  = this.add.sprite(0, 0, 'player');        
        this.game.physics.arcade.enable(this.player);
//        this.player.body.gravity.y = 600;
        this.player.body.collideWorldBounds = true;
        this.player.scale.setTo(1);
        this.player.anchor.setTo(0.5);
        this.player.body.setSize(34, 60, 11, 5);  // adjust the body of the sprite
        this.player.animations.add('shooting', [0, 1, 2, 1], 10, false);
        this.player.animations.add('walking', [3, 0, 4, 0], 10, false);
    
    
    },
//    render: function() { // allows us to see the body of objects
//      this.game.debug.body(this.player);
//    },  
  
    update: function() {
        this.game.physics.arcade.collide(this.player, this.platforms);
        
        this.player.body.velocity.x = 0;

        if(!this.player.body.touching.down) {
          this.player.frame = 2;
        }
         
          
        if(this.game.cursors.right.isDown){
            this.player.scale.setTo(-1, 1);
            this.player.body.velocity.x = 250;
            this.player.play('walking');
        } else if (this.game.cursors.left.isDown) {
            this.player.scale.setTo(1);
            this.player.play('walking');          
            this.player.body.velocity.x = -250;
        }
        
        if(this.game.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -600;
        }
      
        if(this.game.spaceKey.isDown) {
          this.shoot();
        }
        
    },
  shoot: function() {
    this.player.play('shooting');
  }
}