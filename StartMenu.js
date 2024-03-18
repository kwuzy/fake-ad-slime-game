class StartMenu extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        //main character
        this.load.image("main", "./Assets/Sprites/main_char.png");
        //enemies
        this.load.image("enemy", "./Assets/Sprites/enemy_char.png");
        this.load.image("enemy", "./Assets/Sprites/bigenemy_char.png");
        this.load.image("enemy", "./Assets/Sprites/boss_char.png");
        //bullet
        this.load.spritesheet("bullet", "./Assets/Sprites/bullet.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        //modifiers
        // fire rate +1
        this.load.image("modifier0", "./Assets/Sprites/modifiers/modifier0.png");
        // fire rate +2
        this.load.image("modifier1", "./Assets/Sprites/modifiers/modifier1.png");
        // fire rate +3
        this.load.image("modifier2", "./Assets/Sprites/modifiers/modifier2.png");
        // fire rate x1
        this.load.image("modifier3", "./Assets/Sprites/modifiers/modifier3.png");
        // fire rate x2
        this.load.image("modifier4", "./Assets/Sprites/modifiers/modifier4.png");
        // fire rate x3
        this.load.image("modifier5", "./Assets/Sprites/modifiers/modifier5.png");
        // fire rate -1
        this.load.image("modifier6", "./Assets/Sprites/modifiers/modifier6.png");
        // fire rate -2
        this.load.image("modifier7", "./Assets/Sprites/modifiers/modifier7.png");
        // fire rate -3
        this.load.image("modifier8", "./Assets/Sprites/modifiers/modifier8.png");
        // fire rate /2
        this.load.image("modifier9", "./Assets/Sprites/modifiers/modifier9.png");
        // move speed +2
        this.load.image("modifier10", "./Assets/Sprites/modifiers/modifier10.png");
        // move speed +4
        this.load.image("modifier11", "./Assets/Sprites/modifiers/modifier11.png");
        // move speed x1
        this.load.image("modifier12", "./Assets/Sprites/modifiers/modifier12.png");
        // move speed x2
        this.load.image("modifier13", "./Assets/Sprites/modifiers/modifier13.png");
        // move speed -1
        this.load.image("modifier14", "./Assets/Sprites/modifiers/modifier14.png");
        // move speed -2
        this.load.image("modifier15", "./Assets/Sprites/modifiers/modifier15.png");
        // move speed /2
        this.load.image("modifier16", "./Assets/Sprites/modifiers/modifier16.png");
        // health +1
        this.load.image("modifier17", "./Assets/Sprites/modifiers/modifier17.png");
        // health +2
        this.load.image("modifier18", "./Assets/Sprites/modifiers/modifier18.png");
        // health +5
        this.load.image("modifier19", "./Assets/Sprites/modifiers/modifier19.png");
    }
}