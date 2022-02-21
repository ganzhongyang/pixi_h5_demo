import { Spine } from 'pixi-spine'
import { sound } from '@pixi/sound'

const getPixiResource = (resArray = [{ name: 'res', fileName: 'resource' }]) => {
  return new Promise(resolve => {
    const pixiLoader = app.loader
    resArray.forEach(item => {
      pixiLoader.add(item.name, `./resources/resource.json`, { crossOrigin: true })
    })
    pixiLoader.load((loader, resources) => {
      resArray.forEach(item => {
        let data = resources[item.name].data
        data.forEach(value => {
          try {
            loader.add(value.key, value.path, { crossOrigin: true })
          } catch (e) {
            console.log(e)
          }
        })
        loader.load((lde, res) => {
          window.pixiRes = res
          resolve({ res, pixiLoader })
        })
        loader.onError.add((e) => {
          console.log(e, 'loader报错了')
        })
        loader.onProgress.add((e) => {
          // console.log('loader加载', e.progress)
          document.getElementsByClassName('loading-text')[0].innerHTML = `${ Math.floor(e.progress) }%`
        })
        loader.onComplete.add((e) => {
          //加载完成
          setTimeout(() => {
            document.getElementsByClassName('loading-content')[0].style.display = 'none'
          }, 500)
        })
      })
    })
  })

}


export {
  getPixiResource
}
