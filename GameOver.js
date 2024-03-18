class GameOver extends Phaser.Scene {
    constructor() {
        super("endGame");
    }
    create() {
        this.add.text(centerX - 55, centerY - 80, `Your Score`, { fill: '#000' });
        this.add.text(centerX - 48, centerY - 40, `Level: ${gameManager.level}`, { fill: '#000' });
        this.add.text(centerX - 48, centerY - 20, `Score: ${gameManager.score}`, { fill: '#000' });
        this.add.text(centerX - 86, centerY, `Fire Rate: ${gameManager.fireRate}`, { fill: '#000' });
        this.add.text(centerX - 95, centerY + 20, `Move Speed: ${gameManager.moveSpeed}`, { fill: '#000' });

        //restart button
        const restartButton = this.add.text(centerX - 150, canvasHeight - 150, '          Game Over\nClick Here to go back to Start', { fill: '#000' });
        restartButton.setInteractive();

        restartButton.on('pointerdown', () => {
            this.scene.start("bootGame");
        })
    }
}