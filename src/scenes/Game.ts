import { Scene } from 'phaser'
import LoadLevel from '../classes/LoadLevel'
import Player from '../classes/Player'
import LevelBanner from '../classes/LevelBanner'
import SettingsMenu from '../classes/SettingsMenu'
import Timer from '../classes/Timer'

export class Game extends Scene {
  /**
   * The level loader
   */
  private levelLoader: LoadLevel

  /**
   * Pause menu background image
   */
  private pauseBackground: Phaser.GameObjects.Image

  /**
   * Pause menu text style
   */
  private pauseTextStyle: Phaser.GameObjects.TextStyle

  /**
   * Container that contains pause menu elements
   */
  private pauseContainer: Phaser.GameObjects.Container

  /**
   * Pause menu button text style
   */
  private pauseButtonTextStyle: Phaser.GameObjects.TextStyle

  /**
   * Pause menu text
   */
  private pauseText: Phaser.GameObjects.Text

  /**
   * Restart button for the pause menu
   */
  private restartButton: Phaser.GameObjects.Text

  /**
   * Go back button for the pause menu
   */
  private goBackButton: Phaser.GameObjects.Text

  /**
   * Go to the level select button for the pause menu
   */
  private gotoLvSelectButton: Phaser.GameObjects.Text

  /**
   * Player settings
   */
  private settings: SettingsMenu

  /**
   * Checks if the current level is completed as a bool
   */
  private levelComplete: boolean

  /**
   * Game timer
   */
  private timer: Timer | null

  /**
   * The game camera
   */
  public camera: Phaser.Cameras.Scene2D.Camera

  /**
   * Game background
   */
  public background: Phaser.GameObjects.TileSprite

  /**
   * The current player one
   */
  public player: Player

  /**
   * The current player two
   */
  public playerTwo: Player | null

  /**
   * The level banner
   */
  public levelBanner: LevelBanner

  /**
   * The box collision for the level
   */
  public boxCollision: Phaser.Physics.Arcade.StaticBody

  /**
   * The current level number
   */
  public currentLevel: number

  /**
   * The current number of players
   */
  public players: number

  /**
   * Loads the game
   */
  constructor() {
    super('Game')
    // Create initial variables
    this.levelComplete = false
    this.playerTwo = null
    this.timer = null
    this.pauseTextStyle = {
      fontFamily: 'Arial Black',
      fontSize: 60,
      color: '#000000',
      stroke: '#ffffff',
      strokeThickness: 8,
      align: 'left'
    }
    this.pauseButtonTextStyle = {
      fontFamily: 'Arial Black',
      fontSize: 60,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'left'
    }
  }

  /**
   * Disables or enables the pause menu.
   *
   * @param state true or false
   */
  private showPauseMenu(state: boolean) {
    // Halt player movement
    this.input.keyboard.resetKeys()
    // Change pause GUI element visibility
    for (let counter: number = 0; counter < this.pauseContainer.length; counter++) {
      this.pauseContainer.getAt(counter).setVisible(state)
    }
  }

  /**
   * Starts the next level
   */
  private gotoNextLevel() {
    this.scene.restart({
      level: this.currentLevel + 1,
      players: this.players,
      settings: this.settings
    })
  }

  /**
   * Loses the current level, restarting the game
   * 
   * @param playerLostNumber The player that lost the level
   */
  public loseLevel(playerLostNumber: number) {
    // Text constants
    const SCREEN_X = 1800
    const SCREEN_Y = 1000
    const textDepth = 11
    if (this.settings.skipLevelComplete == false) {
      const winLevelText: Phaser.GameObjects.Text = this.add.text(
        SCREEN_X / 2,
        SCREEN_Y / 2,
        `Player ${playerLostNumber} lost!`,
        this.pauseTextStyle
      )
        .setOrigin()
        .setFontSize(100)
        .setDepth(textDepth)
        .setAlign('center')
      this.time.addEvent({
        delay: 3000,
        callback: () => {
          this.scene.restart()
        }
      })
    } else {
      this.scene.restart()
    }
  }

  /**
   * Wins the current level, starting the next one
   */
  public winLevel() {
    // Text constants
    const SCREEN_X = 1800
    const SCREEN_Y = 1000
    const textDepth = 11
    this.levelComplete = true
    if (this.settings.skipLevelComplete == false) {
      if (this.settings.showTime == true) {
        // Edit timer
        const textOffsetY = 100
        this.timer?.toggle()
        this.timer?.setOrigin()
        this.timer?.setFontSize(180)
        this.timer?.setPosition(SCREEN_X / 2, SCREEN_Y / 2 - textOffsetY)
        this.timer?.setDepth(textDepth)
        // Make countdown
        const countdownText: Phaser.GameObjects.Text = this.add.text(
          SCREEN_X / 2,
          SCREEN_Y / 2 + textOffsetY,
          '3',
          this.pauseTextStyle
        )
          .setFontSize(100)
          .setDepth(textDepth)
          .setOrigin()
        this.time.addEvent({
          delay: 1000,
          callback: () => {
            countdownText.setText('2')
          }
        })
        this.time.addEvent({
          delay: 2000,
          callback: () => {
            countdownText.setText('1')
          }
        })
        this.time.addEvent({
          delay: 3000,
          callback: () => {
            this.gotoNextLevel()
          }
        })
      } else {
        const winLevelText: Phaser.GameObjects.Text = this.add.text(
          SCREEN_X / 2,
          SCREEN_Y / 2,
          `Level ${this.currentLevel} complete!`,
          this.pauseTextStyle
        )
          .setOrigin()
          .setFontSize(100)
          .setDepth(textDepth)
          .setAlign('center')
        this.time.addEvent({
          delay: 3000,
          callback: () => {
            this.gotoNextLevel()
          }
        })
      }
    } else {
      this.gotoNextLevel()
    }
  }

  /**
   * Initializes game data
   *
   * @param data The data imported
   */
  init(data: any) {
    this.currentLevel = data.level
    this.players = data.players
    this.settings = data.settings
  }

  /**
   * Creates the game scene
   */
  create() {
    this.camera = this.cameras.main

    // Create background
    this.background = this.add.tileSprite(0, 0, 1800, 1000, 'gameBg')
    this.background.setOrigin(0)

    // Create player(s)
    this.player = this.physics.add.existing(new Player(this, 0, 0, 1))

    if (this.players == 2) {
      this.playerTwo = this.physics.add.existing(new Player(this, 8, 0, 2))
    }

    // Load current level
    this.levelLoader = new LoadLevel(
      this, this.currentLevel, this.player, this.playerTwo, this.players, this.settings
    )
    this.levelComplete = false

    // Create level banner
    this.levelBanner = new LevelBanner(this, this.levelLoader.levelName, this.camera.zoom)

    // Create tutorial text
    if (this.currentLevel == 1) {
      let textX = 365
      let textY = 150
      let tutorialText: string = 'Movement:\nW\nA S D\nPress ESC to pause.'
      if (this.players == 2) {
        textX = 210
        textY = 200
        tutorialText = 'Movement (Blue):\nW\nA S D'
        this.add.text(textX + 810, textY, 'Movement (Red):\n↑\n← ↓ →', this.pauseButtonTextStyle)
          .setAlign('center')
      }
      this.add.text(textX, textY, tutorialText, this.pauseButtonTextStyle)
        .setAlign('center')
    }

    // Create pause menu
    const pauseDepth = 10
    this.pauseBackground = this.add.image(1800 / 2, 1000 / 2, 'pauseBg')
      .setOrigin(0.5)
      .setScale(0.75)
      .setAlpha(0.8)
      .setVisible(false)
    this.pauseText = this.add.text(250, 150, 'Pause Menu', this.pauseTextStyle)
      .setVisible(false)
    this.restartButton = this.add.text(250, this.pauseText.y + 100, 'Restart Level', this.pauseButtonTextStyle)
      .setVisible(false)
    this.restartButton.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, this.restartButton.width, this.restartButton.height),
        Phaser.Geom.Rectangle.Contains
      )
    this.restartButton.on('pointerdown', () => {
      this.scene.restart()
    })
    this.gotoLvSelectButton = this.add.text(250, this.restartButton.y + 100, 'Level Select', this.pauseButtonTextStyle)
      .setVisible(false)
    this.gotoLvSelectButton.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, this.gotoLvSelectButton.width, this.gotoLvSelectButton.height),
        Phaser.Geom.Rectangle.Contains
      )
    this.gotoLvSelectButton.on('pointerdown', () => {
        this.scene.start('LevelSelect', {
          settings: this.settings
        })
      })
    this.goBackButton = this.add.text(250, this.gotoLvSelectButton.y + 100, 'Return to Main Menu', this.pauseButtonTextStyle)
      .setVisible(false)
    this.goBackButton.setInteractive(
        new Phaser.Geom.Rectangle(0, 0, this.goBackButton.width, this.goBackButton.height),
        Phaser.Geom.Rectangle.Contains
      )
    this.goBackButton.on('pointerdown', () => {
        this.scene.start('MainMenu')
      })
    this.pauseContainer = this.add.container().add([
      this.pauseBackground,
      this.pauseText,
      this.restartButton,
      this.gotoLvSelectButton,
      this.goBackButton
    ])
    this.pauseContainer.setScale(this.pauseContainer.scale / this.camera.zoom)
    if (this.camera.zoom == 0.5) {
      this.pauseContainer.setPosition(-900, -500)
    }
    this.pauseContainer.setDepth(pauseDepth)
    
    // Create timer
    if (this.settings.showTime == true) {
      this.timer = new Timer(this, this.pauseButtonTextStyle).setDepth(pauseDepth - 1)
    }
  }

  /**
   * Runs every milisecond, handles keybinds (player movement, pause menu)
   */
  update(): void {
    // Key binds
    const keyUpArrow = this.input.keyboard.addKey('UP')
    const keyDownArrow = this.input.keyboard.addKey('DOWN')
    const keyLeftArrow = this.input.keyboard.addKey('LEFT')
    const keyRightArrow = this.input.keyboard.addKey('RIGHT')
    const keyW = this.input.keyboard.addKey('W')
    const keyS = this.input.keyboard.addKey('S')
    const keyA = this.input.keyboard.addKey('A')
    const keyD = this.input.keyboard.addKey('D')
    const keyEsc = this.input.keyboard.addKey('ESC')
    const keyEscDown = Phaser.Input.Keyboard.JustDown(keyEsc)

    /**
     * Disables or enables the movement keys.
     *
     * @param state true or false
     */
    function changeKeys(state: boolean) {
      keyUpArrow.enabled = state
      keyDownArrow.enabled = state
      keyLeftArrow.enabled = state
      keyRightArrow.enabled = state
      keyW.enabled = state
      keyS.enabled = state
      keyA.enabled = state
      keyD.enabled = state
    }

    if (keyEscDown && this.levelComplete == false) {
      if (this.pauseBackground.visible == false) {
        // Show menu and disable controls
        changeKeys(false)
        this.showPauseMenu(true)
      } else {
        // Hide menu and enable controls
        changeKeys(true)
        this.showPauseMenu(false)
      }
    }

    // Check if player one exists
    if (this.player.isDeleted == false) {
      // Update player power up hat
      if (this.player.powerUpHat != null) {
        this.player.powerUpHat.x = this.player.x
        this.player.powerUpHat.y = this.player.y
      }

      // Movement
      if (keyW.isDown && keyD.isDown) {
        this.player.move('upRight')
      } else if (keyW.isDown && keyA.isDown) {
        this.player.move('upLeft')
      } else if (keyS.isDown && keyD.isDown) {
        this.player.move('downRight')
      } else if (keyS.isDown && keyA.isDown) {
        this.player.move('downLeft')
      } else if (keyW.isDown) {
        this.player.move('up')
      } else if (keyS.isDown) {
        this.player.move('down')
      } else if (keyA.isDown) {
        this.player.move('left')
      } else if (keyD.isDown) {
        this.player.move('right')
      } else {
        this.player.move('')
      }
    }

    // Check if player two exists
    if (this.playerTwo) {
      if (this.playerTwo.isDeleted == false) {
        // Update player power up hat
        if (this.playerTwo.powerUpHat != null) {
          this.playerTwo.powerUpHat.x = this.playerTwo.x
          this.playerTwo.powerUpHat.y = this.playerTwo.y
        }
  
        // Movement
        if (keyUpArrow.isDown && keyRightArrow.isDown) {
          this.playerTwo.move('upRight')
        } else if (keyUpArrow.isDown && keyLeftArrow.isDown) {
          this.playerTwo.move('upLeft')
        } else if (keyDownArrow.isDown && keyRightArrow.isDown) {
          this.playerTwo.move('downRight')
        } else if (keyDownArrow.isDown && keyLeftArrow.isDown) {
          this.playerTwo.move('downLeft')
        } else if (keyUpArrow.isDown) {
          this.playerTwo.move('up')
        } else if (keyDownArrow.isDown) {
          this.playerTwo.move('down')
        } else if (keyLeftArrow.isDown) {
          this.playerTwo.move('left')
        } else if (keyRightArrow.isDown) {
          this.playerTwo.move('right')
        } else {
          this.playerTwo.move('')
        }
      }
    }

    // Timer update
    if (this.timer?.active == true) {
      this.timer.count()
    }
  }
}
