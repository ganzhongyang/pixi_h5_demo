import { Container } from 'pixi.js'
import { createAnimation, createSprite, getSound } from './tool/utils'
import Weapon from './components/Weapon'
import { FishPond } from './components/fish/Fish'

class Game extends Container {
  constructor() {
    super()
    this.name = 'gameContainer'
    this.init()
  }

  init() {
    this.bgm = getSound('audio_bwc')
    let gameBg = createSprite('image_gameBg')
    gameBg.width = app.screen.width
    gameBg.height = app.screen.height
    this.addChild(gameBg)
    let bgmBtn = createAnimation('animation_bangzhu')
    bgmBtn.position.set(100, 100)
    bgmBtn.state.setAnimation(0, 'animation', false)
    this.bgmBtnHandler(bgmBtn)

    this.weapon = new Weapon()
    this.fishPond = new FishPond()
    this.addChild(this.fishPond, this.weapon)
    this.addChild(bgmBtn)


  }

  bgmBtnHandler(bgmBtn) {
    bgmBtn.interactive = true
    bgmBtn.buttonMode = true
    bgmBtn.on('pointertap', () => {
      if (this.bgm.isPlaying) {
        this.bgm.stop()
        bgmBtn.state.setAnimation(0, 'animation', false)
      } else {
        this.bgm.play({ loop: true, volume: 1 })
        bgmBtn.state.setAnimation(0, 'music', true)
      }
    })
  }
}

export default Game
