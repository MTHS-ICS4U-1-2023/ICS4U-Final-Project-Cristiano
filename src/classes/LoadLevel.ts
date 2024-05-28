import levels from '../levels/main.json'
import Player from './Player'
import Box from './Box'

export default class LoadLevel {
  constructor(scene: Phaser.Scene, level: number, player: Player) {
    const currentLevel: String[] = levels[level]
    for (let counter: number = 0; counter < currentLevel.length; counter++) {
      /*
        Current object values:
        0 = Object type
        1 = X position
        2 = Y position
      */
      const currentObject = currentLevel[counter]
      switch (currentObject[0]) {
        case 'box':
          scene.physics.add.existing(new Box(scene, currentObject[1], currentObject[2], player))
      }
    }
  }
}
