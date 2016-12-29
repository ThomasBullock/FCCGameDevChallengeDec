var Platformer = Platformer || {};

Platformer.PreloadState = {   
    preload: function(){
        // load images and spritesheets
        this.load.spritesheet('player', 'assets/img/player-spritesheet.png', 60, 70, 5);
        this.load.image('platform', 'assets/img/platform.png');
        // this.load.image('sky', 'assets/img/sky.png');
        this.load.image('sunrise', 'assets/img/Sunrise.png');
        this.load.spritesheet('redEnemy', 'assets/img/tempRed.png', 64, 52, 2);
        this.load.image('purpleEnemy', 'assets/img/tempPurple.png');
        this.load.image('pinkEnemy', 'assets/img/tempPink.png');

        this.load.image('bubble', 'assets/img/water-bubble.png');
      
        // load level data
		this.load.text('level', 'assets/data/level-1.json'); 
    },

    create: function() {
    	Platformer.game.state.start('GameState');
    }
}