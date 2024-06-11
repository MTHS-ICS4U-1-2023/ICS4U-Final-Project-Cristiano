export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
  /**
   * Creates a power up that causes the player to move through normal boxes
   *
   * @param scene The scene to put the object into
   * @param gridX The X grid position
   * @param gridY The Y grid position
   */
  constructor(scene: Phaser.Scene, gridX: number, gridY: number) {
    // Create power up
    const posX = 100 + gridX * 200
    const posY = 100 + gridY * 200
    super(scene, posX, posY, 'powerUp')
    this.setScale(0.25)
    scene.add.existing(this)
  }
}
