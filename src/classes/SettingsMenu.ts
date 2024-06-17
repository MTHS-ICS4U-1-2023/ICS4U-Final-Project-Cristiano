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
   * The skip level pop-up when complete setting
   */
  public skipLevelComplete: boolean

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
    this.skipLevelComplete = false
    // Create settings menu
    const settingsBackground: Phaser.GameObjects.Image = scene.add.image(screenX / 2, screenY / 2, 'pauseBg')
      .setOrigin(0.5)
      .setScale(0.75)
      .setAlpha(0.8)
    const menuText: Phaser.GameObjects.Text = scene.add.text(250, 150, 'Settings', this.pauseTextStyle)
    // Create timer button
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
    // Create timer button
    const levelPopupToggleButton = scene.add.text(
      250, timeToggleButton.y + 100, `Skip Level Complete/Lost Text: ${this.skipLevelComplete}`, this.pauseButtonTextStyle
    )
    levelPopupToggleButton.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, levelPopupToggleButton.width, levelPopupToggleButton.height),
        Phaser.Geom.Rectangle.Contains
      )
      levelPopupToggleButton.on('pointerdown', () => {
      if (this.skipLevelComplete == true) {
        this.skipLevelComplete = false
      } else {
        this.skipLevelComplete = true
      }
      levelPopupToggleButton.setText(`Skip Level Complete/Lost Text: ${this.skipLevelComplete}`)
    })
    // Add all elements to menu
    this.add([
      settingsBackground,
      menuText,
      timeToggleButton,
      levelPopupToggleButton
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
