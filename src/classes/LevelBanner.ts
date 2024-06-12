export default class LevelBanner extends Phaser.Physics.Arcade.Image {
  /**
   * The name of the level text
   */
  public levelText: Phaser.GameObjects.Text

  /**
   * Creates a banner that shows the name of the level
   *
   * @param scene The scene to put the object into
   * @param levelText The name of the level
   * @param cameraZoom The zoom of the camera
   */
  constructor(scene: Phaser.Scene, levelText: string, cameraZoom: number) {
    // Create banner
    let bannerX = 285
    let bannerY = 950
    if (cameraZoom == 0.5) {
      bannerX = -300
      bannerY = 1390
    }
    super(scene, bannerX, bannerY, 'levelBanner')
    this.setScale(0.5 / cameraZoom)
    this.setDepth(10)
    // Create text
    this.levelText = scene.add.text(bannerX - 265, bannerY - 35, levelText, {
      fontFamily: 'Arial Black',
      fontSize: 60 / cameraZoom,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'left'
    }).setDepth(11)
    if (cameraZoom == 0.5) {
      this.levelText.setPosition(bannerX - 520, bannerY - 70)
    }
    // Create fade effect
    scene.time.addEvent({
      delay: 2500,
      callback: function() {
        scene.tweens.add({
          targets: [this, this.levelText],
          duration: 1000,
          alpha: 0
        })
      },
      callbackScope: this
    })
    scene.add.existing(this)
  }
}
