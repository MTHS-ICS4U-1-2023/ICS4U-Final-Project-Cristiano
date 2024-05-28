import Player from "./Player"

export default class Box extends Phaser.GameObjects.Image {
  currentScene: Phaser.Scene
  collision: Phaser.Physics.Arcade.StaticBody

  constructor(scene: Phaser.Scene, gridX: number, gridY: number, player: Player) {
    // Create box
    const posX = 100 + gridX * 200
    const posY = 100 + gridY * 200
    super(scene, posX, posY, 'box')
    this.setScale(0.4)
    // Create collider
    this.collision = scene.physics.add.staticBody(posX - 100, posY - 100, this.width * 0.4, this.height * 0.4)
    scene.physics.add.collider(player, this.collision)
    scene.add.existing(this)
  }
}
