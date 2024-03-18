class Modifer extends Phaser.GameObjects.Image {
    constructor(scene) {
        const x = 0;
        const y = 0;

        //random modifier
        const randomNumber = Phaser.Math.Between(0,19);
        const randomModifier = `modifier${randomNumber}`;

        //add modifier to scene and to group
        super(scene, x, y, randomModifier);
        this.setScale(0.45);
        scene.add.existing(this);
        scene.modifiers.add(this);

        //moves the modifer
        scene.physics.world.enableBody(this);
        this.body.velocity.y = 100;

        //modifer data for pickup
        this.operation = '';
        this.speedModifer = 0;
        this.fireRateModifier = 0;
        this.healthModifier = 0;
        switch (randomNumber) {
            case 0:
                this.operation = 'add/subtract';
                this.fireRateModifier = 1;
                break;
            case 1:
                this.operation = 'add/subtract';
                this.fireRateModifier = 2;
                break;
            case 2:
                this.operation = 'add/subtract';
                this.fireRateModifier = 3;
                break;
            case 3:
                this.operation = 'multiply/divide';
                this.fireRateModifier = 1;
                break;
            case 4:
                this.operation = 'multiply/divide';
                this.fireRateModifier = 2;
                break;
            case 5:
                this.operation = 'multiply/divide';
                this.fireRateModifier = 3;
                break;
            case 6:
                this.operation = 'add/subtract';
                this.fireRateModifier = -1;
                break;
            case 7:
                this.operation = 'add/subtract';
                this.fireRateModifier = -2;
                break;
            case 8:
                this.operation = 'add/subtract';
                this.fireRateModifier = -3;
                break;
            case 9:
                this.operation = 'multiply/divide';
                this.fireRateModifier = 1 / 2;
                break;
            case 10:
                this.operation = 'add/subtract';
                this.speedModifer = 2;
                break;
            case 11:
                this.operation = 'add/subtract';
                this.speedModifer = 4;
                break;
            case 12:
                this.operation = 'multiply/divide';
                this.speedModifer = 1;
                break;
            case 13:
                this.operation = 'multiply/divide';
                this.speedModifer = 2;
                break;
            case 14:
                this.operation = 'add/subtract';
                this.speedModifer = -1;
                break;
            case 15:
                this.operation = 'add/subtract';
                this.speedModifer = -2;
                break;
            case 16:
                this.operation = 'multiply/divide';
                this.speedModifer = 1 / 2;
                break;
            case 17:
                this.operation = 'add/subtract';
                this.healthModifier = 1;
                break;
            case 18:
                this.operation = 'add/subtract';
                this.healthModifier = 2;
                break;
            case 19:
                this.operation = 'add/subtract';
                this.healthModifier = 5;
                break;
        }
    }
    getModifier() {
        return {
            operation: this.operation,
            speedModifer: this.speedModifer,
            fireRateModifier: this.fireRateModifier,
            healthModifier: this.healthModifier
        }
    }
    missPickup() {
        //player doesn't pick up
        if (this.y > canvasHeight - 70) {
            this.destroy();
        }
    }
}