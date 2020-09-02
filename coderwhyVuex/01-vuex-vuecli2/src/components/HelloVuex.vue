<template>
  <div class="hello">
    <h2>{{ message }}</h2>
    <h2>这是{{ message }}的count：{{ $store.state.count }}</h2>
    <h2>这是{{ message }}的powerCounter：{{ $store.getters.powerCounter }}</h2>
  </div>
</template>

<script>
export default {
  name: "HelloVuex",
  data() {
    return {
      message: "HelloVuex"
    };
  }
};
</script>

<style></style>
