var Platformer = Platformer || {};

    Platformer.BootState = {
        init: function() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 1000;
            
            this.game.world.setBounds(0,0,800,600);
            


            // add cursors
            this.game.cursors = this.game.input.keyboard.createCursorKeys();            
        },
        create: function() {
            Platformer.game.state.start('PreloadState');    
        }
        

    }