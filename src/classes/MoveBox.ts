import Player from "./Player"

export default class MoveBox extends Phaser.Physics.Arcade.Sprite {
  /**
   * Creates a box that can be moved by the player
   *
   * @param scene The scene to put the object into
   * @param gridX The X grid position
   * @param gridY The Y grid position
   * @param player The first player
   * @param playerTwo The second player or null
   */
  constructor(scene: Phaser.Scene, gridX: number, gridY: number, player: Player, playerTwo: Player | null) {
    // Create box
    const posX = 100 + gridX * 200
    const posY = 100 + gridY * 200
    super(scene, posX, posY, 'moveBox')
    this.setScale(0.3)
    // Create player colliders
    const velocityMultiplier = 3
    scene.physics.add.collider(player, this, function(playerCollide, boxCollide) {
      let moveBoxVelocityX = boxCollide.body?.velocity.x * velocityMultiplier
      let moveBoxVelocityY = boxCollide.body?.velocity.y * velocityMultiplier
      boxCollide.setVelocity(
        moveBoxVelocityX,
        moveBoxVelocityY
      )
    })
    if (playerTwo) {
      scene.physics.add.collider(playerTwo, this, function(playerCollide, boxCollide) {
        let moveBoxVelocityX = boxCollide.body?.velocity.x * velocityMultiplier
        let moveBoxVelocityY = boxCollide.body?.velocity.y * velocityMultiplier
        boxCollide.setVelocity(
          moveBoxVelocityX,
          moveBoxVelocityY
        )
      })
    }
    scene.add.existing(this)
  }
}
