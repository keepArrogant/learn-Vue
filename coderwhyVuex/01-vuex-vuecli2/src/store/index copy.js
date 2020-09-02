import Vue from "vue";
import Vuex from "vuex";
// import {
//   INCREMENT
// } from "./mutations-types";

//1. 安装插件
Vue.use(Vuex);

// 2. 创建对象
const moduleA = {
  state: {
    name: 'zhangsan'
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload
    }
  },
  getters: {
    fullname(state) {
      return state.name + '1111'
    },
    fullname2(state, getters) {
      return getters.fullname + '22222'
    },
    fullname3(state, getters, rootState) {
      return getters.fullname2 + rootState.count
    }
  },
  actions: {
    aUpdateName(context) {
      console.log(context)
      setTimeout(() => {
        context.commit('updateName', 'wangwu')
      }, 1000)
    }
  }
}


const store = new Vuex.Store({
  state: {
    //状态集合
    count: 50, //具体的状态数据
    students: [{
        id: 110,
        name: "古力娜扎",
        age: 28
      },
      {
        id: 111,
        name: "迪丽热巴",
        age: 26
      },
      {
        id: 112,
        name: "江疏影",
        age: 34
      },
      {
        id: 113,
        name: "陈数",
        age: 43
      },
      {
        id: 114,
        name: "张天爱",
        age: 32
      }
    ],
    info: {
      name: '嘻嘻嘻',
      age: 23,
      height: 1.78
    }
  },
  mutations: {
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
  },
  getters: {
    powerCounter(state) {
      //把count数值*2
      return state.count * state.count;
    },
    more20stu(state) {
      //拿到数组中age大于26的对象并返回
      return state.students.filter(s => s.age > 26);
    },
    more20stuLength(state, getters) {
      //拿到上面做判断的之后的对象个数
      return getters.more20stu.length;
    },
    moreAgeStu(state) {
      //自定义拿到age大于多少时返回的对象
      return age => {
        return state.students.filter(s => s.age > age);
      };
    }
  },
  actions: {
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
  },
  modules: {
    a: moduleA
  }
});

// 3.导出store对象
export default store;
