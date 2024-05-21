export default class Player extends Phaser.Physics.Arcade.Sprite {
  currentScene: Phaser.Scene

  constructor(scene: Phaser.Scene, playerX: number, playerY: number) {
    super(scene, 100 + playerX * 200, 100 + playerY * 200, 'playerImg')
    this.setScale(0.25)
    scene.add.existing(this)
  }

  /**
   * Moves the player in a direction bounded by screen borders.
   *
   * @param moveKey the key that says what direction the player will move in
   */
  move(moveKey: string) {
    const PLAYER_SPEED = 10
    const PLAYER_MIDDLE = 125 / 2
    const UP_BOUND_Y: number = PLAYER_MIDDLE
    const DOWN_BOUND_Y: number = 1080 - PLAYER_MIDDLE
    const LEFT_BOUND_X: number = UP_BOUND_Y
    const RIGHT_BOUND_X: number = 1920 - PLAYER_MIDDLE

    switch (moveKey) {
      case 'up':
        this.y -= PLAYER_SPEED
        if (this.y < UP_BOUND_Y) {
          this.y = UP_BOUND_Y
        }
        break
      case 'down':
        this.y += PLAYER_SPEED
        if (this.y > DOWN_BOUND_Y) {
          this.y = DOWN_BOUND_Y
        }
        break
      case 'left':
        this.x -= PLAYER_SPEED
        if (this.x < LEFT_BOUND_X) {
          this.x = LEFT_BOUND_X
        }
        break
      case 'right':
        this.x += PLAYER_SPEED
        if (this.x > RIGHT_BOUND_X) {
          this.x = RIGHT_BOUND_X
        }
        break
    }
  }
}
