
//---------------------------------------------------------------//
// VARIABLES

var canvasProperties = {
    width: 600, height: 400,
    backgroundColor: '#eee'
};

var ballProperties = {
    x: 0.5, y: 25,
    velocityX: 150, velocityY: - 150,
    bounciness: 1,
    anchor: 0.5
};

var paddleProperties = {
    x: 0.5, y: 5,
    anchorX: 0.5, anchorY: 1
};

var ball;
var paddle;

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
    game.load.image ('paddle', 'sprites/paddle.png');
}

// executed once when everything is loaded and ready
function create () {
    game.physics.startSystem (Phaser.Physics.ARCADE);

    setBallProperties ();
    setPaddleProperties ();
}

// executes on every frame
function update () {
    game.physics.arcade.collide (ball, paddle);
    paddle.x = game.input.x || (game.world.width * paddleProperties.x);
}

function setBallProperties () {

    // sprites
    ball = game.add.sprite (game.world.width * ballProperties.x, game.world.height - ballProperties.y, 'ball');
    ball.anchor.set (ballProperties.anchor);

    // physics
    game.physics.enable (ball, Phaser.Physics.ARCADE);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set (ballProperties.bounciness);
    ball.body.velocity.set (ballProperties.velocityX, ballProperties.velocityY);
}

function setPaddleProperties () {

    // sprites
    paddle = game.add.sprite (game.world.width * paddleProperties.x, game.world.height - paddleProperties.y, 'paddle');
    paddle.anchor.set (paddleProperties.anchorX, paddleProperties.anchorY);

    // physics
    game.physics.enable (paddle, Phaser.Physics.ARCADE);
    paddle.body.immovable = true;
}