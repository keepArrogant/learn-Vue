export default {
  //关于异步操作的方法都要写在这里面
  // context： 上下文  actions的异步操作最后都是要通过mutations才能执行呈递给页面的
  // aUpdateInfo(context, payload) {
  //   setTimeout(() => { 
  //     context.commit('updateInfo')
  //     console.log(payload.message)
  //     payload.success()
  //   }, 1000)
  // }
  //通过Promise来执行异步操作
  aUpdateInfo(context, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit('updateInfo')
        console.log(payload)
        resolve('123')
      }, 1000)
    })
  }
}
