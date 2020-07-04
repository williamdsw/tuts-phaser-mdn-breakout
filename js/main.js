
//---------------------------------------------------------------//
// VARIABLES

var canvasProperties = {
    width: 480, height: 320,
    backgroundColor: '#eee'
};

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
}

// executed once when everything is loaded and ready
function create () {}

// executes on every frame
function update () {}