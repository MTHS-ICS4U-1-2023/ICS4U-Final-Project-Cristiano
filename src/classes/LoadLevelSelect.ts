import levels from '../levels/main.json'
import levelsMulti from '../levels/multiplayer.json'

/**
 * Loads the levels to select from a json file
 */
export default class LoadLevelSelect {
  private currentScene: Phaser.Scene
  private textStyle: Phaser.GameObjects.TextStyle
  private levelButtons: Phaser.GameObjects.Container

  constructor(scene: Phaser.Scene, playerCount: number, textStyle: Phaser.GameObjects.TextStyle) {
    // Load levels
    let levelJson = levels
    if (playerCount == 2) {
      levelJson = levelsMulti
    }
    let numberOfLevels: number = 0
    while (true) {
      if (levelJson[numberOfLevels]) {
        numberOfLevels++
      } else {
        break
      }
    }
    // Remove test level from counting
    numberOfLevels--
    // Add level buttons
    this.levelButtons = scene.add.container()
    for (let counter: number = 1; counter <= numberOfLevels; counter ++) {
      const selectedLevel = levelJson[counter]
      const maxLines: number = 8
      const yMultiplier = 100
      const yOffset = 10
      let levelButton = scene.add.text(190, (yMultiplier * counter) + yOffset, selectedLevel[0], textStyle)
      if (counter > maxLines) {
        levelButton.setPosition(
          900,
          (yMultiplier * (counter - maxLines) + yOffset)
        )
      }
      levelButton.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, levelButton.width, levelButton.height),
        Phaser.Geom.Rectangle.Contains
      )
      levelButton.on('pointerdown', () => {
        scene.scene.start('Game', {
          level: counter,
          players: playerCount
        })
      })
      this.levelButtons.add(levelButton)
    }
    this.currentScene = scene
    this.textStyle = textStyle
  }

  /**
   * Removes all of the level buttons and regenerates them
   * 
   * @param playerCount The player count levels to regen
   */
  public regenerate(playerCount: number) {
    this.levelButtons.destroy()
    // Load levels
    let levelJson = levels
    if (playerCount == 2) {
      levelJson = levelsMulti
    }
    let numberOfLevels: number = 0
    while (true) {
      if (levelJson[numberOfLevels]) {
        numberOfLevels++
      } else {
        break
      }
    }
    // Remove test level from counting
    numberOfLevels--
    // Add level buttons
    this.levelButtons = this.currentScene.add.container()
    for (let counter: number = 1; counter <= numberOfLevels; counter ++) {
      const selectedLevel = levelJson[counter]
      const maxLines: number = 8
      const yMultiplier = 100
      const yOffset = 10
      let levelButton = this.currentScene.add.text(190, (yMultiplier * counter) + yOffset, selectedLevel[0], this.textStyle)
      if (counter > maxLines) {
        levelButton.setPosition(
          900,
          (yMultiplier * (counter - maxLines) + yOffset)
        )
      }
      levelButton.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, levelButton.width, levelButton.height),
        Phaser.Geom.Rectangle.Contains
      )
      levelButton.on('pointerdown', () => {
        this.currentScene.scene.start('Game', {
          level: counter,
          players: playerCount
        })
      })
      this.levelButtons.add(levelButton)
    }
  }
}
