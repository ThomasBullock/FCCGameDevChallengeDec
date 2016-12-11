var Platformer = Platformer || {};

Platformer.PreloadState = {   
    preload: function(){
        this.load.spritesheet('player', 'assets/img/player-spritesheet.png', 60, 70, 5);
        this.load.image('platform', 'assets/img/platform.png');
        this.load.image('sky', 'assets/img/sky.png');
			
			  this.load.text('level', 'assets/data/level-1.json');  
    },

    create: function() {
    	Platformer.game.state.start('GameState');
    }
}