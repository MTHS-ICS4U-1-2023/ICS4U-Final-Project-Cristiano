export default class SettingsMenu extends Phaser.GameObjects.Container {
  /**
   * States if the settings menu is visible
   */
  private isVisible: boolean

  /**
   * The show time setting
   */
  public showTime: boolean

  /**
   *  Pause menu text style
   */
  public pauseTextStyle: Phaser.GameObjects.TextStyle

  /**
   * Pause menu button text style
   */
  public pauseButtonTextStyle: Phaser.GameObjects.TextStyle

  /**
   * Creates the settings menu
   *
   * @param scene The scene to put the object into
   * @param screenX The width of the screen
   * @param screenY The height of the screen
   */
  constructor(scene: Phaser.Scene, screenX: number, screenY: number) {
    // Create container
    super(scene, 0, 0)
    // Create text styles
    this.pauseTextStyle = {
      fontFamily: 'Arial Black',
      fontSize: 60,
      color: '#000000',
      stroke: '#ffffff',
      strokeThickness: 8,
      align: 'left'
    }
    this.pauseButtonTextStyle = {
      fontFamily: 'Arial Black',
      fontSize: 60,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'left'
    }
    // Create default settings
    this.showTime = false
    // Create settings menu
    const settingsBackground: Phaser.GameObjects.Image = scene.add.image(screenX / 2, screenY / 2, 'pauseBg')
      .setOrigin(0.5)
      .setScale(0.75)
      .setAlpha(0.8)
    const menuText: Phaser.GameObjects.Text = scene.add.text(250, 150, 'Settings', this.pauseTextStyle)
    const timeToggleButton = scene.add.text(
      250, menuText.y + 100, `Show Time: ${this.showTime}`, this.pauseButtonTextStyle
    )
    timeToggleButton.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, timeToggleButton.width, timeToggleButton.height),
        Phaser.Geom.Rectangle.Contains
      )
    timeToggleButton.on('pointerdown', () => {
      if (this.showTime == true) {
        this.showTime = false
      } else {
        this.showTime = true
      }
      timeToggleButton.setText(`Show Time: ${this.showTime}`)
    })
    this.add([
      settingsBackground,
      menuText,
      timeToggleButton
    ])
    this.setVisible(false)
    scene.add.existing(this)
  }

  /**
   * Toggles the visiblity of the settings menu
   */
  public toggle() {
    if (this.visible == true) {
      this.setVisible(false)
    } else {
      this.setVisible(true)
    }
  }
}
