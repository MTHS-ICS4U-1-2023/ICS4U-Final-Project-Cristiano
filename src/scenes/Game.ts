import { Scene } from 'phaser'
import Player from '../classes/Player'
//import Box from '../classes/Box'

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera
  background: Phaser.GameObjects.TileSprite
  map: Phaser.Tilemaps.Tilemap
  player: Player
  box: Box
  currentLevel: number

  constructor() {
    super('Game')
    console.log('Game Scene')
  }

  init(data: any) {
    this.currentLevel = data.level
    console.log(`Current level: ${this.currentLevel}`)
  }

  create() {
    this.camera = this.cameras.main

    // Create background
    this.background = this.add.tileSprite(0, 0, 1920, 1080, 'gameBg')
    this.background.setOrigin(0, 0)

    // Create player
    this.player = this.physics.add.existing(new Player(this, 0, 0))

    // Create boxes
    /*
    this.map = this.add.tilemap('level')
    var tileset = this.map.addTilesetImage('box', 'gameBoxes')
    */
  }

  update(time: number, delta: number): void {
    // Movement
    const keyUpArrow = this.input.keyboard.addKey("UP")
    const keyDownArrow = this.input.keyboard.addKey("DOWN")
    const keyLeftArrow = this.input.keyboard.addKey("LEFT")
    const keyRightArrow = this.input.keyboard.addKey("RIGHT")
    const keyW = this.input.keyboard.addKey("W")
    const keyS = this.input.keyboard.addKey("S")
    const keyA = this.input.keyboard.addKey("A")
    const keyD = this.input.keyboard.addKey("D")

    if (keyUpArrow.isDown || keyW.isDown === true) {
      this.player.move('up')
    }

    if (keyDownArrow.isDown || keyS.isDown === true) {
      this.player.move('down')
    }

    if (keyLeftArrow.isDown || keyA.isDown === true) {
      this.player.move('left')
    }

    if (keyRightArrow.isDown || keyD.isDown === true) {
      this.player.move('right')
    }
  }
}
