export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
  currentScene: Phaser.Scene
  collision: Phaser.Physics.Arcade.StaticBody

  constructor(scene: Phaser.Scene, gridX: number, gridY: number) {
    // Create power up
    const posX = 100 + gridX * 200
    const posY = 100 + gridY * 200
    super(scene, posX, posY, 'powerUp')
    this.setScale(0.25)
    scene.add.existing(this)
  }
}
