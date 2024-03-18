window.onload = function () {
    const game = new Phaser.Game(config);
}
//set game and canvas settings
const config = {
    width: 800,
    height: 600,
    backgroundColor: 0xCCCCFF,
    scene: [StartMenu],
    pixelArt: true,
    phyics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}
