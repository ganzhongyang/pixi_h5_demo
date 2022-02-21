import { Sound } from '@pixi/sound'
import { Spine } from 'pixi-spine'
import { AnimatedSprite, Sprite, Texture, Graphics } from 'pixi.js'


const createSprite = (imgName) => {
  return new Sprite(pixiRes[imgName].texture)
}

const createAnimatedSprite = (animatedName) => {
  const frames = pixiRes[animatedName].data.frames
  let arr = []
  for (let keys in frames) {
    arr.push(Texture.from(keys))
  }
  return new AnimatedSprite(arr)
}
const getFrames = (animatedName) => {
  const frames = pixiRes[animatedName].data.frames
  let arr = []
  for (let keys in frames) {
    arr.push(Texture.from(keys))
  }
  return arr
}

const createAnimation = (aniName) => {
  return new Spine(pixiRes[aniName].spineData)
}

const createRectangle = (data = {}) => {
  const { x = 0, y = 0, width = 0, height = 0, color = 0x000000, alpha = 0.5 } = data
  let rect = new Graphics()
  rect.beginFill(color, alpha)
  rect.drawRect(x, y, width, height)
  return rect
}

const getSound = (soundName) => {
  return pixiRes[soundName].sound
}

const deepClone = (obj) => {
  //定义对象来判断当前的参数是数组还是对象
  let objClone = Array.isArray(obj) ? [] : {}
  //如果obj存在并且为对象
  if (obj && typeof obj == 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        //如果obj的子元素为对象，那么递归（层级遍历）
        if (obj[key] && typeof obj[key] == 'object') {
          objClone[key] = deepClone(obj[key])
        } else {
          //如果不是，直接赋值
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}

export {
  createSprite,
  createAnimatedSprite,
  createAnimation,
  getSound,
  createRectangle,
  getFrames,
  deepClone
}
