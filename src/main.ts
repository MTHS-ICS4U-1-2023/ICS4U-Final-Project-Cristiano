import { Boot } from './scenes/Boot'
import { Game as MainGame } from './scenes/Game'
import { MainMenu } from './scenes/MainMenu'
import { Credits } from './scenes/Credits'
import { Preloader } from './scenes/Preloader'
import { LevelSelect } from './scenes/LevelSelect'
import { Game, Types } from "phaser"

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1800,
    height: 1000,
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Credits,
        LevelSelect,
        MainGame
    ]
};

export default new Game(config);
