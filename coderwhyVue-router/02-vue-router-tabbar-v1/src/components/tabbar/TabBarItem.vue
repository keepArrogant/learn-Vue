<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    //父传子的属性 props  传递的变量名为path  值限制为string类型
    path: String,
    activeColor: {
      //加上这个属性，用户可以自己修改想要的颜色，把这个属性直接暴露到App.vue里面，不用到组件内部修改源码
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      //   isActive: true
    };
  },
  computed: {
    isActive() {
      //   /home -> item1(/home) = true
      //   /home -> item1(/category) = false
      //   /home -> item1(/cart) = false
      //   /home -> item1(/profile) = false
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      //重复点击这四个标签会报错，加上catch方法
      this.$router.replace(this.path).catch(() => {});
    }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>