export default {
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
}
