window.onload = function () {
    const game = new Phaser.Game(config);
}
//set game and canvas settings
const canvasWidth = 800;
const canvasHeight = 600;
const config = {
    width: canvasWidth,
    height: canvasHeight,
    backgroundColor: 0xB1EEFF,
    scene: [StartMenu, MainLoop, GameOver],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}
//game settings
const gameManager = {
    //example of settings, they get overwritten in MainLoop.js
    level: 1,
    health: 10,
    fireRate: 1,
    moveSpeed: 4,
    score: 0,
    levelUpBase: 10,
    previousLevelScore: 0
};
//screen utils
const quartileX1 = canvasWidth / 4;
const centerX = canvasWidth / 2;
const quartileX3 = canvasWidth / 4 * 3;
const centerY = canvasHeight / 2;