<template>
  <div>
    <h2 class="title">{{ message }}</h2>
    <button @click="btnClick">按钮</button>
    <h2>{{ name }}</h2>
    <Cpn />
  </div>
</template>

<script>
//导入Cpn组件
import Cpn from "./Cpn.vue";

export default {
  name: "App",
  components: {
    Cpn,
  },
  data() {
    return {
      message: "Hello Webpack",
      name: "xhx",
    };
  },
  methods: {
    btnCilck() {},
  },
};
</script>

<style>
.title {
  color: green;
}
</style>
