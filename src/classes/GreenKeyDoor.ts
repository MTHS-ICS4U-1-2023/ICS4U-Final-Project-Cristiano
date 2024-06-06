/**
 * Creates a green key door that can be unlocked with a green key
 */
export default class GreenKeyDoor extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, gridX: number, gridY: number, moveBoxes: Phaser.GameObjects.Container) {
    // Create key door
    const posX = 100 + gridX * 200
    const posY = 100 + gridY * 200
    super(scene, posX, posY, 'greenKeyDoor')
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
