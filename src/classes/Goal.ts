export default class Goal extends Phaser.Physics.Arcade.Sprite {
  currentScene: Phaser.Scene
  collision: Phaser.Physics.Arcade.StaticBody

  constructor(scene: Phaser.Scene, gridX: number, gridY: number, moveBoxes: Phaser.GameObjects.Container) {
    // Create goal
    const posX = 100 + gridX * 200
    const posY = 100 + gridY * 200
    super(scene, posX, posY, 'goal')
    this.setScale(0.25)
    // Create move box collider
    for (let counter = 0; counter < moveBoxes.length; counter ++) {
      scene.physics.add.collider(moveBoxes.getAll()[counter], this.collision, function(moveBoxCollide: Phaser.Physics.Arcade.Sprite) {
        moveBoxCollide.setImmovable(true)
        moveBoxCollide.setTint(0x545454)
      })
    } 
    scene.add.existing(this)
  }
}
