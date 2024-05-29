import levels from '../levels/main.json'
import Player from './Player'
import Goal from './Goal'
import Box from './Box'
import LavaBox from './LavaBox'
import MoveBox from './MoveBox'
import SteelBox from './SteelBox'
import PowerUp from './PowerUp'

export default class LoadLevel {
  boxes: Phaser.GameObjects.Container
  boxCollider: Phaser.Physics.Arcade.Collider
  lavaBoxes: Phaser.GameObjects.Container
  moveBoxes: Phaser.GameObjects.Container
  steelBoxes: Phaser.GameObjects.Container
  goals: Phaser.GameObjects.Container
  powerUps: Phaser.GameObjects.Container

  constructor(scene: Phaser.Scene, level: number, player: Player) {
    const currentLevel = levels[level]
    this.moveBoxes = scene.add.container()
    // Create moves boxes first because we need to give them collisions with other boxes
    // Counter starts as index 1 since index 0 is the boundary type
    for (let counterMove = 1; counterMove < currentLevel.length; counterMove++) {
      const currentObject = currentLevel[counterMove]
      if (currentObject[0] == 'moveBox') {
        const moveBox = scene.physics.add.existing(new MoveBox(scene, currentObject[1], currentObject[2], player))
        this.moveBoxes.add(moveBox)
      }
    }
    // Add object containers
    this.boxes = scene.add.container()
    this.lavaBoxes = scene.add.container()
    this.steelBoxes = scene.add.container()
    this.goals = scene.add.container()
    this.powerUps = scene.add.container()
    for (let counter = 1; counter < currentLevel.length; counter++) {
      /*
        Current object values:
        0 = Object type
        1 = X position
        2 = Y position
      */
      const currentObject = currentLevel[counter]
      // Create other boxes
      switch (currentObject[0]) {
        case 'box':
          const colliderBox = scene.physics.add.existing(new Box(scene, currentObject[1], currentObject[2], this.moveBoxes))
          colliderBox.setImmovable(true)
          this.boxes.add(colliderBox)
          break
        case 'goal':
          const colliderGoal = scene.physics.add.existing(new Goal(scene, currentObject[1], currentObject[2], this.moveBoxes))
          colliderGoal.setImmovable(true)
          this.goals.add(colliderGoal)
          break
        case 'lavaBox':
          const colliderLavaBox = scene.physics.add.existing(new LavaBox(scene, currentObject[1], currentObject[2], this.moveBoxes))
          colliderLavaBox.setImmovable(true)
          this.lavaBoxes.add(colliderLavaBox)
          break
        case 'steelBox':
          const colliderSteelBox = scene.physics.add.existing(new SteelBox(scene, currentObject[1], currentObject[2], this.moveBoxes))
          colliderSteelBox.setImmovable(true)
          this.steelBoxes.add(colliderSteelBox)
          break
        case 'powerUp':
          const colliderPower = scene.physics.add.existing(new PowerUp(scene, currentObject[1], currentObject[2]))
          colliderPower.setImmovable(true)
          this.powerUps.add(colliderPower)
          break
      }
    }
    // Create screen boundary
    const boundKey: String = currentLevel[0]
    const screenBounds = levels[boundKey]
    for (let counter = 0; counter < screenBounds.length; counter++) {
      const currentObject = screenBounds[counter]
      const colliderSteelBox = scene.physics.add.existing(new SteelBox(scene, currentObject[1], currentObject[2], this.moveBoxes))
      colliderSteelBox.setImmovable(true)
      this.steelBoxes.add(colliderSteelBox)
    }
    // Add player colliders
    this.boxCollider = scene.physics.add.collider(player, this.boxes.getAll())
    scene.physics.add.collider(player, this.goals.getAll(), function(playerCollide, goalCollide) {
      console.log('Goal!')
      goalCollide.destroy()
    })
    scene.physics.add.collider(player, this.lavaBoxes.getAll(), function(playerCollide, boxCollide) {
      console.log('Player lost')
    })
    scene.physics.add.collider(player, this.steelBoxes.getAll())
    scene.physics.add.collider(player, this.powerUps.getAll(), (playerCollide, powerCollide) => {
      playerCollide.powerUpHat.setVisible(true)
      this.boxCollider.destroy()
      powerCollide.destroy()
    })
  }
}
