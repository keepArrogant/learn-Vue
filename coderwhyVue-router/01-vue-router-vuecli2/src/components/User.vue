<template>
  <div>
    <h2>我是用户的界面</h2>
    <p>我是用户的相关信息，123132131</p>
    <h2>{{userId}}</h2>
    <h2>{{$route.params.abc}}</h2>
  </div>
</template>

<script>
export default {
  name: "User",
  created() {
    console.log("user created");
  },
  destroyed() {
    console.log("user destroyed");
  },
  computed: {
    userId() {
      return this.$route.params.abc;
    }
  }
};
</script>

<style>
</style>