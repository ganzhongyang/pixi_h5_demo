//发布订阅模式
class Observable {
  constructor() {
    this.myEvent = {}
  }

  /**
   *
   * @param eventName {String}  自定义的事件名称
   * @param fn {Function}      添加的方法
   * 添加订阅者
   * Object.addEvent('eventName', function)
   */
  addEvent(eventName, fn) {
    if (!this.myEvent[eventName]) {
      this.myEvent[eventName] = []
    }
    this.myEvent[eventName].push(fn)
  }

  /**
   * 添加只通知一次的方法
   */
  addEventOnce(eventName, fn) {

  }

  /**
   *
   * @param eventName {String}  删除的事件名称
   * @param arg {Array} 传递的参数
   * 触发事件,并传递参数
   * Object.emit('eventName', [...])
   *
   */
  trigger(eventName, arg) {
    if (!this.myEvent[eventName]) {
      return
    }
    this.myEvent[eventName].forEach(item => {
      item(arg)
    })
  }

  /**
   *
   * 删除订阅
   * @param eventName {String}  删除的事件名称
   * @param fn  {Function}      删除的事件方法
   * 如果只传一个参数 (eventName) ,则删除整个事件的数组
   * 如果两个都传了,则删除 指定事件名称下的指定方法
   *  Object.removeEvent('eventName')
   *  Object.removeEvent('eventName',function)
   *
   */
  removeEvent(eventName, fn) {
    if (!this.myEvent[eventName]) {
      return console.log('没有订阅这个事件')
    }
    if (!fn) {
      delete this.myEvent[eventName]
      return
    }

    this.myEvent[eventName] = this.myEvent[eventName].filter(item => item !== fn)
  }

  /**
   * 删除所有事件
   */
  removeAllEvent() {
    this.myEvent = {}
  }

}

export default Observable
