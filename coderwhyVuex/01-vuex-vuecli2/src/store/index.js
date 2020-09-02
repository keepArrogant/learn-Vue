import Vue from "vue";
import Vuex from "vuex";
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import moduleA from './modules/moduleA'

//1. 安装插件
Vue.use(Vuex);

// 2. 创建对象

const state = {
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
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    a: moduleA
  }
});

// 3.导出store对象
export default store;
