import { Scene } from 'phaser'

export class Preloader extends Scene {
  constructor() {
    super('Preloader')
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.tileSprite(0, 0, 1920, 1080, 'splashBg').setOrigin(0, 0)

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(1920 / 2, 1080 / 2, 468, 32).setStrokeStyle(1, 0xffffff)

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle((1920 / 2)-230, 1080 / 2, 4, 28, 0xffffff)

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {

        //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
        bar.width = 4 + (460 * progress)

    })
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('assets')

    // Background images
    this.load.image('titleBg', 'backgrounds/titleBackground.png')
    this.load.image('gameBg', 'backgrounds/gameBackground.png')
    this.load.image('pauseBg', 'backgrounds/pauseBackground.png')
    this.load.image('gameBgSpecial', 'backgrounds/gameBackgroundSpecial.png')

    // Other images
    this.load.image('logo', 'images/logo.png')
    this.load.image('box', 'images/box.png')
    this.load.image('lavaBox', 'images/lavaBox.png')
    this.load.image('moveBox', 'images/moveBox.png')
    this.load.image('steelBox', 'images/steelBox.png')
    this.load.image('goal', 'images/goal.png')
    this.load.image('powerUp', 'images/powerUp.png')
    this.load.image('powerUpCover', 'images/powerUpCover.png')
    this.load.image('redKeyDoor', 'images/redKeyDoor.png')
    this.load.image('redKey', 'images/redKey.png')
    this.load.image('blueKeyDoor', 'images/blueKeyDoor.png')
    this.load.image('blueKey', 'images/blueKey.png')
    this.load.image('greenKeyDoor', 'images/greenKeyDoor.png')
    this.load.image('greenKey', 'images/greenKey.png')
    this.load.image('levelBanner', 'images/levelBanner.png')
    this.load.image('playerImg', 'images/player.png')
    this.load.image('playerTwoImg', 'images/playerTwo.png')
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start('MainMenu')
  }
}
