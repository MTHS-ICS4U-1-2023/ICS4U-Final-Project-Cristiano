/**
 * Creates a player
 */
export default class Player extends Phaser.Physics.Arcade.Sprite {
  public powerUpHat: Phaser.GameObjects.Image
  public redKeysHeld: number
  public blueKeysHeld: number
  public greenKeysHeld: number
  public isDeleted: boolean
  private currentScene: Phaser.Scene

  constructor(scene: Phaser.Scene, playerX: number, playerY: number, playerNumber: number) {
    // Player X and Y values
    playerX = 100 + playerX * 200
    playerY = 100 + playerY * 200
    // Player image selector
    let playerImageString = 'playerImg'
    if (playerNumber == 2) {
      playerImageString = 'playerTwoImg'
    }
    // Create player
    super(scene, playerX, playerY, playerImageString)
    this.redKeysHeld = 0
    this.blueKeysHeld = 0
    this.greenKeysHeld = 0
    this.isDeleted = false
    this.setScale(0.25)
    this.setDepth(2)
    // Import scene
    this.currentScene = scene
    scene.add.existing(this)
  }

  /**
   * Creates the player's power up hat
   */
  public createPowerUpHat() {
    this.powerUpHat = this.currentScene.physics.add.sprite(this.x, this.y, 'powerUpCover')
    this.powerUpHat.setScale(0.2)
    this.powerUpHat.setDepth(3)
  }

  /**
   * Moves the player in a direction.
   * Stops moving the player is an invalid move key is set.
   *
   * @param moveKey the key that says what direction the player will move in
   */
  public move(moveKey: string) {
    const PLAYER_SPEED = 5 * 100

    try {
      switch (moveKey) {
        case 'up':
          this.setVelocity(0, -PLAYER_SPEED)
          break
        case 'down':
          this.setVelocity(0, PLAYER_SPEED)
          break
        case 'left':
          this.setVelocity(-PLAYER_SPEED, 0)
          break
        case 'right':
          this.setVelocity(PLAYER_SPEED, 0)
          break
        case 'upRight':
          this.setVelocity(PLAYER_SPEED, -PLAYER_SPEED)
          break
        case 'upLeft':
          this.setVelocity(-PLAYER_SPEED, -PLAYER_SPEED)
          break
        case 'downRight':
          this.setVelocity(PLAYER_SPEED, PLAYER_SPEED)
          break
        case 'downLeft':
          this.setVelocity(-PLAYER_SPEED, PLAYER_SPEED)
          break
        default:
          this.setVelocity(0, 0)
          break
      }
    } catch (error) {
      this.isDeleted = true
    }
  }
}
