import { Scene, GameObjects } from 'phaser'

export class Credits extends Scene {
  /**
   * The credits background
   */
  private background: GameObjects.TileSprite

  /**
   * The game logo
   */
  private logo: GameObjects.Image

  /**
   * The credits text
   */
  private creditsText: GameObjects.Text

  /**
   * The return to main menu text button
   */
  private returnText: GameObjects.Text

  /**
   * The credits text style
   */
  private textStyle: GameObjects.TextStyle

  /**
   * Loads the credits
   */
  constructor() {
    super('Credits')

    this.textStyle = {
      fontFamily: 'Arial Black',
      fontSize: 60,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center'
    }
  }

  /**
   * Creates the credits
   */
  create() {
    // Create title images
    const SCREEN_X = 1800
    const SCREEN_Y = 1000
    this.background = this.add.tileSprite(0, 0, SCREEN_X, SCREEN_Y, 'titleBg')
    this.background.setOrigin(0, 0)
    this.logo = this.add.image(SCREEN_X / 2, 100, 'logo').setScale(0.25)
    this.logo.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.logo.width, this.logo.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.logo.on('pointerdown', () => {
      this.scene.start('MainMenu')
    })
    this.creditsText = this.add.text(
      SCREEN_X / 2,
      SCREEN_Y / 2,
      'Programming & Original Game: Cristiano Sellitto',
      this.textStyle
    ).setOrigin(0.5)
    this.returnText = this.add.text(
      0,
      0,
      '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nClick the logo to return to the main menu.',
      this.textStyle
    )
      .setAlign('left')
      .setFontSize(30)
  }

  /**
   * Runs every milisecond, moves the menu background
   */
  update(): void {
    this.background.tilePositionX += 1 
  }
}
