
//---------------------------------------------------------------//
// VARIABLES

var canvasProperties = {
    width: 480, height: 320,
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

var bricksProperties = {
    width: 50, height: 20,
    count: { row: 3, col: 7 },
    offset: { top: 50, left: 60 },
    padding: 10,
    anchor: 0.5
};

var scoreProperties = {
    currentScore: 0,
    x: 5, y: 5,
    fontSize: '18px',
    fontFamily: 'Arial',
    color: '#0095DD'
};

var livesProperties = {
    currentLives: 3
};

var ball = null;
var paddle = null;
var bricks = [];
var newBrick = null;
var scoreText = null;
var livesText = null;
var lifeLostText = null;

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
    game.load.image ('brick', 'sprites/brick.png');
}

// executed once when everything is loaded and ready
function create () {
    game.physics.startSystem (Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;
    game.load.crossOrigin = 'Anonymous';

    setBallProperties ();
    setPaddleProperties ();
    initBricks ();

    // won't work!
    /*
    scoreText = game.add.text (scoreProperties.x, scoreProperties.y, 'Score: 0', {
        font: `${scoreProperties.fontSize} ${scoreProperties.fontFamily}`, 
        fill: scoreProperties.color
    });
    
    // livesText...
    // lifeLostText...
    
    */
}

// executes on every frame
function update () {
    game.physics.arcade.collide (ball, paddle);
    game.physics.arcade.collide (ball, bricks, onBallHitBrick);
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

    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add (onBallLeaveScreen, this);
}

function setPaddleProperties () {

    // sprites
    paddle = game.add.sprite (game.world.width * paddleProperties.x, game.world.height - paddleProperties.y, 'paddle');
    paddle.anchor.set (paddleProperties.anchorX, paddleProperties.anchorY);

    // physics
    game.physics.enable (paddle, Phaser.Physics.ARCADE);
    paddle.body.immovable = true;
}

function initBricks () {
    bricks = game.add.group ();

    for (var col = 0; col < bricksProperties.count.col; col++) {
        for (var row = 0; row < bricksProperties.count.row; row++) {

            // coordinates
            var x = (col * (bricksProperties.width + bricksProperties.padding)) + bricksProperties.offset.left;
            var y = (row * (bricksProperties.height + bricksProperties.padding)) + bricksProperties.offset.top;

            // sprite
            newBrick = game.add.sprite (x, y, 'brick');
            newBrick.anchor.set (bricksProperties.anchor);

            // physics
            game.physics.enable (newBrick, Phaser.Physics.ARCADE);
            newBrick.body.immovable = true;

            bricks.add (newBrick);
        }
    }
}

function onBallHitBrick (ball, brick) {
    brick.kill ();
    scoreProperties.currentScore += 10;
    //scoreText.setText (`Score: ${scoreProperties.currentScore}`);
    console.log ('Score: ', scoreProperties.currentScore);

    var numberOfCurrentBricks = 0;
    for (var brick of bricks.children) {
        if (brick.alive) {
            numberOfCurrentBricks++;
        }
    }

    if (numberOfCurrentBricks === 0) {
        alert (`You won the game! Congratulations! Score: ${scoreProperties.currentScore}`);
        location.reload ();
    }
}

function onBallLeaveScreen () {
    livesProperties.currentLives--;
    if (livesProperties.currentLives) {
        console.log ('RESET');

        ball.reset (game.world.width * ballProperties.x, game.world.height - ballProperties.y);
        paddle.reset (game.world.width * paddleProperties.x, game.world.height - paddleProperties.y);

        game.input.onDown.addOnce (function () {
            ball.body.velocity.set (ballProperties.velocityX, ballProperties.velocityY);
        });
    }
    else {
        alert ('You lost, game over!');
        location.reload ();
    }
}