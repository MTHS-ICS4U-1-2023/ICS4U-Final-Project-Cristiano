import { Scene, GameObjects } from 'phaser'

export class MainMenu extends Scene {
  private background: GameObjects.TileSprite
  private logo: GameObjects.Image
  private title: GameObjects.Text
  private onePlayerImage: GameObjects.Image
  private twoPlayerImage: GameObjects.Image
  private versionText: GameObjects.Text
  private selectLevelText: GameObjects.Text
  private createdTextOne: GameObjects.Text
  private createdTextTwo: GameObjects.Text
  private textStyle: GameObjects.TextStyle
  private mainTexts: string[]

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
      'Shoutouts to Lava World!',
      'Made in 2024!',
      "It's free!",
      'qwertyuiopasdfghjklzxcvbnm',
      'Click the logo!',
      'These messages are random.',
      'Press ESC to pause!',
      'Made in TypeScript!',
      'Phaser 3!',
      'I do not know if this text will appear on screen correctly',
      'undefined',
      'I hope this works',
      'Tip: You cannot jump.',
      'With added circles!'
    ]
  }

  create() {
    // Create title images
    const SCREEN_X = 1800
    const SCREEN_Y = 1000
    this.background = this.add.tileSprite(0, 0, SCREEN_X, SCREEN_Y, 'titleBg')
    this.background.setOrigin(0, 0)
    this.logo = this.add.image(SCREEN_X / 2, 300, 'logo').setScale(0.5)
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
      'V0.6\n\n\n\n\n\n\n\n\n\n\n\n' + this.mainTexts[randomInt],
      this.textStyle
    ).setAlign('left')
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
          players: 1
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
          players: 2
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
        this.scene.start('LevelSelect')
      })
    })
  }

  update(time: number, delta: number): void {
    this.background.tilePositionX += 1 
  }
}
