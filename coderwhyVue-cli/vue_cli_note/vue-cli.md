## Vue CLI

### 什么是Vue CLI

- 如果你只是简单写几个Vue的Demo程序，那么你不需要Vue CLI
- 如果你在开发大型项目，那么你需要，并且必然需要使用Vue CLI
  - 使用Vue.js开发大型应用时，我们需要考虑代码目录结构、项目结构和部署、热加载、代码单元测试等事情。
  - 如果每个项目都要手动完成这些工作，那么无疑效率比较低效，所以通常我们会使用一些手脚架工具来帮助完成这些事情。
- CLI 是什么意思？
  - CLI是Command-Line Interface，翻译为命令行界面，但是俗称手脚架。
  - Vue CLI是一个官方发布 vue.js项目手脚架
  - 使用vue-cli可以快速搭建Vue开发环境以及对应的webpack配置

##### Vue CLI使用前提 -Node

##### Vue CLI使用前提 -Webpack

- Vue.js官方手脚架工具就使用了webpack模板
  - 对所有的资源会压缩等优化操作
  - 它在开发过程中提供了一套完整的功能，能够使得我们开发过程中变得高效
- Webpack全局安装  `npm install -g webpack@3.6.0 `

### Vue cli使用

- 安装vue脚手架，现在脚手架版本是vue cli3

```shell
npm install -g @vue/cli@3.2.1
```

- 如果使用yarn

```bash
yarn global add @vue/cli@3.2.1
```

- 安装完成后使用命令查看版本是否正确：

```bash
vue --version
```

> - 注意安装cli失败

1. 以管理员使用cmd
2. 清空npm-cache缓存

```bash
npm clean cache -force
```

- **拉取2.x模板（旧版本）**

 Vue CLI >= 3 和旧版使用了相同的 `vue` 命令，所以 Vue CLI 2 (`vue-cli`) 被覆盖了。如果你仍然需要使用旧版本的 `vue init` 功能，你可以全局安装一个桥接工具： 

```bash
npm install -g @vue/cli-init
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```

- Vue CLI2初始化项目
  
  - vue init webpack my-project
- Vue CLI3初始化项目
  
- vue create my-project
  
- 现在我们来通过vue-cli2来创建一个项目  `vue init webpack 01-vuecli2test`

  ![1596709782621](F:\coderwhyVue-cli\vue_cli_note\note_img\创建项目选项明细.png)

  - Project name：项目名称(默认)
  - Project description：项目描述
  - author：作者(会默认拉取git中的配置)
  - vue build：vue构建时候使用的模式
    - runtime+compiler：大多数人使用的，可以编译template模板
    - runtime-only：比compiler模式要少6kb，并且效率更高，直接使用render函数
  - install vue-router：是否安装vue路由
  - Use ESLint to lint your code：是否使用ES规范
  - Set up unit tests：是否使用unit(单元)测试
  - Setup e2e tests with Nightwatch：是否使用end to end ，点到点自动化测试
  - Should we run `npm install` for you after the project has been created? (recommended)：使用npm还是yarn管理工具

- 等待创建工程成功。

  > 注意：如果创建工程时候选择了使用ESLint规范，又不想使用了，需要在config文件夹下的index.js文件中找到useEslint，并改成false。

  ```javascript
  // Use Eslint Loader?
      // If true, your code will be linted during bundling and
      // linting errors and warnings will be shown in the console.
      useEslint: true,
  ```

### vue-cli的目录结构

- 当项目通过手脚架创建完成之后，打开项目目录：

![1596714236371](F:\coderwhyVue-cli\vue_cli_note\note_img\vue-cli目录结构.png)

- 其中build和config都是配置相关的文件。

#### build和config

![1596714397603](F:\coderwhyVue-cli\vue_cli_note\note_img\build-config目录.png)

- 如图所示，build中将webpack的配置文件做了分离：
  - `webpack.base.conf.js`（公共配置）
  - `webpack.dev.conf.js`（开发环境）
  - `webpack.prod.conf.js`（生产环境）

- 我们使用的脚本命令配置在`package.json`中。

  ```javascript
  "scripts": {
      "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
      "start": "npm run dev",
      "build": "node build/build.js"
  },
  ```

- 打包构建：

```bash
npm run build
```

- 如果搭建了本地服务器`webpack-dev-server`，本地开发环境：

```bash
npm run dev
```

- 此时`npm run build`打包命令相当于使用node 执行build文件夹下面的build.js文件。

> build.js

![1596714598808](F:\coderwhyVue-cli\vue_cli_note\note_img\检查dist文件夹是否存在代码.png)

- 检查dist文件夹是否已经存在，存在先删除

  如果没有err，就使用webpack的配置打包dist文件夹

- 在生产环境，即使用build打包时候，使用的是`webpack.prod.conf.js`配置文件。

![1596714750971](F:\coderwhyVue-cli\vue_cli_note\note_img\prod.config配置文件代码解析.png)

- 源码中，显然使用了`webpack-merge`插件来合并prod配置文件和公共的配置文件，合并成一个配置文件并打包，而`webpack.dev.conf.js`也是如此操作，在开发环境使用的是dev的配置文件。

- config文件夹中是build的配置文件中所需的一些变量、对象，在`webpack.base.conf.js`中引入了`index.js`。

```javascript
const config = require('../config')
```

#### src和static

- src源码目录，就是我们需要写业务代码的地方。

- static是放静态资源的地方，static文件夹下的资源会原封不动的打包复制到dist文件夹下。

#### 其他相关文件

##### .babelrc文件

- .babelrc是ES代码相关转化配置。

```json
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-vue-jsx", "transform-runtime"]
}
```

browsers表示需要适配的浏览器，份额大于1%，最后两个版本，不需要适配ie8及以下版本

babel需要的插件

#####  .editorconfig文件

- .editorconfig是编码配置文件。

```properties
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

​	一般是配置编码，代码缩进2空格，在js文件最后加个换行，是否清除空格等

##### .eslintignore文件

- .eslintignore文件忽略一些不规范的代码。

```
/build/
/config/
/dist/
/*.js
```

​	忽略build、config、dist文件夹和js文件。

##### .gitignore文件

- .gitignore是git忽略文件，git提交忽略的文件。

##### .postcssrc.js文件

- css转化时配置的一些。

##### index.html文件

- index.html文件是使用`html-webpack-plugin`插件打包的index.html模板。

##### package.json和package-lock.json

1. package.json(包管理,记录大概安装的版本)
2. package-lock.json(记录真实安装版本)

### runtime-compiler和runtime-only区别

- 新建两个vuecli2项目：

```bash
//新建一个以runtime-compiler模式
vue init webpack 02-runtime-compiler
//新建一个以runtime-only模式
vue init webpack 03-runtime-only
```

- 两个项目的main.js区别

> runtime-compiler

```javascript
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```

> runtime-only

```javascript
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
```

`render: h => h(App)`

```javascript
render:function(h){
  return h(App)
}
```

- **compiler编译解析template过程**

![1596763096276](F:\coderwhyVue-cli\vue_cli_note\note_img\compiler渲染template过程.png)

`vm.options.template`解析成`ast(abstract syntax tree)`抽象语法树，抽象语法树编译成`vm.options.render(functions)`render函数。render函数最终将template解析的ast渲染成虚拟DOM（`virtual dom`），最终虚拟dom映射到ui上。

**runtime-compiler**

  template会被解析 => ast(抽象语法树) => 然后编译成render函数 => 渲染成虚拟DOM（vdom）=> 真实dom(UI)
**runtime-only**
  render => vdom => UI

1.性能更高，2.需要代码量更少

> render函数

```javascript
render:function(createElement){
  //1.createElement('标签',{标签属性},[''])
  return createElement('h2',
    {class:'box'},
    ['Hello World',createElement('button',['按钮'])])
  //2.传入组件对象
  //return createElement(cpn)
}
```

h就是一个传入的createElement函数，.vue文件的template是由vue-template-compiler解析。

将02-runtime-compiler的main.js修改

```javascript
new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>'
  //1.createElement('标签',{标签属性},[''])
  render(createElement){
    return createElement('h2',
    {class:'box'},
    ['hello vue', createElement('button',['按钮'])])
  }
})
```

并把config里面的inedx.js的`useEslint: true`改成false，即关掉eslint规范，打包项目`npm run dev`，打开浏览器。

### vue-cli3起步

**vue-cli3与2版本区别**

- vue-cli3基于webpack4打造，vue-cli2是基于webpack3
- vue-cli3的设计原则是"0配置"，移除了配置文件，build和config等
- vue-cli3提供`vue ui`的命令，提供了可视化配置
- 移除了static文件夹，新增了public文件夹，并将index.html移入了public文件夹

**创建vue-cli3项目**

```bash
vue create 04-vuecli3test
```

**目录结构：**

![1596768943137](F:\coderwhyVue-cli\vue_cli_note\note_img\cli3项目目录结构.png)

- public 类似 static文件夹，里面的资源会原封不动的打包
- src源码文件夹

使用`npm run serve`运行服务器，打开浏览器输入http://localhost:8080/

打开src下的main.js

```javascript
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app') //mount类似挂载el：#app
```

`Vue.config.productionTip = false`构建信息是否显示

如果vue实例有el选项，vue内部会自动给你执行`$mount('#app')`，如果没有需要自己执行。

### vue-cli3的配置

- 在创建vue-cli3项目的时候可以使用`vue ui`命令进入图形化界面创建项目，可以以可视化的方式创建项目，并配置项。

- vue-cli3配置被隐藏起来了，可以在`node_modules`文件夹中找到`@vue`模块，打开其中的`cli-service`文件夹下的`webpack.config.js`文件。

- 再次打开当前目录下的`lib`文件夹，发现配置文件`service.js`，并导入了许多模块，来自与lib下面的config、util等模块

**如何要自定义配置文件**

- 在项目根目录下新建一个`vue.config.js`配置文件，必须为`vue.config.js`，vue-cli3会自动扫描此文件，在此文件中修改配置文件。

  ```javascript
  //在module.exports中修改配置
  module.exports = {
    
  }
  ```

  

