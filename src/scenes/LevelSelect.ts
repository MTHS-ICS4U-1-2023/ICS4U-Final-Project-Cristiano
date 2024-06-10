import { Scene, GameObjects } from 'phaser'
import LoadLevelSelect from '../classes/LoadLevelSelect'

export class LevelSelect extends Scene {
  private background: GameObjects.TileSprite
  private selectBackground: GameObjects.Image
  private returnText: GameObjects.Text
  private textStyle: GameObjects.TextStyle
  private playerOneImage: GameObjects.Image
  private playerTwoImage: GameObjects.Image
  private levelSelectLoader: LoadLevelSelect

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

  create() {
    // Create title images
    const SCREEN_X = 1800
    const SCREEN_Y = 1000
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
    const playerScale = 0.25
    this.playerOneImage = this.add.image(90, 163, 'playerImg').setScale(playerScale)
    this.playerOneImage.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.playerOneImage.width, this.playerOneImage.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.playerOneImage.on('pointerdown', () => {
      this.levelSelectLoader.regenerate(1)
    })
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

    // Load levels to select
    this.levelSelectLoader = new LoadLevelSelect(this, 1, this.textStyle)
  }

  update(time: number, delta: number): void {
    this.background.tilePositionX += 1 
  }
}
