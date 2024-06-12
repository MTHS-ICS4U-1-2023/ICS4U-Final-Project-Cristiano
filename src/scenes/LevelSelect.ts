import { Scene, GameObjects } from 'phaser'
import LoadLevelSelect from '../classes/LoadLevelSelect'

export class LevelSelect extends Scene {
  /**
   * Menu background
   */
  private background: GameObjects.TileSprite

  /**
   * Level select background
   */
  private selectBackground: GameObjects.Image

  /**
   * Return to main menu text button
   */
  private returnText: GameObjects.Text

  /**
   * The level select text style
   */
  private textStyle: GameObjects.TextStyle

  /**
   * Player one image button
   */
  private playerOneImage: GameObjects.Image

  /**
   * Player two image button
   */
  private playerTwoImage: GameObjects.Image

  /**
   * Player One text
   */
  private createdTextOne: GameObjects.Text

  /**
   * Player Two text
   */
  private createdTextTwo: GameObjects.Text

  /**
   * The level select loader
   */
  private levelSelectLoader: LoadLevelSelect

  /**
   * Loads the level select menu
   */
  constructor() {
    super('LevelSelect')

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
   * Creates the level select menu
   */
  create() {
    // Create title images
    const SCREEN_X: number = 1800
    const SCREEN_Y: number = 1000
    this.background = this.add.tileSprite(0, 0, SCREEN_X, SCREEN_Y, 'titleBg')
    this.background.setOrigin(0, 0)
    this.selectBackground = this.add.image(SCREEN_X / 2, SCREEN_Y / 2, 'pauseBg')
      .setOrigin()
      .setScale(0.8)
      .setAlpha(0.9)
    this.returnText = this.add.text(SCREEN_X / 2, 50, 'Go Back', this.textStyle).setOrigin()
    this.returnText.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.returnText.width, this.returnText.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.returnText.on('pointerdown', () => {
      this.scene.start('MainMenu')
    })
    const playerScale: number = 0.25
    this.playerOneImage = this.add.image(90, 163, 'playerImg').setScale(playerScale)
    this.playerOneImage.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.playerOneImage.width, this.playerOneImage.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.playerOneImage.on('pointerdown', () => {
      this.levelSelectLoader.regenerate(1)
    })
    this.createdTextOne = this.add.text(
      this.playerOneImage.x - 37, this.playerOneImage.y - 65, '1P', this.textStyle
    ).setFontSize(50)
    this.playerTwoImage = this.add.image(
      this.playerOneImage.x, this.playerOneImage.y + 150, 'playerTwoImg'
    ).setScale(playerScale)
    this.playerTwoImage.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.playerTwoImage.width, this.playerTwoImage.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.playerTwoImage.on('pointerdown', () => {
      this.levelSelectLoader.regenerate(2)
    })
    this.createdTextTwo = this.add.text(
      this.playerTwoImage.x - 37, this.playerTwoImage.y - 65, '2P', this.textStyle
    ).setFontSize(50)

    // Load levels to select
    this.levelSelectLoader = new LoadLevelSelect(this, 1, this.textStyle)
  }

  /**
   * Updates every milisecond, moves the menu background
   */
  update(): void {
    this.background.tilePositionX += 1 
  }
}
