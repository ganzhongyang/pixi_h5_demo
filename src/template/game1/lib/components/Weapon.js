import { Rectangle, Container, Texture, Point, Graphics } from 'pixi.js'
import { createAnimatedSprite, createRectangle, createSprite, getSound } from '../tool/utils'
import { gsap } from 'gsap'

class Weapon extends Container {
  constructor() {
    super()
    this.bullets = []
    this.isMove = false
    this.bulletSpeed = 20
    this.maxBulletNum = 5
    this.mousePoint = { x: 0, y: 0 }
    this.init()
  }

  init() {
    this.pedestal = createAnimatedSprite('animation_barbette')
    this.pedestal.position.set(960, 1030)
    this.pedestal.anchor.set(0.5)
    this.pedestal.animationSpeed = 0.5
    this.pedestal.play()

    this.gunBody = createAnimatedSprite('animation_gun_body')
    this.gunBody.position.set(960, 1030)
    this.gunBody.anchor.set(0.25, 0.5)
    this.gunBody.animationSpeed = 0.5
    this.gunBody.rotation = -Math.PI / 2
    this.gunBody.play()

    this.wing = createAnimatedSprite('animation_wing5')
    this.wing.position.set(960, 1050)
    this.wing.anchor.set(0.5, 0.75)
    this.wing.animationSpeed = 0.3
    // this.wing.rotation = -Math.PI
    this.wing.play()

    let fullEventMask = createRectangle({
      x: 0, y: 0,
      width: 1920, height: 1080,
      alpha: 0
    })
    fullEventMask.hitArea = new Rectangle(0, 0, 1920, 1080)
    this.addChild(this.pedestal, this.wing, this.gunBody, fullEventMask)

    fullEventMask.interactive = true
    fullEventMask.buttonMode = true
    fullEventMask.on('pointerdown', this.startMove.bind(this))
      .on('pointermove', this.onMove.bind(this))
      .on('pointerup', this.endMove.bind(this))
      .on('pointerupoutside', this.endMove.bind(this))
      .on('pointercancel', this.endMove.bind(this))

    app.ticker.add(() => {
      for (let i = this.bullets.length - 1; i >= 0; i--) {
        const bullets = this.bullets[i]
        const o = { x: bullets.x, y: bullets.y }
        if (bullets.x < 30 || bullets.x > 1920 - 30) {
          // bullets.speed.x *= -1
          bullets.rotation = Math.PI - bullets.rotation
        }
        if (bullets.y < 30 || bullets.y > this.gunBody.y) {
          // bullets.speed.y *= -1
          bullets.rotation *= -1
        }
        bullets.position.x += Math.cos(bullets.rotation) * bullets.speed.x
        bullets.position.y += Math.sin(bullets.rotation) * bullets.speed.y
        // bullets.rotation = this.rotateToPoint(o.x, o.y, bullets.position.x, bullets.position.y) + Math.PI
      }
    })
  }

  startMove(e) {
    this.isMove = true
    this.setMouseMaxMinPoint(e.data.global)
    this.gunBody.rotation = this.rotateToPoint(this.mousePoint.x, this.mousePoint.y, this.gunBody.x, this.gunBody.y)
    this.wing.rotation = this.gunBody.rotation + Math.PI / 2
    this.shootTimer = setInterval(() => {
      this.shoot(this.gunBody.rotation, {
        x: this.gunBody.position.x + Math.cos(this.gunBody.rotation) * 120,
        y: this.gunBody.position.y + Math.sin(this.gunBody.rotation) * 120
      })
    }, 500)
  }

  onMove(e) {
    if (!this.isMove) return
    this.setMouseMaxMinPoint(e.data.global)
    this.gunBody.rotation = this.rotateToPoint(this.mousePoint.x, this.mousePoint.y, this.gunBody.x, this.gunBody.y)
    this.wing.rotation = this.gunBody.rotation + Math.PI / 2
  }

  /**
   * 设置鼠标的最大XY坐标
   * @param point
   */
  setMouseMaxMinPoint(point) {
    this.mousePoint.y = Math.max(Math.min(this.gunBody.y, point.y), 0)
    // 如果最大Y大于枪支的Y轴 可以360自由旋转
    // this.mousePoint.y = Math.max(Math.min(1080, point.y), 0)
    this.mousePoint.x = Math.max(Math.min(1920, point.x), 0)
  }

  shoot(rotation, startPosition) {
    if (this.bullets.length >= this.maxBulletNum) return
    const { width, height } = this.gunBody
    gsap.to(this.gunBody, 0.1, {
      height: this.gunBody.height - 10,
      width: this.gunBody.width - 30,
      onComplete: () => {
        this.gunBody.width = width
        this.gunBody.height = height
      }
    })
    let bullet = createSprite('image_bullet_1')
    bullet.anchor.set(1, 0.5)
    bullet.rotation = rotation
    bullet.position.set(startPosition.x, startPosition.y)
    bullet.speed = { x: this.bulletSpeed, y: this.bulletSpeed }
    this.addChild(bullet)
    pixiRes['audio_shoot'].sound.play()
    this.bullets.push(bullet)
  }

  endMove() {
    console.log('结束射击')
    this.isMove = false
    this.off('pointermove')
    clearInterval(this.shootTimer)
  }

  rotateToPoint(mx, my, px, py) {
    let dist_Y = my - py
    let dist_X = mx - px
    return Math.atan2(dist_Y, dist_X)
  }


}


export default Weapon
