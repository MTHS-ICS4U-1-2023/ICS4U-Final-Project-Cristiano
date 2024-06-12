export default class Goal extends Phaser.Physics.Arcade.Sprite {
  /**
   * The number of players that passed the goal
   */
  public playersPassed: number

  /**
   * Creates a goal that begins the next level when touched
   *
   * @param scene The scene to put the object into
   * @param gridX The X grid position
   * @param gridY The Y grid position
   */
  constructor(scene: Phaser.Scene, gridX: number, gridY: number) {
    // Create goal
    const posX = 100 + gridX * 200
    const posY = 100 + gridY * 200
    super(scene, posX, posY, 'goal')
    this.setScale(0.25)
    this.playersPassed = 0
    scene.add.existing(this)
  }
}
