export default {
  increment(state) {
    state.count++;
  },
  // [INCREMENT](state) { //方法导入形式的不同
  //   state.count++;
  // },
  decrement(state) {
    state.count--;
  },
  // incrementCount(state, count) {
  // 1.普通封装 传递过来的是一个个参数
  // state.count += count;
  // },
  incrementCount(state, payload) {
    // 2.特殊的提交封装 现在传递过来的是整个对象
    state.count += payload.count
  },
  addStudent(state, stu) {
    state.students.push(stu);
  },
  updateInfo(state) {
    state.info.name = '哈哈哈' //修改是可以实时响应的

    // 错误的代码： 不能在这里进行异步操作，虽然页面数据是刷新了，但是Vuex捕获不到修改之后的数据
    // setTimeout(() => { 
    //   state.info.name = '异步'
    // }, 1000)

    // state.info['address'] = '两河口'//这种方式添加属性不会实时响应
    // Vue.set(state.info, 'address', '两河口') //这种添加属性的方式可以实时响应
    // delete(state.info.age) //这种删除属性的方式不会实时响应
    // Vue.delete(state.info, 'age') //这种删除属性的方式是实时响应的
  }
}
