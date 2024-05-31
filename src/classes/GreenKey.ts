/**
 * Creates a green key that the player can pick up
 */
export default class GreenKey extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, gridX: number, gridY: number) {
    // Create key
    const posX = 100 + gridX * 200
    const posY = 100 + gridY * 200
    super(scene, posX, posY, 'greenKey')
    this.setScale(0.5)
    scene.add.existing(this)
  }
}
