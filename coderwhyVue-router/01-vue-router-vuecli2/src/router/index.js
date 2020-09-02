// 配置路由相关的信息
import VueRouter from "vue-router";
import Vue from "vue";
// import Home from '../components/Home'
// import About from '../components/About'
// import User from '../components/User'

//懒加载方式
const Home = () => import("../components/Home");
const HomeNews = () => import("../components/HomeNews");
const HomeMessage = () => import("../components/HomeMessage");
const About = () => import("../components/About");
const User = () => import("../components/User");
const Profile = () => import("../components/Profile");

// 1.通过Vue.use(插件),安装router插件
Vue.use(VueRouter);

// 2.创建VueRouter对象
const routes = [
  {
    path: "",
    //redirect 重定向
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home,
    meta: {
      title: "首页"
    },
    children: [
      // {
      //   path: "",
      //   redirect: "/home/news"
      // },
      {
        path: "news",
        component: HomeNews
      },
      {
        path: "message",
        component: HomeMessage
      }
    ]
  },
  {
    path: "/about",
    component: About,
    beforeEnter: (to, from, next) => {
      console.log("来自" + from.path + ",要去" + to.path);
      next();
    },
    meta: {
      title: "关于"
    }
  },
  {
    path: "/user/:abc",
    component: User,
    meta: {
      title: "用户"
    }
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      title: "档案"
    }
  }
];

const router = new VueRouter({
  // 配置路由和组件之间的映射关系
  routes,
  mode: "history",
  linkActiveClass: "active"
});

router.beforeEach((to, from, next) => {
  // 从from 跳转到to
  document.title = to.matched[0].meta.title;
  next();
});

router.afterEach((to, from) => {
  // console.log("后置钩子被调用了---");
});
// 3.将router对象传入到Vue实例
export default router;
