import '../../../public/common/css/index.css'
import '../../../public/common/css/loading.css'
import { resetView } from '../../resizeView'
import { getPixiResource } from '../../pixiLoader'
import { Application } from 'pixi.js'
import VConsole from 'vconsole'
import Game from './lib/game'

console.log('环境和目录信息:', process.env)

/**
 * 设置主屏幕比例和是否显示移动端横屏提示
 * 以及自适应浏览器窗口大小
 */
resetView(false, true)

//创建PIXI主舞台
const appDom = document.getElementById('app')
const app = window.app = new Application({
  width: 1920,
  height: window.screenRatio ? 1440 : 1080,
  sharedLoader: true,
  backgroundColor: 0x000000,
  //背景是否设为透明
  backgroundAlpha: 0.5
})
appDom.appendChild(app.view)
appDom.style.width = '192rem'
appDom.style.height = window.screenRatio ? '144rem' : '108rem'

//PIXI loader加载器 资源加载完成..开始业务逻辑
getPixiResource().then(({ res, pixiLoader }) => {
  console.log(
    '%c 🚀所有资源加载完成🚀 \n',
    'color:green;font-weight:500;background: #ff66a5; padding:5px 0;',
    window.pixiRes
  )
  let game = new Game()
  app.stage.addChild(game)

  //判断是手机创建调试工具
  // if (isMobile()) new VConsole()
})
