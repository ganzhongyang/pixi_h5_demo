class Observer {
  constructor(name, fn = () => {
  }) {
    this.name = name
    this.fn = fn
  }
}


const per1 = new Observer('aaa', () => {
  console.log('a1')
})
const per2 = new Observer('bbb', () => {
  console.log('bb')
})


class Subject {
  constructor(state) {
    //记录自己的状态
    this.state = state
    //数组用看来
  }
}
