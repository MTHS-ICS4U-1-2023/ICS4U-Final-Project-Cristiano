import levels from '../levels/main.json'
import bounds from '../levels/bounds.json'
import Player from './Player'
import Goal from './Goal'
import Box from './Box'
import LavaBox from './LavaBox'
import MoveBox from './MoveBox'
import SteelBox from './SteelBox'
import PowerUp from './PowerUp'
import RedKeyDoor from './RedKeyDoor'
import RedKey from './RedKey'
import BlueKeyDoor from './BlueKeyDoor'
import BlueKey from './BlueKey'
import GreenKeyDoor from './GreenKeyDoor'
import GreenKey from './GreenKey'

/**
 * Loads a level from a JSON file
 */
export default class LoadLevel {
  public levelName: string
  private boxes: Phaser.GameObjects.Container
  private boxCollider: Phaser.Physics.Arcade.Collider
  private lavaBoxes: Phaser.GameObjects.Container
  private moveBoxes: Phaser.GameObjects.Container
  private steelBoxes: Phaser.GameObjects.Container
  private goals: Phaser.GameObjects.Container
  private powerUps: Phaser.GameObjects.Container
  private redKeyDoors: Phaser.GameObjects.Container
  private redKeys: Phaser.GameObjects.Container
  private blueKeyDoors: Phaser.GameObjects.Container
  private blueKeys: Phaser.GameObjects.Container
  private greenKeyDoors: Phaser.GameObjects.Container
  private greenKeys: Phaser.GameObjects.Container

  constructor(currentScene: Phaser.Scene, level: number, player: Player) {
    /**
     * CurrentLevel properties:
     * 
     * Index 0: Level name
     * Index 1: Level bounds
     * Index 2+: Level objects
     */
    try {
      const currentLevel = levels[level]
      this.levelName = currentLevel[0]
      this.moveBoxes = currentScene.add.container()
      // Create moves boxes first because we need to give them collisions with other boxes
      for (let counterMove = 2; counterMove < currentLevel.length; counterMove++) {
        const currentObject = currentLevel[counterMove]
        if (currentObject[0] == 'moveBox') {
          const moveBox = currentScene.physics.add.existing(new MoveBox(currentScene, currentObject[1], currentObject[2], player))
          this.moveBoxes.add(moveBox)
        }
      }
      // Add object containers
      this.boxes = currentScene.add.container()
      this.lavaBoxes = currentScene.add.container()
      this.steelBoxes = currentScene.add.container()
      this.goals = currentScene.add.container()
      this.powerUps = currentScene.add.container()
      this.redKeyDoors = currentScene.add.container()
      this.redKeys = currentScene.add.container()
      this.blueKeyDoors = currentScene.add.container()
      this.blueKeys = currentScene.add.container()
      this.greenKeyDoors = currentScene.add.container()
      this.greenKeys = currentScene.add.container()
      for (let counter = 2; counter < currentLevel.length; counter++) {
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
            const colliderBox = currentScene.physics.add.existing(new Box(currentScene, currentObject[1], currentObject[2], this.moveBoxes))
            colliderBox.setImmovable(true)
            this.boxes.add(colliderBox)
            break
          case 'goal':
            const colliderGoal = currentScene.physics.add.existing(new Goal(currentScene, currentObject[1], currentObject[2]))
            colliderGoal.setImmovable(true)
            this.goals.add(colliderGoal)
            break
          case 'lavaBox':
            const colliderLavaBox = currentScene.physics.add.existing(new LavaBox(currentScene, currentObject[1], currentObject[2], this.moveBoxes))
            colliderLavaBox.setImmovable(true)
            this.lavaBoxes.add(colliderLavaBox)
            break
          case 'steelBox':
            const colliderSteelBox = currentScene.physics.add.existing(new SteelBox(currentScene, currentObject[1], currentObject[2], this.moveBoxes))
            colliderSteelBox.setImmovable(true)
            this.steelBoxes.add(colliderSteelBox)
            break
          case 'powerUp':
            const colliderPower = currentScene.physics.add.existing(new PowerUp(currentScene, currentObject[1], currentObject[2]))
            colliderPower.setImmovable(true)
            this.powerUps.add(colliderPower)
            break
          case 'redKeyDoor':
            const colliderRedKeyDoor = currentScene.physics.add.existing(new RedKeyDoor(currentScene, currentObject[1], currentObject[2], this.moveBoxes))
            colliderRedKeyDoor.setImmovable(true)
            this.redKeyDoors.add(colliderRedKeyDoor)
            break
          case 'redKey':
            const colliderRedKey = currentScene.physics.add.existing(new RedKey(currentScene, currentObject[1], currentObject[2]))
            colliderRedKey.setImmovable(true)
            this.redKeys.add(colliderRedKey)
            break
          case 'blueKeyDoor':
            const colliderBlueKeyDoor = currentScene.physics.add.existing(new BlueKeyDoor(currentScene, currentObject[1], currentObject[2], this.moveBoxes))
            colliderBlueKeyDoor.setImmovable(true)
            this.blueKeyDoors.add(colliderBlueKeyDoor)
            break
          case 'blueKey':
            const colliderBlueKey = currentScene.physics.add.existing(new BlueKey(currentScene, currentObject[1], currentObject[2]))
            colliderBlueKey.setImmovable(true)
            this.blueKeys.add(colliderBlueKey)
            break
          case 'greenKeyDoor':
            const colliderGreenKeyDoor = currentScene.physics.add.existing(new GreenKeyDoor(currentScene, currentObject[1], currentObject[2], this.moveBoxes))
            colliderGreenKeyDoor.setImmovable(true)
            this.greenKeyDoors.add(colliderGreenKeyDoor)
            break
          case 'greenKey':
            const colliderGreenKey = currentScene.physics.add.existing(new GreenKey(currentScene, currentObject[1], currentObject[2]))
            colliderGreenKey.setImmovable(true)
            this.greenKeys.add(colliderGreenKey)
            break
        }
      }
      // Create screen boundary
      const boundKey: String = currentLevel[1]
      const screenBounds = bounds[boundKey]
      for (let counter = 0; counter < screenBounds.length; counter++) {
        const currentObject = screenBounds[counter]
        const colliderSteelBox = currentScene.physics.add.existing(new SteelBox(currentScene, currentObject[1], currentObject[2], this.moveBoxes))
        colliderSteelBox.setImmovable(true)
        this.steelBoxes.add(colliderSteelBox)
      }
      /* Create player colliders */
      // Box
      this.boxCollider = currentScene.physics.add.collider(player, this.boxes.getAll())
      // Goal
      currentScene.physics.add.collider(player, this.goals.getAll(), function() {
        currentScene.scene.restart({ level: level + 1 })
      })
      // Lava box
      currentScene.physics.add.collider(player, this.lavaBoxes.getAll(), function() {
        currentScene.scene.restart()
      })
      // Steel box
      currentScene.physics.add.collider(player, this.steelBoxes.getAll())
      // Power up
      currentScene.physics.add.collider(player, this.powerUps.getAll(), (playerCollide, powerCollide) => {
        playerCollide.createPowerUpHat()
        this.boxCollider.destroy()
        powerCollide.destroy()
      })
      // Red key door
      currentScene.physics.add.collider(player, this.redKeyDoors.getAll(), (playerCollide, keyDoorCollide) => {
        if (playerCollide.redKeysHeld > 0) {
          keyDoorCollide.destroy()
          playerCollide.redKeysHeld--
        }
      })
      // Red key
      currentScene.physics.add.collider(player, this.redKeys.getAll(), (playerCollide, keyCollide) => {
        keyCollide.destroy()
        playerCollide.redKeysHeld++
      })
      // Blue key door
      currentScene.physics.add.collider(player, this.blueKeyDoors.getAll(), (playerCollide, keyDoorCollide) => {
        if (playerCollide.blueKeysHeld > 0) {
          keyDoorCollide.destroy()
          playerCollide.blueKeysHeld--
        }
      })
      // Blue key
      currentScene.physics.add.collider(player, this.blueKeys.getAll(), (playerCollide, keyCollide) => {
        keyCollide.destroy()
        playerCollide.blueKeysHeld++
      })
      // Green key door
      currentScene.physics.add.collider(player, this.greenKeyDoors.getAll(), (playerCollide, keyDoorCollide) => {
        if (playerCollide.greenKeysHeld > 0) {
          keyDoorCollide.destroy()
          playerCollide.greenKeysHeld--
        }
      })
      // Green key
      currentScene.physics.add.collider(player, this.greenKeys.getAll(), (playerCollide, keyCollide) => {
        keyCollide.destroy()
        playerCollide.greenKeysHeld++
      })
    } catch (error) {
      currentScene.scene.switch('MainMenu')
    }
  }
}
