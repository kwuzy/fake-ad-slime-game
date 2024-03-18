class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        const x = scene.main.x;
        const y = scene.main.y;

        //add bullet to scene and add to projectiles group
        super(scene, x, y - 25, "bullet");
        this.setScale(1.5);
        scene.add.existing(this);
        scene.projectiles.add(this);

        //animate and move the bullet
        this.play("bullet_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -450;
    }
    //destory if it goes offscreen to save memory
    checkBoundaries() {
        if (this.y < -20) {
            this.destroy();
        }
    }
}