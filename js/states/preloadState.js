var Platformer = Platformer || {};

Platformer.PreloadState = {   
    preload: function(){
        // load images and spritesheets
        this.load.spritesheet('player', 'assets/img/player-spritesheet.png', 60, 70, 5);
        this.load.image('platform', 'assets/img/platform.png');
        // this.load.image('sky', 'assets/img/sky.png');
        this.load.image('sunrise', 'assets/img/Sunrise.png');
        this.load.image('midday', 'assets/img/Midday.png');
        this.load.image('sunset', 'assets/img/Sunset.png');
        this.load.image('dusk', 'assets/img/Dusk.png');			
        this.load.spritesheet('redEnemy', 'assets/img/tempRed.png', 64, 52, 2);
        this.load.spritesheet('purpleEnemy', 'assets/img/tempPurple.png', 64, 52, 2);
        this.load.image('pinkEnemy', 'assets/img/tempPink.png');
				this.load.spritesheet('snail', 'assets/img/snail-spritesheet.png', 82, 72, 4);
				this.load.image('sundae', 'assets/img/sundae.png');
        this.load.image('platform-short', 'assets/img/platform-short.png');
        this.load.image('platform-medium', 'assets/img/platform-medium.png');
        this.load.image('platform-large', 'assets/img/platform-large.png')      

        this.load.image('bubble', 'assets/img/water-bubble.png');
      
        // load level data
				this.load.text('level', 'assets/data/levels.json'); 
    },

    create: function() {
    	Platformer.game.state.start('GameState');
    }
}