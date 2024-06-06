import Player from "./Player"

/**
 * Creates a box that acts as a obstacle
 */
export default class Box extends Phaser.Physics.Arcade.Sprite {
  currentScene: Phaser.Scene

  constructor(scene: Phaser.Scene, gridX: number, gridY: number, moveBoxes: Phaser.GameObjects.Container) {
    // Create box
    const posX = 100 + gridX * 200
    const posY = 100 + gridY * 200
    super(scene, posX, posY, 'box')
    this.setScale(0.4)
    // Create move box collider
    scene.physics.add.collider(moveBoxes.getAll(), this, function(moveBoxCollide) {
      moveBoxCollide.setImmovable(true)
      moveBoxCollide.setVelocity(0)
      moveBoxCollide.setTint(0x545454)
    })
    this.currentScene = scene
    scene.add.existing(this)
  }
}
