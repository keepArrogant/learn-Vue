# axios

### 选择什么网络模块？

- Vue中发送网络请求有非常多的方式，那么，在开发中，如何选择呢？
  - 选择一：传统的Ajax是基于XMLHttpRequest（XHR）
    - 为什么不用它呢？
      - 配置和调用方式等非常混乱
      - 编码看起来就非常蛋疼
      - 所以真实开发中很少直接使用，而是使用jQuery-Ajax
  - 选择二：jQuery-Ajax，相对于传统的Ajax非常好用
    - 为什么不选择它呢？
      - 在Vue的整个开发中都是不需要使用jQuery了
      - 为了方便我们进行一个网络请求，特意引用一个jQuery框架，完全没有必要
  - 选择三：官方在Vue1.x的时候，推出了Vue-resource
    - Vue-resource的体积相对于jQuery小很多
    - 另外Vue-resource是官方推出的
    - 为什么不选择它呢？
      - 在Vue2.0推出后，Vue作者就在GitHub的Issues中说明去掉了vue-resource，并且以后不会再更新了。
      - 那么意味着vue-resource不再支持新的版本，也不会再继续更新和维护
      - 对以后项目的开发和维护都存在很大的隐患
  - 选择四：axios ： ajax i/o system  
    - 功能特点：在浏览器中发送XMLHttpRequests请求
    - 在node.js中发送http请求
    - 支持Promise API
    - 拦截请求和响应
    - 转换请求和响应数据

### jsonp

- 在前端开发中，我们一种常见的网络请求方式就是JSONP
  - 使用JSONP最主要的原因往往是为了解决跨域访问的问题
- JSONP的原理是什么呢？
  - JSONP的核心在于通过`<script>`标签的src来帮助我们请求数据
  - 原因是我们的项目部署在xxx1.com服务器上时，是不能直接访问xxx2.com服务器上的资料的
  - 这个时候，我们利用`<script>`标签的src帮助我们去服务器请求到数据，将数据当做一个JavaScript的函数来执行，并且执行的过程中传入我们需要的json
  - 所以，封装jsonp的核心就在于我们监听window上的jsonp进行回调时的名称

![1597542793935](F:\coderwhyAxios\note\img_note\JSONP交互原理.png)

![1597542850437](F:\coderwhyAxios\note\img_note\JSONP封装.png)

### axios请求方式

- 在配置请求前，我们要先搭建Vue的项目，此时用vue-cli2

  `vue init webpack learnaxios`

- 再安装axios框架，因为后续会用到，所以采取全局安装

  `npm install axios@0.18.0 --save `

- 导入框架，获取接口数据

  ```javascript
  import Vue from "vue";
  import App from "./App";
  //导入axios框架
  import axios from "axios";
  
  Vue.config.productionTip = false;
  
  /* eslint-disable no-new */
  new Vue({
    el: "#app",
    render: h => h(App)
  });
  //axios基本使用
  axios({
    url: "http://123.207.32.32:8000/home/multidata",
    method: "get"
  }).then(res => {
    console.log(res);
  });
  //发送请求获取数据
  axios({
    // url: "http://123.207.32.32:8000/home/data?type=sell&page=3"
    url: "http://123.207.32.32:8000/home/data",
    //专门针对get请求的参数拼接
    params: {
      type: "pop",
      page: 1
    }
  }).then(res => {
    console.log(res);
  });
  
  ```

### 发送并发请求

- 有时候，我们可能需求同时发送两个请求
  - 使用axios.all，可以放入多个请求的数组
  - axios.all([]) 返回的结果是一个数组,使用axios.spread 可将数组[res1, res2]展开为res1，res2

```javascript
// axios发送并发请求
axios.all([axios({
  url: 'http://123.207.32.32:8000/home/multidata'
}), axios({
  url: 'http://152.136.185.210:8000/api/z8/home/data',
  params: {
    type: 'sell',
    page: 5
  }
})]).then(axios.spread((res1, res2) => {
  console.log(res1)
  console.log(res2)
}))
```

### 全局配置

- 在上面的示例中，我们的BaseURL是固定的

  - 事实上，在开发中可能很多参数都是固定的。

  - 那么我们可以进行一些抽取，也可以利用axios的全局配置

    ```javascript
    //抽取公共的部分
    axios.defaults.baseURL = 'http://152.136.185.210:8000/api/z8'
    axios.defaults.timeout = 5000
    //发送并发请求
    axios.all([axios({
      url: '/home/multidata'
    }), axios({
      url: '/home/data',
      params: {
        type: 'sell',
        page: 5
      }
    })]).then(axios.spread((res1, res2) => {
      console.log(res1)
      console.log(res2)
    }))
    ```

### 常见的配置选项

- 请求地址： url： '/user'
- 请求类型： method: 'get'
- 请根路径：baseURL：‘http://www.mt.com/api’
- 请求前的数据处理：transformRequest：[function(data){}]
- 请求后的数据处理：transformResponse：[function(data){}]
- 自定义的请求头：headers:{'x-Requested-With':'XMLHttpRequest'}
- URL查询对象：params:{id:12}
- 查询对象序列化函数：paramsSerializer:function(params){ }
- request body： data:{key: 'aa'}
- 超时设置s : timeout: 1000
- 跨域是否带Token：withCredentials:false
- 自定义请求处理：adapter:function(resolve, reject, config)
- 身份验证信息：auth: {uname: '', pwd: '12'}
- 响应的数据格式 json /blob/decument/arraybuffer/text/stream  ： responseType: 'json'

### axios的封装

在我们使用axios来获取服务器的数据的时候，多个js文件来请求数据的时候都要使用axios未免也太依赖这个框架了，如果以后axios这个框架逐渐退出历史的舞台不维护了，出现了新的框架需要加入到项目中，那么一个个文件来修改这样工程量未免也太大了，所以我们要对axios进行封装。

- 我们在项目的src文件夹下新建network文件夹，用来存放axios的请求文件。

- 在network文件夹下新建request文件

  ```javascript
  //request.js
  import axios from 'axios'
  
  //最终封装
  export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/z8',
      timeout: 5000
    })
  
    // 发送真正的网络请求  return Promise
    return instance(config)
  
  }
  ```

- 在main.js中引入request.js

  ```javascript
  import Vue from "vue";
  import App from "./App";
  
  Vue.config.productionTip = false;
  
  /* eslint-disable no-new */
  new Vue({
    el: "#app",
    render: h => h(App)
  });
  
  //导入request模块
  import {
    request
  } from './network/request'
  
  // 4.获取数据和错误信息
  request({
    url: '/home/multidata'
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
  ```

### axios的实例

- 为什么要创建axios的实例呢？
  - 当我们从axios模块中导入对象时，使用的实例是默认的实例
  - 当给该实例设置一些默认配置时，这些配置就被固定下来了
  - 但是后续开发中，某些配置可能会不太一样。
  - 比如某些请求需要使用特定的baseURL或者timeout或者content-Type等
  - 这个时候，我们就可能创建新的实例，并且传入属于该实例的配置信息

### axios的拦截器

- 在项目中，我们对于所有的请求和响应处理都可以进行拦截，并进行判断过滤来排除掉恶意请求。

- 还是基于request.js的封装上来对封装文件进行升华

  ```javascript
  import axios from 'axios'
  
  //最终封装
  export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/z8',
      timeout: 5000
    })
  
    // 2. axios的拦截器
    // 2.1 请求拦截
    instance.interceptors.request.use(config => {
      // console.log(config)
      // 1.比如config中一些信息不符合服务器的要求
  
      // 2.如果每次发送网络请求时，都希望在界面中显示一个请求的图标
  
      // 3. 某些网络请求(比如登录(token)) 必须携带一些特殊的信息
  
      return config
    }, err => {
      // console.log(err)
    })
  
    // 2.2 响应拦截
    instance.interceptors.response.use(res => {
      // console.log(res)
      //   可以拦截返回的结果
      return res.data
    }, err => {
      console.log(err)
    })
    // 3. 发送真正的网络请求
    return instance(config)
  
  }
  ```

  