import { Scene } from 'phaser'
import LoadLevel from '../classes/LoadLevel'
import Player from '../classes/Player'
import Box from '../classes/Box'

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera
  background: Phaser.GameObjects.TileSprite
  levelLoader: LoadLevel
  player: Player
  box: Box
  boxCollision: Phaser.Physics.Arcade.StaticBody
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
    this.background = this.add.tileSprite(0, 0, 1800, 1000, 'gameBg')
    this.background.setOrigin(0, 0)

    // Create player
    this.player = this.physics.add.existing(new Player(this, 0, 0))

    // Create box
    this.levelLoader = new LoadLevel(this, this.currentLevel, this.player)

    /*
    this.box = this.physics.add.existing(new Box(this, 1, 0, this.player))
    this.physics.add.existing(new Box(this, 2, 0, this.player))
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

    if (keyUpArrow.isDown && keyRightArrow.isDown || keyW.isDown && keyD.isDown) {
      this.player.move('upRight')
    } else if (keyUpArrow.isDown && keyLeftArrow.isDown || keyW.isDown && keyA.isDown) {
      this.player.move('upLeft')
    } else if (keyDownArrow.isDown && keyRightArrow.isDown || keyS.isDown && keyD.isDown) {
      this.player.move('downRight')
    } else if (keyDownArrow.isDown && keyLeftArrow.isDown || keyS.isDown && keyA.isDown) {
      this.player.move('downLeft')
    } else if (keyUpArrow.isDown || keyW.isDown) {
      this.player.move('up')
    } else if (keyDownArrow.isDown || keyS.isDown) {
      this.player.move('down')
    } else if (keyLeftArrow.isDown || keyA.isDown) {
      this.player.move('left')
    } else if (keyRightArrow.isDown || keyD.isDown) {
      this.player.move('right')
    } else {
      this.player.move('')
    }

    // Screen boundaries
    const PLAYER_MIDDLE = 125 / 2
    const UP_BOUND_Y: number = PLAYER_MIDDLE
    const DOWN_BOUND_Y: number = 1000 - PLAYER_MIDDLE
    const LEFT_BOUND_X: number = UP_BOUND_Y
    const RIGHT_BOUND_X: number = 1800 - PLAYER_MIDDLE

    if (this.player.y < UP_BOUND_Y) {
      this.player.y = UP_BOUND_Y
    }
    if (this.player.y > DOWN_BOUND_Y) {
      this.player.y = DOWN_BOUND_Y
    }
    if (this.player.x < LEFT_BOUND_X) {
      this.player.x = LEFT_BOUND_X
    }
    if (this.player.x > RIGHT_BOUND_X) {
      this.player.x = RIGHT_BOUND_X
    }
  }
}
