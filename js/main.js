var Platformer = Platformer || {};  // Namespace pattern - // create a variable called Platformer if that already exists then use if not then start with a new object.

Platformer.game = new Phaser.Game(800,600,Phaser.AUTO, 'ld29', null, false, false); // last parameter sets graphics smoothing to off 

Platformer.game.state.add('GameState', Platformer.GameState);
Platformer.game.state.add('PreloadState', Platformer.PreloadState);
Platformer.game.state.add('BootState', Platformer.BootState);
Platformer.game.state.start('BootState');