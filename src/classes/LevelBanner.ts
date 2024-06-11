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
   */
  constructor(scene: Phaser.Scene, levelText: string) {
    // Create banner
    const bannerX = 285
    const bannerY = 950
    super(scene, bannerX, bannerY, 'levelBanner')
    this.setScale(0.5)
    this.setDepth(10)
    // Create text
    this.levelText = scene.add.text(bannerX - 265, bannerY - 35, levelText, {
      fontFamily: 'Arial Black',
      fontSize: 60,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'left'
    }).setDepth(11)
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
