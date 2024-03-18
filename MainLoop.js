class MainLoop extends Phaser.Scene {
    constructor() {
        super("playGame");
    }
    create() {
        //INIT VARIABLES
        //game object groups
        this.scoreTexts = this.add.group();
        this.player = this.physics.add.group();
        this.projectiles = this.add.group();
        this.enemies = this.add.group();
        this.modifiers = this.add.group();
        //UI variables
        this.scoreText;
        this.fireRateText;
        this.moveSpeedtext;
        this.healthText;
        this.levelText;
        //fire rate
        this.fireInterval;
        this.lastFireTime = 1000;
        //enemy spawn rate
        this.enemyInterval;
        this.lastEnemySpawnTime = 2000;
        //harder enemy starting waves
        this.bigEnemyLevel = 5;
        this.bossLevel = 8;
        this.chaosLevel = 15;
        this.endGameLevel = 20;
        //new game base stats
        this.startlevel = 1;
        this.startHealth = 10;
        this.startFireRate = 1;
        this.startMoveSpeed = 2;
        this.startScore = 0;
        this.startLevelUpBase = 10;
        this.startPreviousLevelScore = 0;
        this.scoreBase = 10;
        this.levelScaling = 1.3;
        //STARTING NEW GAME
        this.resetGameData();
        this.updateGameData();
        this.createModifiers();
        this.startTime = this.game.getTime();
        //line for enemy damage (too lazy to make an image)
        const underscore = "_";
        const numberOfLines = Math.floor(canvasWidth / 10);
        let damageLine = "";
        for (let i = 0; i < numberOfLines; i++) {
            damageLine += underscore;
        }
        this.add.text(15, canvasHeight - 102, damageLine, { fill: '#8E1600' });
        //main character
        this.main = this.add.sprite(centerX, canvasHeight - 50, "main");
        this.player.add(this.main);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        //collisions
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.modifiers, this.pickupModifier, null, this);
    }
    update() {
        
    }
}