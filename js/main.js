
//---------------------------------------------------------------//
// VARIABLES

var canvasProperties = {
    width: 480, height: 320
};

var game = new Phaser.Game (canvasProperties.width, canvasProperties.height, 
                            Phaser.CANVAS, null, {
                                preload: preload, create: create, update: update 
                            });

//---------------------------------------------------------------//
// FUNCTIONS

// preloads the assets
function preload () {}

// executed once when everything is loaded and ready
function create () {}

// executes on every frame
function update () {}