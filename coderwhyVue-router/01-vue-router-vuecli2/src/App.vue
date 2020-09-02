<template>
  <div id="app">
    <!-- <router-link to="/home" tag="button" replace active-class="active">首页</router-link>
    <router-link to="/about" tag="button" replace active-class="active">关于</router-link>-->
    <!-- <router-link to="/home" tag="button" replace>首页</router-link>
    <router-link to="/about" tag="button" replace>关于</router-link>-->
    <!-- <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button>-->

    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <!-- <router-link :to="'/user/'+userId">用户</router-link>
    <router-link :to="{path: '/profile',query: {name: '古力娜扎', age: 28, height: 170}}">档案</router-link>-->
    <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button>

    <keep-alive exclude="Profile,User">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userId: "zhangsan",
      profileInfo: { name: "古力娜扎", age: 28, height: 170 }
    };
  },
  methods: {
    homeClick() {
      // 通过代码的方式修改路由 vue-router
      // push => pushState
      // this.$router.push('/home')
      this.$router.replace("/home");
    },
    aboutClick() {
      // this.$router.push('/about')
      this.$router.replace("/about");
    },
    userClick() {
      this.$router.push("/user/" + this.userId);
    },
    profileClick() {
      let profileInfo = this.profileInfo;
      this.$router.push({
        path: "/profile",
        query: {
          profileInfo
        }
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* .router-link-active {
  color: #f00;
} */
.active {
  color: #f00;
}
</style>
