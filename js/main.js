
//---------------------------------------------------------------//
// VARIABLES

var canvasProperties = {
    width: 480, height: 320,
    backgroundColor: '#eee'
};

var ballProperties = {
    x: 50, y: 50,
    velocityX: 150, velocityY: 150,
    bounciness: 1
};

var ball;


var game = new Phaser.Game (canvasProperties.width, canvasProperties.height, 
                            Phaser.CANVAS, null, {
                                preload: preload, create: create, update: update 
                            });

//---------------------------------------------------------------//
// FUNCTIONS

// preloads the assets
function preload () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = canvasProperties.backgroundColor;

    game.load.image ('ball', 'sprites/ball.png');
}

// executed once when everything is loaded and ready
function create () {
    game.physics.startSystem (Phaser.Physics.ARCADE);
    
    // loads sprites into objects at position
    ball = game.add.sprite (ballProperties.x, ballProperties.y, 'ball');

    // enable physics for objects
    game.physics.enable (ball, Phaser.Physics.ARCADE);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set (ballProperties.bounciness);
    ball.body.velocity.set (ballProperties.velocityX, ballProperties.velocityY);
}

// executes on every frame
function update () {
  
}