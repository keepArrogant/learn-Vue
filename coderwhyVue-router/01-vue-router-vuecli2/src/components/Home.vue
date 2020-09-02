<template>
  <div>
    <h2>我是首页</h2>
    <p>我是首页的内容</p>
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      message: "你好啊",
      path: "/home/news"
    };
  },
  created() {
    console.log("home created");
  },
  destroyed() {
    console.log("home destroyed");
  },
  // activated 和deactivated 这两个函数，只有该组件被保持了状态 也就是使用了keep-alive时，才是有效的
  activated() {
    console.log("home activeted");
    this.$router.push(this.path);
  },
  deactivated() {
    console.log("home deactiveted");
  },
  //beforeRouteLeave 离开路由之前 记录路由路径
  beforeRouteLeave(to, from, next) {
    // console.log(this.$route.path);
    this.path = this.$route.path;
    next();
  }
};
</script>

<style>
</style>