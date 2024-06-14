export default class Timer extends Phaser.GameObjects.Text {
  /**
   * The time passed in miliseconds
  */
  private milisecondsPassed: number

  /**
   * Creates a power up that causes the player to move through normal boxes
   *
   * @param scene The scene to put the object into
   * @param style The text's style
   */
  constructor(scene: Phaser.Scene, style: Phaser.GameObjects.TextStyle) {
    // Create power up
    super(scene, 0, 0, '0', style)
    this.milisecondsPassed = 0
    scene.add.existing(this)
  }

  /**
   * Counts the time up by one
   */
  public count() {
    this.milisecondsPassed++
    let secondsPassed: number = Math.floor(this.milisecondsPassed / 100)
    if (secondsPassed < 0) {
      secondsPassed = 0
    }
    let milisecondsPassed: number = this.milisecondsPassed - (100 * secondsPassed)
    let minutesPassed: number = Math.floor(secondsPassed / 60)
    secondsPassed = secondsPassed - (minutesPassed * 60)
    this.setText(
      `${minutesPassed}:${secondsPassed}:${milisecondsPassed}`
    )
  }
}
