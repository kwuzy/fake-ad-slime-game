class MainLoop extends Phaser.Scene {
    constructor() {
        super("playGame");
    }
    create() {
        //INIT VARIABLES
        //game object groups
        this.scoreTexts = this.add.group();
        this.projectiles = this.add.group();
        this.enemies = this.add.group();
        this.modifiers = this.physics.add.group();
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
        this.startTime = this.game.getTime();
        //line for enemy damage (too lazy to make an image)
        const underscore = "=";
        const numberOfLines = Math.floor(canvasWidth / 10);
        let damageLine = "";
        for (let i = 0; i < numberOfLines; i++) {
            damageLine += underscore;
        }
        this.add.text(15, canvasHeight - 95, damageLine, { fill: '#8E1600' });
        //main character
        this.main = this.add.sprite(centerX, canvasHeight - 50, "main");
        this.player = this.physics.add.group();
        this.player.add(this.main);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        //collisions
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.modifiers, this.pickupModifier, null, this);
        this.createModifiers();
    }
    update() {
        //lose condition
        if (gameManager.health <= 0) {
            this.scene.start("endGame");
        }
        //player movement
        this.movePlayer();
        //fires weapons automatically
        if (!this.isReloading()) {
            this.fireWeapon();
        }
        //destroys bullets out of bounds
        this.projectiles.getChildren().forEach(bullet => {
            bullet.checkBoundaries();
        });
        //enemy
        //spawn enemies
        if (this.shouldSpawnEnemy()) {
            //you basically lose if you get here
            if (gameManager.level >= this.endGameLevel) {
                this.createBossEnemy();
                this.createBigEnemy();
                this.createEnemy();
            } else if (gameManager.level >= this.chaosLevel) {
                const randomEnemy = Phaser.Math.Between(0,1);
                if (randomEnemy === 0) {
                    this.createBigEnemy();
                } else {
                    this.createEnemy();
                }
            } else {
                this.createEnemy();
            }
        }
        //enemy damages player
        this.enemies.getChildren().forEach(enemy => {
            enemy.checkDamage(this);
        });
        //check modifiers being picked up
        this.modifiers.getChildren().forEach(modifier => {
            modifier.missPickup();
        })
    }
    //FUNCTIONS
    //ENEMY FUNCTIONS
    shouldSpawnEnemy() {
        const timeSinceLastSpawn = this.game.getTime() - this.lastEnemySpawnTime;
        return this.enemyInterval - timeSinceLastSpawn <= 0;
    }
    createEnemy() {
        const enemy = new Enemy(this);
        //for resetting spawn time
        this.lastEnemySpawnTime = this.game.getTime();
    }
    createBigEnemy() {
        const enemy = new BigEnemy(this);
        //for resetting spawn time
        this.lastEnemySpawnTime = this.game.getTime();
    }
    createBossEnemy() {
        const enemy = new Boss(this);
        //for resetting spawn time
        this.lastEnemySpawnTime = this.game.getTime();
    }
    //modifier functions
    createModifiers() {
        const maxModifiers = 4;
        for (let i = 0; i < maxModifiers; i++) {
            const modifier = new Modifier(this);
            //avoid stacking, only one in each quartile
            switch (i) {
                case 0:
                    modifier.setRandomPosition(50, 0, quartileX1 - 100, 0);
                    break;
                case 1:
                    modifier.setRandomPosition(quartileX1 + 50, 0, quartileX1 - 100, 0);
                    break;
                case 2:
                    modifier.setRandomPosition(centerX + 50, 0, quartileX1 - 100, 0);
                    break;
                default:
                    modifier.setRandomPosition(quartileX3 + 50, 0, quartileX1 - 100, 0);
            }
        }
    }
    //PLAYER FUNCTIONS
    movePlayer() {
        //prevents moving player offscreen
        if (this.main.x > 50) {
            if (this.cursorKeys.left.isDown) {
                this.main.x -= gameManager.moveSpeed;
            }
        }
        if (this.main.x < canvasWidth - 50) {
            if (this.cursorKeys.right.isDown) {
                this.main.x += gameManager.moveSpeed;
            }
        }
    }
    //fire weapon
    fireWeapon() {
        const bullet = new Bullet(this);
        //for reloading
        this.lastFireTime = this.game.getTime();
    }
    isReloading() {
        const timeSinceLastFire = this.game.getTime() - this.lastFireTime;
        return this.fireInterval - timeSinceLastFire >= 0;
    }
    //COLLISION FUNCTIONS
    hitEnemy(projectile, enemy) {
        projectile.destroy();
        enemy.takeDamage();
        gameManager.score++;
        this.updateGameData();
    }
    pickupModifier(player, modifier) {
        const modifierObject = modifier.getModifier();
        if (modifierObject.operation === 'add/subtract') {
            gameManager.moveSpeed += modifierObject.speedModifier;
            gameManager.fireRate += modifierObject.fireRateModifier;
            gameManager.health += modifierObject.healthModifier;
        } else if (modifierObject.operation === "multiply/divide") {
            if (modifierObject.speedModifier != 0) {
                gameManager.moveSpeed *= modifierObject.speedModifier;
                gameManager.moveSpeed = Math.ceil(gameManager.moveSpeed);
            } else if (modifierObject.fireRateModifier != 0) {
                gameManager.fireRate *= modifierObject.fireRateModifier;
                gameManager.fireRate = Math.ceil(gameManager.fireRate);
            } else if (modifierObject.healthModifier != 0) {
                gameManager.health *= modifierObject.healthModifier;
                gameManager.health = Math.ceil(gameManager.health);
            }
        }
        modifier.destroy();
        this.updateGameData();
    }
    //GAME MANAGER FUNCTIONS
    getElapsedTime() {
        return this.game.getTime() - this.startTime;
    }
    //starting new game data
    resetGameData() {
        gameManager.level = this.startlevel;
        gameManager.health = this.startHealth;
        gameManager.fireRate = this.startFireRate;
        gameManager.moveSpeed = this.startMoveSpeed;
        gameManager.score = this.startScore;
        gameManager.levelUpBase = this.startLevelUpBase;
        gameManager.previousLevelScore = this.startPreviousLevelScore;
    }
    updateGameData() {
        //leveling
        if(gameManager.score >= gameManager.levelUpBase + gameManager.previousLevelScore) {
            gameManager.previousLevelScore = gameManager.score;
            gameManager.levelUpBase *= this.levelScaling;
            gameManager.level++;
            this.createModifiers();
            if (gameManager.level >= this.bossLevel) {
                for (let i = 0; i < gameManager.level / this.bossLevel; i++) {
                    this.createBossEnemy();
                }
            } else if (gameManager.level >= this.bigEnemyLevel) {
                for (let i = 0; i < gameManager.level / this.bigEnemyLevel; i++) {
                    this.createBigEnemy();
                }
            }
        }
        //fire rate
        //prevent player from going below start fire rate
        if (gameManager.fireRate < this.startFireRate) {
            gameManager.fireRate = this.startFireRate;
        }
        this.fireInterval = 1000 / gameManager.fireRate;
        //prevent player from going below start move speed
        if (gameManager.moveSpeed < this.startMoveSpeed) {
            gameManager.moveSpeed = this.startMoveSpeed;
        }
        //enemy spawn rate
        this.enemyInterval = 2000 / gameManager.level;

        this.updateUI();
    }
    updateUI() {
        this.scoreTexts.clear(true,true);

        this.levelText = this.add.text(67, canvasHeight - 170, `Level: ${gameManager.level}`, { fill: '#000' });
        this.scoreText = this.add.text(67, canvasHeight - 150, `Score: ${gameManager.score}`, { fill: '#000' });
        this.fireRateText = this.add.text(29, canvasHeight - 130, `Fire Rate: ${gameManager.fireRate}`, { fill: '#000' });
        this.moveSpeedtext = this.add.text(20, canvasHeight - 110, `Move Speed: ${gameManager.moveSpeed}`, { fill: '#000' });
        this.healthText = this.add.text(58, canvasHeight - 80, `Health: ${gameManager.health}`, { fill: '#000' });

        this.scoreTexts.add(this.levelText);
        this.scoreTexts.add(this.scoreText);
        this.scoreTexts.add(this.fireRateText);
        this.scoreTexts.add(this.moveSpeedtext);
        this.scoreTexts.add(this.healthText);
    }
}