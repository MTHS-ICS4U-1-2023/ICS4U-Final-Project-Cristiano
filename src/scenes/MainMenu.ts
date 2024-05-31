import { Scene, GameObjects } from 'phaser'

export class MainMenu extends Scene {
  background: GameObjects.TileSprite
  logo: GameObjects.Image
  title: GameObjects.Text
  createdText: GameObjects.Text
  textStyle: GameObjects.TextStyle

  constructor() {
    super('MainMenu')
    console.log('Main Menu Scene')

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
    this.background = this.add.tileSprite(0, 0, 1800, 1000, 'titleBg')
    this.background.setOrigin(0, 0)
    this.logo = this.add.image(1800 / 2, 300, 'logo').setScale(0.5)
    this.title = this.add.text(1800 / 2, 1000 / 2, 'Click here to play!', this.textStyle).setOrigin(0.5)
    this.title.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.title.width, this.title.height),
      Phaser.Geom.Rectangle.Contains
    )
    this.title.on('pointerdown', () => {
      this.scene.start('Game', {
        level: 1
      })
    })
  }

  update(time: number, delta: number): void {
    this.background.tilePositionX += 1 
  }
}
