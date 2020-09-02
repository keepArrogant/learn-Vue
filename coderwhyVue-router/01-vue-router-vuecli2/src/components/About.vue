<template>
  <div>
    <h2>我是关于</h2>
    <p>我是关于的内容部分</p>
  </div>
</template>

<script>
export default {
  name: "About",
  created() {
    console.log("about created");
  },
  destroyed() {
    console.log("about destroyed");
  }
};
</script>

<style>
</style>