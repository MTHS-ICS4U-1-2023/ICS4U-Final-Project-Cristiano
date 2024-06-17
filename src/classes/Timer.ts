export default class Timer extends Phaser.GameObjects.Text {
  /**
   * The time passed in miliseconds
  */
  private milisecondsPassed: number

  /**
   * Is the timer paused?
  */
  private isPaused: boolean

  /**
   * Creates a timer that can count up
   *
   * @param scene The scene to put the object into
   * @param style The text's style
   */
  constructor(scene: Phaser.Scene, style: Phaser.GameObjects.TextStyle) {
    // Create timer
    super(scene, 10, 0, '0', style)
    this.milisecondsPassed = 0
    this.isPaused = false
    scene.add.existing(this)
  }

  /**
   * Counts the time up by one, if the timer is not paused
   */
  public count() {
    if (this.isPaused == false) {
      this.milisecondsPassed++
      // Get the time seperated into miliseconds, seconds, and minutes
      let secondsPassed: integer = Math.floor(this.milisecondsPassed / 100)
      if (secondsPassed < 0) {
        secondsPassed = 0
      }
      let milisecondsPassed: integer = this.milisecondsPassed - (100 * secondsPassed)
      let minutesPassed: integer = Math.floor(secondsPassed / 60)
      secondsPassed = secondsPassed - (minutesPassed * 60)
      // Convert to string and format for only one digit
      let miliseconds: string = milisecondsPassed.toString()
      if (miliseconds.length == 1) {
        miliseconds = '0' + miliseconds
      }
      let seconds: string = secondsPassed.toString()
      if (seconds.length == 1) {
        seconds = '0' + seconds
      }
      let minutes: string = minutesPassed.toString()
      if (minutes.length == 1) {
        minutes = '0' + minutes
      }
      this.setText(
        `${minutes}:${seconds}:${miliseconds}`
      )
    }
  }

  /**
   * Toggles the timer on and off by changing the pause bool
   */
  public toggle() {
    if (this.isPaused == true) {
      this.isPaused = false
    } else {
      this.isPaused = true
    }
  }
}
