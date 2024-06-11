export default class BlueKeyDoor extends Phaser.Physics.Arcade.Sprite {
  /**
   * Creates a blue key door that can be unlocked with a blue key
   *
   * @param scene The scene to put the object into
   * @param gridX The X grid position
   * @param gridY The Y grid position
   * @param moveBoxes The move boxes to collide with
   */
  constructor(scene: Phaser.Scene, gridX: number, gridY: number, moveBoxes: Phaser.GameObjects.Container) {
    // Create key door
    const posX = 100 + gridX * 200
    const posY = 100 + gridY * 200
    super(scene, posX, posY, 'blueKeyDoor')
    this.setScale(0.4)
    // Create move box collider
    scene.physics.add.collider(moveBoxes.getAll(), this, function(moveBoxCollide) {
      moveBoxCollide.setImmovable(true)
      moveBoxCollide.setTint(0x545454)
    })
    scene.add.existing(this)
  }
}
