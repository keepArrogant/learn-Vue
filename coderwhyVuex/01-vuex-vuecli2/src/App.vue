<template>
  <div id="app">
    <h2>-------App内容：modules中的内容</h2>
    <h2>{{$store.state.a.name}}</h2>
    <button @click="updateName">修改名字</button>
    <h2>{{$store.getters.fullname}}</h2>
    <h2>{{$store.getters.fullname2}}</h2>
    <h2>{{$store.getters.fullname3}}</h2>
    <button @click="asyncUpdateName">异步修改名字</button>

    <h2>-------App内容：info对象的内容是否是响应式------</h2>
    <h2>{{$store.state.info}}</h2>
    <button @click="updateInfo">修改信息</button>

    <h2>-------App内容-------</h2>
    <h3>{{ $store.state.count }}</h3>
    <!-- <button @click="$store.state.count++">+</button>
    <button @click="$store.state.count--">-</button>-->
    <button @click="addition">+</button>
    <button @click="subtraction">-</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addCount(10)">+10</button>
    <button @click="addStudent">添加学生</button>

    <h2>-----------App内容：getters相关信息----------------</h2>
    <h2>{{ $store.getters.powerCounter }}</h2>
    <h2>{{ $store.getters.more20stu }}</h2>
    <h2>{{ $store.getters.more20stuLength }}</h2>
    <h2>{{ $store.getters.moreAgeStu(30) }}</h2>
    <h2>------------Hello Vuex内容-----------</h2>
    <hello-vuex></hello-vuex>
  </div>
</template>

<script>
import HelloVuex from "./components/HelloVuex";

// import { INCREMENT } from "./store/mutations-types";

export default {
  name: "App",
  data() {
    return {
      message: "我是APP组件"
    };
  },
  components: {
    HelloVuex
  },
  methods: {
    addition() {
      this.$store.commit("increment");
      // this.$store.commit(INCREMENT);
    },
    subtraction() {
      this.$store.commit("decrement");
    },
    addCount(count) {
      //传递的参数被称为 payload：负载
      // 1. 普通的提交封装
      // this.$store.commit("incrementCount", count);

      // 2. 特殊的提交封装
      this.$store.commit({
        type: "incrementCount",
        count
      });
    },
    addStudent() {
      const stu = { id: 115, name: "车晓", age: 38 };
      this.$store.commit("addStudent", stu);
    },
    updateInfo() {
      // 执行mutations中的updateInfo方法的操作 通过commit发送请求
      // this.$store.commit("updateInfo");
      // 执行actions里面的异步操作   通过dispatch发送请求
      // this.$store.dispatch("aUpdateInfo", {
      //   message: "我是携带的信息",
      //   success: () => {
      //     console.log("里面已经完成数据传输了");
      //   }
      // });
      //异步操作通过Promise高级方法来执行
      this.$store.dispatch("aUpdateInfo", "我是携带的信息").then(res => {
        console.log("里面完成了提交");
        console.log(res);
      });
    },
    updateName() {
      this.$store.commit("updateName", "lisi");
    },
    asyncUpdateName() {
      this.$store.dispatch("aUpdateName");
    }
  }
};
</script>

<style></style>
