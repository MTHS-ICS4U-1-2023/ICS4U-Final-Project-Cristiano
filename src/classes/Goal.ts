/**
 * Creates a goal that begins the next level when touched
 */
export default class Goal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, gridX: number, gridY: number) {
    // Create goal
    const posX = 100 + gridX * 200
    const posY = 100 + gridY * 200
    super(scene, posX, posY, 'goal')
    this.setScale(0.25)
    scene.add.existing(this)
  }
}
