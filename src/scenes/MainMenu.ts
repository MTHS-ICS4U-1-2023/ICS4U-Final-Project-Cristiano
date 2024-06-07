import { Scene, GameObjects } from 'phaser'

export class MainMenu extends Scene {
  private background: GameObjects.TileSprite
  private logo: GameObjects.Image
  private title: GameObjects.Text
  private onePlayerImage: GameObjects.Image
  private twoPlayerImage: GameObjects.Image
  private versionText: GameObjects.Text
  private createdTextOne: GameObjects.Text
  private createdTextTwo: GameObjects.Text
  private textStyle: GameObjects.TextStyle
  private mainTexts: string[]

  constructor() {
    super('MainMenu')

    this.textStyle = {
      fontFamily: 'Arial Black',
      fontSize: 60,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center'
    }

    this.mainTexts = [
      'This is a string.',
      'Try the original!',
      'Shoutouts to Lava World!',
      'Made in 2024!',
      "It's free!",
      'qwertyuiopasdfghjklzxcvbnm',
      'Click the logo!',
      'This is random.',
      'Press ESC to pause!'
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
      this.scene.switch('Credits')
    })
    // Find a random string to show
    const maxNumber = this.mainTexts.length
    const randomInt = Math.floor(Math.random() * maxNumber);
    this.versionText = this.add.text(
      0,
      0,
      'V0.5\n\n\n\n\n\n\n\n\n\n\n\n' + this.mainTexts[randomInt],
      this.textStyle
    ).setAlign('left')
    this.title = this.add.text(SCREEN_X / 2, SCREEN_Y / 2, 'Click here to play!', this.textStyle).setOrigin(0.5)
    this.title.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.title.width, this.title.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.title.on('pointerdown', () => {
      // Change menu section
      this.title.disableInteractive()
      this.title.setVisible(false)
      // One player
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
      // Two players
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
    })
  }

  update(time: number, delta: number): void {
    this.background.tilePositionX += 1 
  }
}
