class Enemy extends Phaser.GameObjects.Image {
    constuctor(scene) {
        //random enemy position
        const x = Phaser.Math.Between(50, canvasWidth - 50);
        const y = -30;

        //puts enemy into the scene and adds it to the enemies group
        super(scene, x, y, "enemy");
        scene.add.existing(this);
        scene.enemies.add(this);

        //moves the enemy
        scene.physics.world.enableBody(this);
        this.body.velocity.y = 130;
        this.health = 1;
    }
    checkDamage(scene) {
        //damages player
        if (this.y > canvasHeight - 100) {
            gameManager.health--;
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