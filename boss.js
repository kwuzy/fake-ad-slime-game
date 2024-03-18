class Boss extends Phaser.GameObjects.Image {
    constructor(scene) {
        //random enemy position
        const x = Phaser.Math.Between(50, canvasWidth - 50);
        const y = -30;

        //puts enemy into the scene and adds it to the enemies group
        super(scene, x, y, "boss");
        scene.add.existing(this);
        scene.enemies.add(this);

        //moves the enemy
        scene.physics.world.enableBody(this);
        this.body.velocity.y = 30;
        this.health = 50;
    }
    checkDamage(scene) {
        //damages player
        if (this.y > canvasHeight - 100) {
            gameManager.health -= 10;
            this.destroy();
            scene.updateUI();
        }
    }
    takeDamage() {
        this.health--;
        if (this.health <= 0) {
            this.destroy();
        }
    }
}