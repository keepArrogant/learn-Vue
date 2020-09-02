## vue-router

### 路由简介

**什么是路由？**

- 路由就是通过互联的网络把信息用源地址传送到目的地的活动

- 路由提供了两种机制：路由和传送
  - 路由是决定数据包从来源到目的地的路径
  - 转送就是将数据转移
- 路由表
  - 路由表本质就是一个映射表，决定了数据包的指向

### 前端/后端路由

- 后端渲染（服务端渲染）
  jsp技术
  后端路由，后端处理URL和页面映射关系，例如springmvc中的@requestMapping注解配置的URL地址，映射前端页面

- 前后端分离（ajax请求数据）
  后端只负责提供数据
  静态资源服务器（html+css+js）
  ajax发送网络请求后端服务器，服务器回传数据
  js代码渲染dom

- 单页面富应用（SPA页面）
  前后端分离加上前端路由，前端路由的url映射表不会向服务器请求，是单独url的的页面自己的ajax请求后端，后端只提供api负责响应数据请求。改变url，页面不进行整体的刷新。
  整个网站只有一个html页面。

### URL的hash和HTML5的history

#### URL的hash

- 使用命令`vue init webpack 01-vue-router-vuecli2`创建新的vuecli2工程,等待创建完成后，使用`npm run dev`启动服务器，在浏览器通过 http://localhost:8080 进入工程主页。 测试通过改变hash，查看是否会刷新页面，浏览器的url地址是否改变。

- URL的hash是通过锚点(#)，其本质上改变的是window.location的href属性。
- 可以通过直接赋值location.hash来改变href，但是页面并不会发生刷新。

> 结论

测试发现url的地址栏改变了变成了http://localhost:8080/#/zty  ，通过查看network发现只有favicon.ico资源重新请求了，这个是工程的logo图标，其他资源都未请求。可以通过改变hash改变url，此时页面是未刷新的。

vue-router其实用的就是这样的机制，改变url地址，这个url地址存在一份路由映射表里面，比如`/user`代表要请求用户页面，只要配置了这个路由表（路由关系），就可以前端跳转而不刷新页面，所有的数据请求都走ajax。

#### HTML5的history模式

> pushState

同样的使用HTML5的history模式也是不会刷新页面的,history对象栈结构，先进后出，pushState类似压入栈中，back是回退。

```js
hristory.pushState({}, '', '/foo')
history.back()
```

> replaceState

replaceState模式与pushState模式区别在于replaceState模式浏览器没有返回只是替换，不是压入栈中。

```javascript
history.replaceState({}, '', 'home')
```

> go

go只能在pushState模式中使用，go是前进后退到哪个历史页面。

```javascript
history.go(-1)//回退一个页面
history.go(1)//前进一个页面
history.forward()//等价于go(1)
history.back()//等价于go(-1)
```

### vue-router的安装配置

- 未使用脚手架工具搭建vue-router时，使用`npm install vue-router --save`来安装vue-router插件模块。
- 在模块化工程中使用他(因为是一个插件，所以可以通过Vue.user来安装路由功能)

  - 在src下创建一个router文件夹（一般安装vue-router时候会自动创建）用来存放vue-router的路由信息导入路由对象，并且调用**Vue.use(VueRouter)**
  - 创建路由实例，并且传入路由**映射配置**
  - 在vue实例中挂载创建的**路由实例对象**

```javascript
//router文件夹中的index.js
/**
 * 配置路由相关信息
 * 1.先导入vue实例和vue-router实例
 */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 2. 通过Vue.use(插件)，安装插件
Vue.use(Router)
//3. 创建 router路由对象
const routes = [
  //配置路由和组件之间的对应关系
  {
    path: '/',//url
    name: 'HelloWorld',
    component: HelloWorld //组件名
  }
]
const router = new Router({
  //配置路由和组件之间的应用关系
  routes
})
//4.导出router实例
export default router
```

```javascript
//main.js中挂载router对象
new Vue({
  el: '#app',
  router,//使用路由对象，简写对象增强写法
  render: h => h(App)
})
```

### vue-router的使用

#### 创建路由组件

- 在资源src文件夹下的components文件夹下创建两个组件

  - Home.vue

    ```vue
    <template>
      <div>
        <h2>我是首页</h2>
        <p>我是首页的内容</p>
      </div>
    </template>
    
    <script>
    export default {
      name: "Home"
    };
    </script>
    
    <style>
    </style>
    ```

  - About.vue

    ```vue
    <template>
      <div>
        <h2>我是关于</h2>
        <p>我是关于的内容部分</p>
      </div>
    </template>
    
    <script>
    export default {
      name: "About"
    };
    </script>
    
    <style>
    </style>
    ```

#### 配置路由映射：组件和路径映射关系

- 路由与组件对应关系配置在router文件夹中

  - index.js

    ```javascript
    // 配置路由相关的信息
    import VueRouter from 'vue-router'
    import Vue from 'vue'
    import Home from '../components/Home'
    import About from '../components/About'
    
    // 1.通过Vue.use(插件),安装router插件
    Vue.use(VueRouter)
    
    // 2.创建VueRouter对象
    const routes = [{
        path: '/home',     //路由地址
        component: Home    //组件名
      },
      {
        path: '/about',
        component: About
      }
    ]
    
    const router = new VueRouter({
      // 配置路由和组件之间的映射关系
      routes
    })
    
    // 3.将router对象传入到Vue实例
    export default router
    
    ```

#### 使用路由：通过`<router-link>`和`<router-view>`

- 在app.vue中使用`<router-link>`和`<router-view>`两个全局组件显示路由。

  - `<router-link>`是全局组件，最终被渲染成a标签，但是`<router-link>`只是标记路由指向类似一个a标签或者按钮一样，但是我们点击a标签要跳转页面或者要显示页面，所以就要用上`<router-view>`
  - `<router-view>`是用来占位的，就是路由对应的组件展示的地方，该标签会根据当前的路径，动态渲染出不同的组件。
  - `<router-view>`默认使用hash模式，可以在index.js中配置修改为history模式

  - 要在app.vue中使用配置的两个路由就要修改app.vue中的`<template>`标签

    ```vue
    <!-- app.vue -->
    <template>
      <div id="app">
        <router-link to="/home">首页</router-link>
        <router-link to="/about">关于</router-link>
        <router-view />
      </div>
    </template>
    ```

  - 完成上面的配置之后，使用npm run dev 启动项目，此时`<router-view>`在`<router-link>`下面，那么渲染页面就在下面。可以看见在页面主体中有首页和关于两个链接，点击那个就跳转到它的路由显示它的内容，要注意的是，当前页面不会刷新，只会改变网站路径。

### 路由的默认路径

- 默认情况下，进入网站的首页，我们希望`<router-view>`渲染首页的内容，但是我们的实现中，默认没有显示首页的组件，必须让用户点击才可以。

- 如何可以让路径默认跳到首页？并且`<router-view>`渲染首页组件呢？

  - 非常简单，我们只需要配置路由时多配置一个映射就可以了。

    ```javascript
    //index.js
    // 2.创建VueRouter对象
    const routes = [{
        path: '',
        //redirect 重定向
        redirect: '/home' //缺省时候重定向到/home
      }, {
        path: '/home',
        component: Home
      },
      {
        path: '/about',
        component: About
      }
    ]
    ```

  - redirect是重定向，也就是我们将根路径重定向到/home的路径下，当我们npm run dev 启动服务器时，打开网站 输入http://localhost:8080 , 它会自动显示home组件的内容，并且网址也发生了变化： http://localhost:8080/#/home 

### HTML5的History模式

- 改变路径的方式有两种：

  - URL的hash
  - HTML5的history
  - 默认情况下，路径的改变使用的是URL的hash，它的代表就是网站路径中会有#

- 为了解决上面路径中有#的这个问题，我们可以把路径的模式改为HTML5的history。只需要配置router实例。

  ```javascript
  //index.js
  const router = new VueRouter({
    // 配置路由和组件之间的映射关系
    routes,
    mode: 'history'
  })
  ```

### `<router-link>`的其他属性

- to属性：用于跳转到指定路径

- tag属性：可以指定`<router-link>`之后渲染成什么组件。例如：`<router-link to='/home' tag='button'>`默认a标签的组件会被渲染成按钮。

- replace属性：在history模式下指定`<router-link to='/home' tag='button' replace>`使用`replaceState`而不是`pushState`，此时浏览器的返回按钮是不能使用的。

- `active-class`属性：当`<router-link>`对应的路由匹配成功的时候，会自动给当前元素设置一个`<router-link-active>`的class，我们可以利用这个特点，给这个组件设置对应的样式，或者修改它的默认名称。

  - 在进行高亮显示的导航菜单或者底部tabbar时，会用到该属性。
  - 但是通常不会修改类的属性，会直接使用默认的`router-link-active`
  - `<router-link to='/home' tag='button' active-class='active'>`此时被选中的`<router-link>`就会有active的class
  - 如果每个`<router-link>`都要加上`active-link-class=active`，就会显得重复赘余，所以我们可以在路由设置中统一更改。

  ```javascript
  //index.js
  const router = new VueRouter({
    // 配置路由和组件之间的映射关系
    routes,
    mode: 'history',
    linkActiveClass: 'active' //加上这个设置之后，点击的组件就会自动加上名为active的class属性
  })
  ```

  - 我们使用它不仅仅是配置路由这么简单，必须在app.vue的template标签模板中使用它。

  ```vue
  <template>
    <div id="app">
      <!-- <router-link to="/home" tag="button" replace active-class="active">首页</router-link>
      <router-link to="/about" tag="button" replace active-class="active">关于</router-link>-->
      <router-link to="/home" tag="button" replace>首页</router-link>
      <router-link to="/about" tag="button" replace>关于</router-link>
      <router-view />
    </div>
  </template>
  
  <style>
  /* .router-link-active {
    color: #f00;  这个是上面template模板中被注释掉的内容所使用的样式
  } */
  .active {
    color: #f00;
  }
  </style>
  
  ```

- 配置和使用之后 重新启动服务器`npm run dev ` 我们就能看到被选中的`<router-link>`就有了active属性，按钮的字体会变红；在两个按钮之间相互点击的时候，浏览器的后退和前进按键也无法使用，因为我们在`<router-link>`中加入了replace

### 通过代码修改路由进行跳转

- 我们在使用`<router-link>`来添加路由组件未免太过繁琐，我们可以尝试简便写法：把路由的东西都封装在方法中。

  ```vue
  <!-- App.vue-->
  <!-- <router-link to="/home" tag="button" replace>首页</router-link>
      <router-link to="/about" tag="button" replace>关于</router-link>-->
  <!-- 把上面的写法换成按钮标签加上点击事件，把路由相关的东西存放在点击事件对应的方法里-->
      <button @click="homeClick">首页</button>
      <button @click="aboutClick">关于</button>
  <router-view />
  
  <script>
  export default {
    name: "App",
    methods: {
      homeClick() {
        // 通过代码的方式修改路由 vue-router
        // push => pushState
        // this.$router.push('/home') //push方法等价于pushState方法
        this.$router.replace("/home"); //replace方法等价于replaceState方法
      },
      aboutClick() {
        // this.$router.push('/about')
        this.$router.replace("/about");
      }
    }
  };
  </script>
  ```

### vue-router的动态路由

- 一个页面的path路径可能是不确定的，例如可能有`/user/aaaa`或者`/user/bbb`,除了`/user`之外，后面还跟上了用户的ID。这种path和component的匹配关系，叫动态路由

- 为了实现这种用户ID的动态路由，我们要新建一个User组件 

  ```vue
  <!--User.vue  h2标签中有两种不同的写法，一个是利用下面的userId方法，一个是直接获取处于激活(选中)状态的路由参数 -->
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
    computed: {
      userId() {
        return this.$route.params.abc;
      }
    }
  };
  </script>
  
  <style>
  </style>
  ```

- 光新建了Uers组件还不够，要去配置路由

  ```javascript
  //index.js
  import User from '../components/User'
  const routes = [{
      ...
  },
   {
      path: '/user/:abc', //:abc指定动态路由参数
      component: User
    }
  ]
  ```

- 我们去App.vue中去使用这个路由

  ```vue
  <!--App.vue 要注意一点的是：动态获取参数必须在路由前面加上v-bind 简写就是： 在下方<router-link>中有详细的使用演示 -->
  <template>
    <div id="app">
        <router-link :to="'/user/'+userId">用户</router-link>
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: "App",
    data() {
      return {
        userId: "zhangsan"
      };
    }
  };
  </script>
  ```

- 重新启动项目,`npm run dev`当访问http://localhost:8080 时，点击主体区域的用户链接时，路径会变为http://localhost:8080/user/zhangsan ，并且主体区域会显示User.vue配置的模板。

  ![1597135158391](F:\coderwhyVue-router\vue_router_note\note-img\动态路由的获取与显示.png)

### vue-router的打包文件解析

> 问题：打包时候js太大，页面响应缓慢

如果组件模块化了，当路由被访问的时候才开始加载被选中的组件，这就是懒加载

```js
component: () => import('@/components/User')
```

使用`npm run build`命令将之前创建的项目打包，打开dist文件夹，目录结构如下：

![1597136584565](F:\coderwhyVue-router\vue_router_note\note-img\打包后的打包文件目录.png)

- app.xxx.js是我们自己编写的业务代码
- vendor.xxx.js是第三方框架，例如vue/vue-router/axios等
- mainfest.xxx.js是为了打包的代码做底层支持的，一般是webpack帮我们做一些事情

### 认识路由的懒加载

- 官方给出了懒加载的解释：

  - 当打包构建应用时，JavaScript包会变得非常大，影响页面加载
  - 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应最近，这样就更加高效了

- 路由懒加载做了什么？

  - 路由懒加载的主要作用就是将路由对应的组件打包成一个个的js代码块
  - 只有在这个路由被访问到的时候，才加载对应的组件，这样就大大加快了页面的访问速度。

- 现在我们把之前配置的三个路由都变为懒加载模式

  ```javascript
  //index.js
  //把之前直接导入的模式注释掉
  // import Home from '../components/Home'
  // import About from '../components/About'
  // import User from '../components/User'
  
  //懒加载方式
  const Home = () => import('../components/Home')
  const About = () => import('../components/About')
  const User = () => import('../components/User')
  
  //下面的代码可以不用修改
  // 1.通过Vue.use(插件),安装router插件
  Vue.use(VueRouter)
  
  // 2.创建VueRouter对象
  const routes = [{
      path: '',
      //redirect 重定向
      redirect: '/home'
    }, {
      path: '/home',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/user/:abc',
      component: User
    }
  ]
  
  const router = new VueRouter({
    // 配置路由和组件之间的映射关系
    routes,
    mode: 'history',
    linkActiveClass: 'active'
  })
  
  // 3.将router对象传入到Vue实例
  export default router
  ```

- 更改为懒加载模式之后我们重新打包项目`npm run build`

![1597137705754](F:\coderwhyVue-router\vue_router_note\note-img\通过懒加载方法打包项目之后的打包目录.png)

- 用到懒加载的话就会多6个js文件，它们会被分开打包，（0.9bxxx.js和1.29xxx.js和2.1axxx.js）分别是Home、User和About组件。因为是懒加载，需要用到这个组件的时候才会加载，所以不会一次性请求所有js。

### 认识嵌套路由

- 平常在一个home页面中，我们可能需要`/home/news`和`home/message`访问一些内容，一个路由映射一个组件就像后端一个api对应一个controller的一个requestMapping一样，访问两个路由也会分别渲染这两个组件

![1597194459445](F:\coderwhyVue-router\vue_router_note\note-img\路由与组件的映射关系.png)

- 要实现嵌套路由：

  - 创建对应的子组件

    ```vue
    <!-- HomeNews.vue-->
    <template>
      <div>
        <ul>
          <li>新闻1</li>
          <li>新闻2</li>
          <li>新闻3</li>
          <li>新闻4</li>
        </ul>
      </div>
    </template>
    
    <script>
    export default {
      name: "HomeNews"
    };
    </script>
    
    <style>
    </style>
    ```

    ```vue
    <!-- HomeMessage.vue-->
    <template>
      <div>
        <ul>
          <li>消息1</li>
          <li>消息2</li>
          <li>消息3</li>
          <li>消息4</li>
        </ul>
      </div>
    </template>
    
    <script>
    export default {
      name: "HomeMessage"
    };
    </script>
    
    <style>
    </style>
    ```

  - 在路由映射中配置对应的子路由

    ```javascript
    //index.js
    //懒加载方式
    const Home = () => import("../components/Home");
    const HomeNews = () => import("../components/HomeNews");
    const HomeMessage = () => import("../components/HomeMessage");
    
    // 1.通过Vue.use(插件),安装router插件
    Vue.use(VueRouter);
    
    // 2.创建VueRouter对象
    const routes = [
      {...},
      {
        path: "/home",
        component: Home,
        children: [
          {
            path: "", 
            redirect: "/home/news" //默认首页打开新闻路径显示它的内容
          },
          {
            path: "news",
            component: HomeNews
          },
          {
            path: "message",
            component: HomeMessage
          }
        ]
      },{...}];
    ```

  - 在首页的父组件内部使用`<router-view>`标签来占位

    ```vue
    <!-- Home.vue-->
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
      name: "Home"
    };
    </script>
    
    <style>
    </style>
    ```

- 最后执行`npm run dev`启动服务器，打开 http://localhost:8080/  ，它会自动重定向到 http://localhost:8080/home/news 

  ![1597194932926](F:\coderwhyVue-router\vue_router_note\note-img\嵌套路由的访问结果.png)

### vue-router的query传送数据

- 之前的动态路由是根据参数来传递数据的，这次根据query来传递数据。

  - 新建一个档案的组件

    ```vue
    <!-- Profile.vue-->
    <template>
      <div>
        <h2>我是Profile组件</h2>
        <h2>{{$route.query.name}}</h2>
        <h2>{{$route.query.age}}</h2>
        <h2>{{$route.query.height}}</h2>
      </div>
    </template>
    
    <script>
    export default {
      name: "Profile"
    };
    </script>
    
    <style>
    </style>
    ```

  - 配置路由映射

    ```javascript
    //index.js
    const Profile = () => import("../components/Profile");
    const routes=[{...},{
        path: "/profile",
        component: Profile
      }];
    ```

  - 在主体组件中添加档案的组件

    ```vue
    <!-- App.vue-->
    <router-link :to="{path: '/profile',query: {name: '古力娜扎', age: 28, height: 170}}">档案</router-link>
    <router-view />
    ```

  - 重启服务器 `npm run dev`，打开网站http://localhost:8080, 会自动跳转到 http://localhost:8080/home/news ， 点击组件名为档案的链接，路径就变为 [http://localhost:8080/profile?name=古力娜扎&age=28&height=170](http://localhost:8080/profile?name=古力娜扎&age=28&height=170) 

  ![1597201377549](F:\coderwhyVue-router\vue_router_note\note-img\query获取数据方式的实现.png)

- 传递参数主要有两种类型： params和query

  > params的类型也就是动态路由形式

  - 配置路由的格式：`/user/:userId`
  - 传递的方式：在path后面跟上对应的userId
  - 传递形成的路径：`/user/123`，`/user/xxx`
  - 通过`$route.params.userId`获取指定userId

  > query的类型

  - 配置路由的格式：`/profile`，也就是普通的配置
  - 传递的方式：对象中使用query的key作为传递的方式
  - 传递形成的路径：`/profile?name=xhx&age=22&height=178`（这个传递的是三个键值对），`/profile?profileInfo=%5Bobject%20Object%5D`（这个query传递的是一个对象的键值对，key为profileInfo，value是一个对象）

### 使用代码编写传递数据

- 除了通过`<router-link :to>`方式传递数据之外，还可以使用`button`代替`<router-link>`,并在按钮添加点击事件

  - 在主体组件中替换并编写事件

    ```vue
    <!-- App.vue-->
    <!-- <router-link :to="'/user/'+userId">用户</router-link>
        <router-link :to="{path: '/profile',query: {name: '古力娜扎', age: 28, height: 170}}">档案</router-link>-->
    <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button>
    
    <!-- 这次把数据放置在data()里面-->
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
          ...,
        userClick() { //添加事件
          this.$router.push("/user/" + this.userId);  
        },
        profileClick() {//添加事件
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
    ```

    

  - 修改档案组件

    ```vue
    <!-- Profile.vue-->
    <template>
      <div>
        <h2>我是Profile组件</h2>
        <!-- <h2>{{$route.query.name}}</h2>-->
        <!--<h2>{{$route.query.age}}</h2>-->
        <!--<h2>{{$route.query.height}}</h2>-->
        <h2>{{profileInfo.name}}</h2>
        <h2>{{profileInfo.age}}</h2>
        <h2>{{profileInfo.height}}</h2>
      </div>
    </template>
    
    <script>
    export default {
      name: "Profile",
      computed: { //添加计算属性
        profileInfo() { //获取query里面的profileInfo数据
          return this.$route.query.profileInfo; 
        }
      }
    };
    </script>
    
    <style>
    </style>
    ```

- 这样设置之后，重启服务器，就会看见和上面的普通`<router-link>`的实现是一模一样的。唯一不同的就是链接变成了按钮。

### router和route的由来

vue全局对象`this.$router`与main.js导入的router对象是一个对象，也就是我们`router/index.js`导出的对象router。

```js
new Vue({
  el: '#app',
  router,//使用路由对象
  render: h => h(App)
})
```

```js
//4.导出router实例
export default router
```

`this.$route`对象是当前处于活跃的路由，有params和query属性可以用来传递参数。

查看`vue-router`源码,在我们项目中的`router/index.js`中，vue 对于插件必须要使用`Vue.use(Router)`，来安装插件，也就是执行vue-router的`install.js`。

在[vue-router的github](https://github.com/vuejs/vue-router/tree/dev/src)源码中查看src结构如下：

![](F:\coderwhyVue-router\vue_router_note\note-img\router的github.png)

其中index.js是入口文件，入口js文件就是导入并执行了install.js文件。

![](F:\coderwhyVue-router\vue_router_note\note-img\router和route的解析1.png)

> 发现

install.js中有注册2个全局组件`RouterView`和`RouterLink`，所以我们能使用`<router-view>`和`<router-link>`组件。

![](F:\coderwhyVue-router\vue_router_note\note-img\router和route的解析2.png)

> $router和$route是继承自vue的原型

怎么理解原型？学过Java 的都知道有父类和子类，子类也可以有自己的子类，但是他们都有一个处于最顶层的类Object(所有类的父类)。在Vue中就有那一个`Vue`类似Object，在java中在Object中定义的方法，所有的类都可以使用可以重写，类似的`Vue.prototype`（Vue的原型）定义的属性方法，他的原型链上的对象都可以使用，而`$router`和`$route`都在Vue的原型链上。

在main.js入口文件中在vue的原型上定义一个方法test，然后在User组件中尝试调用。

```js
import Vue from 'vue'
import App from './App'
import router from './router'

//在vue的原型上添加test方法
Vue.prototype.test = function () {
  console.log("test")
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//使用路由对象
  render: h => h(App)
})

```

```vue
<template>
  <div class="page-contianer">
    <h2>这是用户界面</h2>
    <p>这里是用户页面的内容。</p>
    <p>用户ID是: {{ userId }}</p>
    <button @click="btnClick">按钮</button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'User',
  computed:{
    userId() {
      return this.$route.params.userId
    }
  },
  methods: {
    btnClick() {
      //所有组件都继承自vue的原型
      console.log(this.$router)
      console.log(this.$route)
      //调用vue原型的test
      this.test()
    }
  }
}
</script>

<style scoped>
</style>
```

启动项目点击User页面上的按钮，打开浏览器控制台查看日志发现test方法被执行了，而User组件中并未定义test方法，却可以调用。

![](F:\coderwhyVue-router\vue_router_note\note-img\浏览器中的router解析.png)

继续来读install.js，install.js中一开始就将`Vue`这个类当参数传入了install方法中，并把`Vue`赋值给`_Vue`。

![](F:\coderwhyVue-router\vue_router_note\note-img\router和route的解析3.png)

继续读install.js发现以下代码

```js
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })
//Object.defineProperty用来定义属性
  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
```

`Object.defineProperty`用来定义属性，以上代码就是给`Vue.prototype`(Vue原型)添加`$router`和`$route`属性并给属性赋值，等价于

```js
Vue.prototype.$router = {
    get () { return this._routerRoot._router }
}
Vue.prototype.$router = {
  get () { return this._routerRoot._router }
}
```

也就是在Vue的原型上添加`$router`和`$route`属性,再查看get()返回值`this._routerRoot._router`

![](F:\coderwhyVue-router\vue_router_note\note-img\router和route的解析4.png)

这里的`this.$options.router`就是我们main.js入口文件传入的参数`router`，也就是router/index.js导出的`router`对象。

```js
new Vue({
  el: '#app',
  router,//使用路由对象
  render: h => h(App)
})
```

### vue-router的导航守卫

- 问题：我们经常需要在路由跳转后，例如从用户页面跳转到首页，页面内容虽然可以自己定义，但是只有一个html文件，也只有一个title标签，我们需要改变标题。
- 可以使用js去修改title，可以使用vue的生命周期函数在组件被创建的时候修改title标签内容。

```javascript
// home.vue
export default {
   ...,
created() {
	//创建的时候修改title
    document.title = '首页'
}
mounted() {
    //数据被挂载到dom上的时候修改title
}
update() {
    //页面刷新的时候修改
}
};
```

- 真正修改起作用的是created()方法，但是这样必须每个组件都要加生命周期函数，很繁琐。如果我们能监听路由的变化(了解路由从哪来往哪里跳转)，那我们就能在跳转中修改title标签，这就是导航守卫能做的事情。

  - 修改`router/index.js`文件

    ```javascript
    /**
     * 前置钩子：从from跳转到to
     * from 来的路由
     * to 要去的路由
     */
    router.beforeEach((to, from, next) => {
      document.title = to.matched[0].meta.title;//给目标路由的页面的title赋值
      next();next()//必须调用，不调用不会跳转
    });
    ```

    - router.beforeEach()称为前置钩子(前置守卫)，顾名思义，跳转之前做的一些处理。

  - 当然每个路由配置也要加上meta属性，不然就取不到title名了，为什么要使用matched[0]，因为如果你是嵌套路由，又没有给子路由添加meta(元数据：描述数据的数据)属性，就会显示undefined。使用matched[0]表示取到匹配的第一个就会找到父路由的meta属性。

    ```javascript
    //也是在index.js文件中配置
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
          {
            path: "",
            redirect: "/home/news"
          },
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
    ```

- 启动服务，就可以发现在点击组件，页面的的title也会发生变化

### 导航守卫补充

前面说了前置守卫router.beforeEach()，相对的应该也存在后置守卫(后置钩子)。

```js
/**
 * 后置钩子
 */
router.afterEach((to, from) => {
  console.log('后置钩子调用了----')
})
```

顾名思义，也就是在跳转之后的回调函数。

- 前置守卫和后置守卫都是**全局守卫**。
- 还有[路由独享守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E8%B7%AF%E7%94%B1%E7%8B%AC%E4%BA%AB%E7%9A%84%E5%AE%88%E5%8D%AB)
- [组件内的守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E7%BB%84%E4%BB%B6%E5%86%85%E7%9A%84%E5%AE%88%E5%8D%AB)

> 路由独享守卫，路由私有的

```js
  {
    path: '/about',//about 前端路由地址
    component: About,
    beforeEnter: (to, from, next) => {
      console.log('来自' + from.path + ',要去' + to.path)
      next()
    },
    meta: {
      title: '关于'
    }
  },
```

`beforeEnter`的参数与全局守卫一样，修改`about`路由的参数，添加路由独享守卫，此时只有跳转到`about`路由，才会打印日志。

![](F:\coderwhyVue-router\vue_router_note\note-img\前置后置钩子的执行顺序与打印.png)

> 组件内的守卫，直接在组件中定义的属性

- `beforeRouteEnter`
- `beforeRouteUpdate` (2.2 新增)
- `beforeRouteLeave`

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以**不支持**传递回调，因为没有必要了。

```js
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```

这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 `next(false)` 来取消。

```js
beforeRouteLeave (to, from , next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。

### keep-alive

- 现在我们的项目有这样的一个需求：进入网站，默认显示首页和新闻的内容，在这基础上，如果点击了消息一栏，显示出消息的内容，然后我又点击关于，显示出关于的内容，然后我又点击首页，希望他下面显示的是刚才点击过的消息的内容部分。之前是点击首页默认显示新闻的内容。

- 我们先使用`created()`创建和`destoryed()`销毁两个生命周期函数来监听Home组件

  ```vue
  <script>
  export default {
    created() {
      console.log("home created");
    },
    destroyed() {
      console.log("home destroyed");
    },
  };
  </script>
  ```

- 分析一下：在首页和关于组件直接路由跳转的时候，Home组件一直在重复创建和销毁，每次创建都是新的Home组件。我们为了它在路由跳转的时候不被销毁再创建就需要用到`keep-alive`来使组件保持活着的状态，缓存起来，离开home路由后，Home组件的声明周期的`destoryed()`不会被调用，Home组件也不会被销毁了。
  - `keep-alive`是Vue内置的一个组件，可以使被包含的组件保留状态，或者避免重新渲染。
  - `router-view`也是一个组件，如果用`<keep-alive><router-view/></keep-alive>`，将其包起来，所有路径匹配到的视图组件都会被缓存。

- 使用`keep-alive`组件

  ```vue
   <!-- App.vue-->
  <keep-alive>
      <router-view />
  </keep-alive>
  ```

- 重启服务器，从关于切换到首页的时候，还是现实的是新闻的内容，而不是消息的内容，这是因为之前配置路由`/home`被默认重定向到了`/home/news`。所以在访问`/home`的时候每次出来的都是新闻的内容。

- 所以我们得将默认的重定向去掉，这样就会出现第一次进入首页，新闻内容将不会显示了，与我们之前的需求背道而驰了。

  ```javascript
  //index.js
  // {
        //   path: "",
        //   redirect: "/home/news"
        // },
  ```

- 为了第一次访问首页的时候能将新闻内容显示出来，我们在Home组件的`active()`生命周期函数中，用代码的方式手动重定向，也就是使用push()方法。

- 但是，由于`keep-alive`组件只创建一次，第一次进入Home组件的时候，新闻页面显示正常，当第二次跳转首页的时候，因为不会再调用`created()`，所以新闻页面又不会显示了。
- 为了解决这个问题，在Home组件中引入`activated()`和`deactivated()`两个函数，这2个函数与`keep-alive`有关，不使用`keep-alive`的这两个函数无效。

  - `activated()`当组件属于进入活跃状态的时候调用
  - `deactivated()`当组件属于退出活跃状态的时候调用(此时路由已经跳转，所以不能在此方法中修改路由，因为修改的是to路由)
- 为了使第二次进入首页新闻页面可以生效，使用`activated()`在Home组件使活跃状态时候就重定向。`deactivated()`记录的路由是点击触发跳转的那个路由，而不是记录离开时候所在的路由，所以我们需要用到路由守卫。
- 使用路由守卫(组件内守卫)，`beforeRouteLeave (to, from , next)`在离开路由的时候将当前的路由赋值给path并保存起来。

```vue
<!-- Home.vue-->
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
    console.log("created");
//    this.$router.push(this.path) //虽然解决了第一次访问首页自动显示新闻的内容，但是不能实现跳转之后显示消息的功能。所以废弃掉
  },
  destroyed() {
    console.log("home destroyed");
//    this.path = this.$route.path
  },
  // activated 和deactivated 这两个函数，只有该组件被保持了状态 也就是使用了keep-alive时，才是有效的
  activated() {
    console.log("activeted");
    this.$router.push(this.path); //第一次打开首页时重定向路由到新闻内容
  },
  deactivated() {
    console.log("deactiveted");
  },
  //beforeRouteLeave 离开路由之前 记录路由路径
  beforeRouteLeave(to, from, next) {
    console.log(this.$route.path);
    this.path = this.$route.path; //如果我现在在消息的路由里，点击关于，那么我会把this.path的路由改为/home/message,并且在关于切换到首页时，重定向到该路由 ，也就是显示出消息的内容，这样我们的功能就实现完成了。
    next();
  }
};
</script>
```

- 重启服务器，进入首页，显示的是新闻的内容，点击消息，显示出消息的内容，再点击关于，然后切换到首页，会显示出消息的内容而不是新闻的内容，这样功能就完美的实现了。

### keep-alive的属性

- 在上面我们使用了`<keep-alive>`把`<router-view />`都包裹起来了，那么所有的组件都会被缓存，都只会创建一次，如果我们希望档案组件和用户组件每次访问时都重新创建，离开访问就销毁，那么需要使用`exclude`属性-字符串或正则表达，任何匹配的组件都不会被缓存。

  ```vue
  <!-- App.vue-->
  <keep-alive exclude="Profile,User">
        <router-view />
      </keep-alive>
  ```

  - 此时`Profile`和`User`组件（这里组件需要有name属性，分别为`Profile`和`User`）就被排除在外，每次都会创建和销毁。相对应的也有`include`属性，顾名思义就是包含，只有选中的才有`keep-alive`。
    - `include`和`exclude`都是使用字符串和正则表达式，使用字符串的时候，注意“,”之后之前都别打空格。

- keep-alive还有另外一个属性是`include`-字符串或正则表达，只有匹配的组件会被缓存

## 综合练习-实现Tab-Bar

### 实现Tab-Bar思路

1. 下方单独的`Tab-Bar`组件如何封装？
   - 自定义`Tab-Bar`组件，在APP中使用
   - 让`Tab-Bar`位置在底部，并设置你需要的样式
2. `Tab-Bar`中显示的内容由外部决定
   - 定义插槽
   - flex布局平分`Tab-Bar`
3. 自定义`Tab-Bar-Item`，可以传入图片和文字
   - 定义`Tab-Bar-Item`，并定义两个插槽：图片和文字
   - 给插槽外层包装`div`，设置样式
   - 填充插槽，实现底部`Tab-Bar`的效果
4. 传入高亮图片
   - 定义另一个插槽，插入`active-icon`的数据
   - 定义一个变量`isActicve`，通过`v-show`来决定是否显示对应的icon
5. `Tab-Bar-Item`绑定路由数据
   - 安装路由：`npm install vue-router --save`
   - 在`router/index.js`配置路由信息，并创建对应的组件
   - `main.js`中注册`router`
   - `App.vue`中使用`router-link`和`router-view`
6. 点击item跳转到对应的路由，并且动态决定`isActive`
   - 监听`item`的点击，通过`this.$router.replace()`替换路由路径
   - 通过`this.$route.path.indexOf(this.link)!==-1`来判断是否使`active`
7. 动态计算active样式
   - 封装新的计算属性：`this.isActive?{'color': 'red'}:{}`

### 代码实现

使用`vue init webpack 02-vue-router-tabbar-v1`新建一个项目工程(使用`vuecli2`)。

1. **在文件夹assest下新建css/base.css,用于初始化css**


   ```css
/*base.css*/
body {
     padding: 0;
     margin: 0;
   }
   ```

   ```vue
<!-- 修改App.vue，添加初步样式-->
<template>
     <div id="app">
       <div id="tar-bar">
         <div class="tar-bar-item">首页</div>
         <div class="tar-bar-item">分类</div>
         <div class="tar-bar-item">购物车</div>
         <div class="tar-bar-item">我的</div>
       </div>
     </div>
   </template>

   <script>
   export default {
     name: 'App'
   }
   </script>

   <style>
       /* style中引用使用@import */
     @import url('./assets/css/base.css');

     #tar-bar {
       display: flex;
       background-color: #f6f6f6;

       position: fixed;
       left: 0;
       right: 0;
       bottom: 0;

       box-shadow: 0 -1px  1px rgba(100, 100, 100, .2);
     }

     .tar-bar-item {
       flex: auto;
       text-align: center;
       height: 49px;
       font-size: 20px;
     }
   </style>
   ```

- 使用npm run dev，查看网页效果

> 在项目中如果我们想复用tabbar，那么每次都需要复制粘贴，所以要把tabar从App.vue中抽离出来。

2. **将tabar抽离成组件**

   在components下新建tabbar文件夹，新建`TarBar.vue`和`TabBarItem.vue`,`TabBarItem`组件是在组件`TarBar`中抽取出来的进行一个细分，为了传入图标和文字，所以需要使用插槽`<slot>`代替。

   > TabBar.vue

```vue
<template>
  <div id="tab-bar">
    <!--  TabBar弄一个slot插槽用于插入TabBarItem组件（可能插入多个）.-->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
}
</style>
```

> TabBarItem.vue

```vue
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
    isActive() { //用于判断选中高亮的方法
      //   /home -> item1(/home) = true
      //   /home -> item1(/category) = false
      //   /home -> item1(/cart) = false
      //   /home -> item1(/profile) = false
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {//用于根据高亮用户自定义颜色的方法
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
```

上面的代码还实现了点击首页首页字体变红图片变红色

这里需要用到路由的`active-class`。

> 思路：引用2张图片，一张是正常颜色一张是红色，使用`v-if`和`v-else`来处理是否变色，在路由处于活跃状态的时候，变红色。

- 使用`props`获取传递的值，这里传递是激活颜色，默认是红色

- 设置计算属性`isActive`和`activeStyle`，分别表示激活状态和激活的样式

- 定义`itemClick()`方法用于获取点击事件，点击后使用代码实现路由跳转，这里使用默认的hash模式，要改成history模式得去index.js中修改路由配置。

- 使用`v-if`和`v-else`来进行条件判断。

3. **将每个TabBarItem的显示内容建立组件用于跳转显示。**

- 我们在src资源文件夹下，新建views文件夹，在它里面新建四个文件夹，分别代表四个item，分别是home文件夹里面存放Home组件、category文件夹存放Category组件、cart文件夹存放Cart组件、profile文件夹存放Profile组件。

  - 它们的代码都差不多一样的，因为在这里就简单的做一下实现。

    ```vue
    <!-- Home.vue 组件  其他的也就是h2标签中的内容不同罢了-->
    <template>
      <h2>首页</h2>
    </template>
    
    <script>
    export default {
      name: "Home"
    };
    </script>
    
    <style>
    </style>
    ```

4. **我们需要把这四个组件用路由的方式来获取**

   - 在index.js中导入它们。

     ```javascript
     //懒加载的方式导入组件
     const Home = () => import('../views/home/Home')
     const Category = () => import('../views/category/Category')
     const Cart = () => import('../views/cart/Cart')
     const Profile = () => import('../views/profile/Profile')
     
     
     // 1.安装插件
     Vue.use(Router)
     
     // 2.创建路由对象
     const routes = [{
       path: '',
       redirect: '/home'
     }, {
       path: '/home',
       component: Home
     }, {
       path: '/category',
       component: Category
     }, {
       path: '/cart',
       component: Cart
     }, {
       path: '/profile',
       component: Profile
     }]
     const router = new Router({
       routes,
       mode: 'history'  //修改hash模式为history，这样就在浏览器路径中看不见#了。
     })
     ```

5. **接下来就要在App.vue中使用模板来实现`<router-view />`了，但是感觉这样抽离之后App.vue组件还是感觉很繁琐，因为要在里面大量的使用图片和文字引入，所以我们可以继续抽离模板，也就是把整体的TabBar.vue又抽离一下。**

- 所以我们在资源文件夹下面的components文件夹下新建MainTabBar.vue组件，它是整体的模式一个实现。

  ```vue
  <!-- MainTabBar.vue-->
  <template>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/home.png" />
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.png" />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="deepPink">
        <img slot="item-icon" src="../assets/img/tabbar/categories.png" />
        <img slot="item-icon-active" src="../assets/img/tabbar/categories_active.png" />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="deepPink">
        <img slot="item-icon" src="../assets/img/tabbar/shopcart.png" />
        <img slot="item-icon-active" src="../assets/img/tabbar/shopcart_active.png" />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="deepPink">
        <img slot="item-icon" src="../assets/img/tabbar/profile.png" />
        <img slot="item-icon-active" src="../assets/img/tabbar/profile_active.png" />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </template>
  
  <script>
  //在这里导入文件的方式使用了别名
  import TabBar from "components/tabbar/TabBar";
  import TabBarItem from "components/tabbar/TabBarItem";
  
  export default {
    name: "MainTabBar",
    components: { TabBar, TabBarItem }
  };
  </script>
  
  <style>
  </style>
  ```

- 抽离之后我们就可以在App.vue中实现了。

  ```vue
  <!--此时的App.vue就很简洁了,因为我们把具体的资源路径导入放置在MainTabBar.vue中-->
  <template>
    <div id="app">
      <router-view></router-view> <!--因为tabbar在页面的下方，所以路由的view在上面-->
      <main-tab-bar></main-tab-bar>
    </div>
  </template>
  
  <script>
  import MainTabBar from "./components/MainTabBar";
  
  export default {
    name: "App",
    components: {
      MainTabBar
    }
  };
  </script>
    
  <style>
  @import "./assets/css/base.css";
  </style>
  
  ```

6. 重启服务器`npm run dev` 输入http://localhost:8080, 就会自动跳转到首页，并且首页组件会高亮显示，点击其他的如分类、购物车、我的，它们会在点击时高亮，而其他没点击的会变黯淡。以上就实现了Tab-Bar组件的一个封装。

![1597301982631](F:\coderwhyVue-router\vue_router_note\note-img\Tab-Bar组件的路由实现.png)

### 别名配置

- 我们在引入图片文件等资源的时候使用相对路径，诸如`../assets/xxx`这样的使用`../`获取上一层，如果有多个上层就需要`../../xxx`等等这样不利于维护代码。此时就需要一个能获取到指定目录的资源的就好了。

- 在上面的Tab-Bar我们就用到了别名来快速的导入资源。在项目里，我们在build文件夹中找到webpack.base.conf.js 别名配置就在这里面，可以自定义配置要的路径。

  ```javascript
  module.exports = {
  ...
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'), //当我们导入资源的时候输入@ 它会自动找到src文件夹
        'assets': resolve('src/assets'),//导入资源输入assets时，自动找到src/assets
        'components': resolve('src/components'),//同上原理
        'views': resolve('src/views'),//同上原理
      }
    }
  };
  ```

- 在项目中导入使用。我们还是以Tab-Bar的实现项目为例

  ```vue
  <!-- MainTabBar.vue-->
  <template>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/home.png" />
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.png" />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="deepPink">
        <img slot="item-icon" src="../assets/img/tabbar/categories.png" />
        <img slot="item-icon-active" src="../assets/img/tabbar/categories_active.png" />
        <div slot="item-text">分类</div>
      </tab-bar-item>
    </tab-bar>
  </template>   
  
  <script>
  //在这里导入文件的方式使用了别名
  import TabBar from "components/tabbar/TabBar";
  import TabBarItem from "components/tabbar/TabBarItem";
  
  export default {
    name: "MainTabBar",
    components: { TabBar, TabBarItem }
  };
  </script>
  
  <style>
  </style>
  ```
  - 上面组件的template模板中第一二个img资源引用中使用了别名的方式，在使用的时候前面加了~；在script导入其他组件的时候也使用了别名，但是前面没有加~ 

