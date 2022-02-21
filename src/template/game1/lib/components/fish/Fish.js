import { Container } from 'pixi.js'
import { createAnimatedSprite, deepClone } from '../../tool/utils'
import fishConfig from './fishConfig.json'
import { gsap } from 'gsap'


class FishPond extends Container {
  constructor() {
    super()
    //当前页面上的鱼
    this.fishPonds = []
    //所有的鱼,包括未出来的
    this.allFishs = []
    this.init()
  }

  init() {
    this.fishConfig = deepClone(fishConfig)
    this.fishConfig.forEach(config => {
      let fish = new Fish(config)
      this.allFishs.push(fish)
      this.addChild(fish.aniSprite)
    })
  }

}


class Fish {
  constructor(config) {
    this.config = config || {}
    this.createFish()
  }

  createFish() {
    this.aniSprite = createAnimatedSprite(this.config.fishName)
    Object.assign(this.aniSprite, this.config)
    this.aniSprite.play()
  }


  moveAnimated(obj) {
    const tl = gsap.timeline()
    tl.repeat(-1)
    const step1 = gsap.to(obj.fish, 8, {
      x: obj.to.x, y: obj.to.y,
      ease: 'none', delay: this.getRandom(1, 5),
      onComplete: () => {
        obj.fish.scale.x = -1
      }
    })
    const step2 = gsap.to(obj.fish, 8, {
      x: obj.x, y: obj.y,
      ease: 'none',
      onComplete: () => {
        obj.fish.scale.x = 1
      }
    })
    tl.add(step1)
    tl.add(step2)
  }

  getRandom(min, max) {
    let num = max - min + 1
    num = Math.floor(Math.random() * num + min)
    return num
  }
}

export { FishPond, Fish }
