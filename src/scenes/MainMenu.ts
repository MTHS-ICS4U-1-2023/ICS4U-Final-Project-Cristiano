import { Scene, GameObjects } from 'phaser'
import SettingsMenu from '../classes/SettingsMenu'

export class MainMenu extends Scene {
  /**
   * Menu background tilesprite
   */
  private background: GameObjects.TileSprite

  /**
   * Game logo image
   */
  private logo: GameObjects.Image

  /**
   * Title screen text
   */
  private title: GameObjects.Text

  /**
   * Player One image button
   */
  private onePlayerImage: GameObjects.Image

  /**
   * Player Two image button
   */
  private twoPlayerImage: GameObjects.Image

  /**
   * Game settings image button
   */
  private settingsButton: GameObjects.Image

  /**
   * Settings menu
   */
  private settingsMenu: SettingsMenu

  /**
   * Text that indicates game version and the random string
   */
  private versionText: GameObjects.Text

  /**
   * Select level text button
   */
  private selectLevelText: GameObjects.Text

  /**
   * Player One text
   */
  private createdTextOne: GameObjects.Text

  /**
   * Player Two text
   */
  private createdTextTwo: GameObjects.Text

  /**
   * Menu text style
   */
  private textStyle: GameObjects.TextStyle

  /**
   * Array that contains the random strings
   */
  private mainTexts: string[]

  /**
   * The main menu of the game
   */
  constructor() {
    super('MainMenu')

    // Menu text style
    this.textStyle = {
      fontFamily: 'Arial Black',
      fontSize: 60,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center'
    }

    // Random menu strings
    this.mainTexts = [
      'This is a string.',
      'Try the original!',
      'Shoutouts to Lava World on Scratch!',
      'Made in 2024!',
      "It's free!",
      'qwertyuiopasdfghjklzxcvbnm',
      'Click the logo!',
      'These messages are random.',
      'Press escape to pause!',
      'Made in TypeScript!',
      'Phaser 3!',
      'I do not know if this text will appear on screen correctly',
      'undefined',
      'I hope this works',
      'Tip: You cannot jump.',
      'With added circlular eyes!',
      'One point oh!',
      'Pretty square!',
      'I got a box here...',
      '☺',
      'this.destory()',
      'Hit the goal post at the end to win.',
      'No more square eyes!',
      'O_O',
      'null',
      'Box World 2 releases soon...',
      'Object oriented!',
      "The brown boxes won't hurt you anymore.",
      'Hey!',
      'Remade!',
      'Happy 2nd Birthday!'
    ]
  }

  /**
   * Creates the menu
   */
  create() {
    // Create title images
    const SCREEN_X = 1800
    const SCREEN_Y = 1000
    this.background = this.add.tileSprite(0, 0, SCREEN_X, SCREEN_Y, 'titleBg')
    // Logo button
    this.background.setOrigin(0, 0)
    this.logo = this.add.image(SCREEN_X / 2, 270, 'logo').setScale(0.5)
    this.logo.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.logo.width, this.logo.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.logo.on('pointerdown', () => {
      this.scene.start('Credits')
    })
    // Find a random string to show
    const maxNumber = this.mainTexts.length
    const randomInt = Math.floor(Math.random() * maxNumber);
    this.versionText = this.add.text(
      5,
      0,
      'v1.1\n\n\n\n\n\n\n\n\n\n\n\n' + this.mainTexts[randomInt],
      this.textStyle
    ).setAlign('left')
    // Play buttons
    this.title = this.add.text(SCREEN_X / 2, SCREEN_Y / 2, 'Click here to play!', this.textStyle).setOrigin()
    this.title.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.title.width, this.title.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.title.on('pointerdown', () => {
      // Change menu section
      this.title.disableInteractive()
      this.title.setVisible(false)
      // One player select
      this.onePlayerImage = this.add.image(SCREEN_X / 2 - 100, SCREEN_Y / 2 + 50, 'playerImg').setScale(0.3)
      this.onePlayerImage.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, this.onePlayerImage.width, this.onePlayerImage.height),
        Phaser.Geom.Rectangle.Contains
      )
      this.createdTextOne = this.add.text(SCREEN_X / 2 - 145, SCREEN_Y / 2 - 25, '1P', this.textStyle)
      this.onePlayerImage.on('pointerdown', () => {
        this.scene.start('Game', {
          level: 1,
          players: 1,
          settings: this.settingsMenu
        })
      })
      // Two player select
      this.twoPlayerImage = this.add.image(SCREEN_X / 2 + 100, SCREEN_Y / 2 + 50, 'playerTwoImg').setScale(0.3)
      this.twoPlayerImage.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, this.twoPlayerImage.width, this.twoPlayerImage.height),
        Phaser.Geom.Rectangle.Contains
      )
      this.createdTextTwo = this.add.text(SCREEN_X / 2 + 55, SCREEN_Y / 2 - 25, '2P', this.textStyle)
      this.twoPlayerImage.on('pointerdown', () => {
        this.scene.start('Game', {
          level: 1,
          players: 2,
          settings: this.settingsMenu
        })
      })
      // Level select
      this.selectLevelText = this.add.text(
        SCREEN_X / 2, SCREEN_Y / 2 + 200, 'Level Select', this.textStyle
      ).setOrigin()
      this.selectLevelText.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, this.selectLevelText.width, this.selectLevelText.height),
        Phaser.Geom.Rectangle.Contains
      )
      this.selectLevelText.on('pointerdown', () => {
        this.scene.start('LevelSelect', {
          settings: this.settingsMenu
        })
      })
    })
    // Settings menu
    this.settingsMenu = new SettingsMenu(this, SCREEN_X, SCREEN_Y).setDepth(10)
    this.settingsButton = this.add.image(SCREEN_X - 50, 50, 'settings').setScale(0.5)
    this.settingsButton.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.settingsButton.width, this.settingsButton.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.settingsButton.on('pointerdown', () => {
      this.settingsMenu.toggle()
    })
  }

  /**
   * Runs every milisecond, moves the menu background
   */
  update(): void {
    this.background.tilePositionX += 1 
  }
}
