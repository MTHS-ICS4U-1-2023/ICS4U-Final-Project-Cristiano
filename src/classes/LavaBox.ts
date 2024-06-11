export default class LavaBox extends Phaser.Physics.Arcade.Sprite {
  /**
   * Creates a box that causes the player to lose the level
   *
   * @param scene The scene to put the object into
   * @param gridX The X grid position
   * @param gridY The Y grid position
   * @param moveBoxes The move boxes to collide with
   */
  constructor(scene: Phaser.Scene, gridX: number, gridY: number, moveBoxes: Phaser.GameObjects.Container) {
    // Create box
    const posX = 100 + gridX * 200
    const posY = 100 + gridY * 200
    super(scene, posX, posY, 'lavaBox')
    this.setScale(0.4)
    // Create move box collider
    scene.physics.add.collider(moveBoxes.getAll(), this, function(moveBoxCollide) {
      moveBoxCollide.setImmovable(true)
      moveBoxCollide.setVelocity(0)
      moveBoxCollide.setTint(0x545454)
    })
    scene.add.existing(this)
  }
}
