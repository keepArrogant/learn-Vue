## Webpack

### 什么是Webpack

- 从本质上来讲，webpack是一个现代的JavaScript应用的静态**模块打包**工具

但是它是什么呢？用概念解释概念，还是不清晰

- 我们从两个点来解释上面的这句话： **模块 **和 **打包**

### 前端模块化

- 在`ES6`之前，我们想要进行模块化开发，就必须借助于其他的工具，让我们可以进行模块化开发。
- 并且在通过模块化开发完成了项目后，还需要处理模块间的各种依赖，并且将其进行整合打包。
- 而webpack其中的一个核心就是让我们可能进行模块化开发，并且会帮助我们处理模块间的依赖关系。
- 而且不仅仅是JavaScript文件，我们的CSS、图片、json文件等在webpack中都可以被当做模块来使用
- 这就是webpack中模块化的概念

**打包如何理解呢？**

- 理解了webpack可以帮助我们进行模块化，并且处理模块间的各种复杂关系后，打包的概念就非常好理解了。
- 就是将webpack中的各种资源模块进行打包合并成一个或多个包
- 并且在打包的过程中，还可以对资源进行处理，比如压缩图片，将scss转成css，将`ES6`语法转成`ES5`语法，将TypeScript转成JavaScript等等操作。

### 和grunt/gulp的对比

- gunt/gulp的核心是Task
  - 我们可以配置一系列的task，并且定义task要处理的事务(例如ES6、ts转化、图片压缩，scss转css)
  - 之后让gunt/gulp来依次执行这些task，而且让整个流程自动化
  - 所以gunt/gulp也被称为前端自动化任务管理工具

- 我们来看一个gulp的task

  ```javascript
  const gulp = require('gulp')
  const babel = require('gulp-babel')
  
  gulp.task('js', () => 
           gulp.src('src/*.js')
            .pipe(babel({
      		presets: ['es2015']
  			}))
            .pipe(gulp.dest('dist'))
   );
  ```

  - 上面的task就是将src下面的所有js文件转成ES5的语法
  - 并且最终输出到dist文件夹中

- 什么时候用gunt/gulp呢？

  - 如果你的工程模块依赖非常简单，甚至是没有用到模块化的概念。
  - 只需要进行简单的合并、压缩，就使用gunt/gulp即可。
  - 但是如果整个项目使用了模块化管理，而且相互依赖非常强，我们就可以使用更加强大的webpack了。

- 所以，gunt/gulp和webpack有什么不同呢？

  - gunt/gulp更加强调的是前端流程的自动化，模块化不是它的核心。
  - webpack更加强调模块化开发管理，而文件压缩合并、预处理等功能，是它附带的功能。

### webpack安装

- webpack为了可以正常运行，必须依赖node环境，node环境为了可以正常的执行很多代码，必须其中包含各种依赖的包，npm工具(node packages manager)

- 安装webpack首先需要安装Node.js ，Node.js 自带了软件包管理工具npm

- 查看自己的node版本： node -v

- 全局安装webpack(这里指定版本号3.6.0，因为vue cli2依赖该版本)

  `npm install webpack@3.6.0 -g`

- 局部安装webpack(后续才需要)

  - --save-dev 是开发时依赖，项目打包后不需要继续使用的

  `npm install webpack@3.6.0 --save-dev`

- 为什么全局安装后，还需要局部安装？
  - 在终端直接执行webpack命令，使用的全局安装的webpack
  - 当在package.json中定义了script时，其中包含了webpack命令，那么使用的是局部webpack

### webpack的使用

- 首先建立两个文件夹：一个是src源文件夹 ，一个是dist打包之后的文件夹，最后在index.html文件中调用dist文件夹中的bundle.js文件 

  ![1596503786303](F:\coderwhy_Webpack\webpack_note_img\目录结构.png)

  - 为什么用src文件夹中的main.js在进行打包呢？ 
    - 因为src中其他的文件都依赖于main.js 运行，它们的模块都导入到main.js中，所以打包的时候只需要打包main.js 这样webpack就会自动的处理这些依赖。

![1596503852957](F:\coderwhy_Webpack\webpack_note_img\cmd打包.png)

### webpack配置

- 我们考虑一下，如果每次使用webpack的命令都需要写上入口和出口作为参数，就非常麻烦，如果不想写上面那么繁琐的路径，可以将这两个参数写到配置中，在运行时，直接读取。

  - 创建一个webpack.config.js文件

    ```javascript
    const path = require('path')
    
    module.exports = {
        entry: './src/main.js',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js'
        }
    }
    ```

    因为上面的代码用到了path模板，它是node的核心模块，所以下面要建立一个依赖。

  - 在当前目录下 使用命令 npm init -y 创建依赖， 生成的默认的package.json 文件

  - 把文件配置路径的导入和导出位置配置好了，那么只用在命令行内输入webpack即可打包

- 上面我们用命令 npm init -y 创建了依赖，那么项目中如果有其他第三方包的话，我们又需要使用命令 npm install 来下载这些第三方包的依赖，这样会在项目中生成package-lock.json文件

### package.json 中定义启动

- 上面把文件打包映射到webpack 命令中了 但是现在我想把这个映射又给npm run build命令，需要进行如下配置

  - 在刚才的package.json文件中找到"scripts"属性，在这个属性下面添加"build"属性，值为webpack

    ```json
    {
      "name": "02-webpack_config",
      "version": "1.0.0",
      "description": "",
      "main": "webpack.config.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack"  //把webpack映射到build上
      },
      "keywords": [],
      "author": "",
      "license": "ISC"
    }
    ```

  - 经过上面的配置，就可以在命令行中执行我们的build指令 npm run build 
  - 它的按照一定的顺序进行查找，首先会寻找本地的node_modules/.bin路径中对应的命令。
  - 如果没有找到，会去全局的环境变量中寻找。

### 局部安装webpack

- 目前，我们使用的webpack是全局的webpack，如果我们想使用局部来打包呢？

  - 因为一个项目往往依赖特定的webpack版本，全局的版本可能与这个项目的webpack版本不一致，导出打包出现问题。
  - 所以通常一个项目，都有自己局部的webpack。

- 第一步，项目中需要安装自己局部的webpack

  - 这里我们让局部安装webpack3.6.0

  - Vue CLI3中已经升级到webpack4，但是它将配置文件隐藏了起来，所以查看起来不是很方便

    `npm install webpack@3.6.0 --save-dev`

- 第二步，通过node_modules/.bin/webpack启动webpack打包

### 什么是loader？

- loader是webpack中一个非常核心的概念
- webpack用来做什么呢？
  - 在我们之前的实例中，我们主要是用webpack来处理我们写的js代码，并且webpack会自动处理js之间相关的依赖。
  - 但是，在开发中我们不仅仅有基本的js代码处理，我们也需要加载css、图片，也包括一些高级的将ES6转成ES5代码，将TypeScript转成ES5代码，将scss、less转成css，将.jsx、 .vue文件转成js文件等等。
  - 对于webpack本身的能力来说，对于这些转化是不支持的。
  - 那么怎么办呢？给webpack扩展对应的loader就可以了。
- loader使用过程：
  - 通过npm安装需要使用的loader
  - 在webpack.config.js中的modules关键字下进行配置
- 大部分loader我们都可以在webpack的官网中找到，并且学习对应的用法。

### css文件处理-准备工作

- 项目开发过程中，我们必然需要添加很多的样式，而样式我们往往写到一个单独的文件中。

  - 在src目录中，创建一个css文件夹放css文件，创建一个js文件夹放js文件

    ![1596532759680](F:\coderwhy_Webpack\webpack_note_img\css文件部署目录.png)

    创建好css文件后，把它导入到main.js中  

    ```javascript
    // 引用css文件
    require('./css/normal.css')
    ```

### css文件处理 css-loader

- 在webpack的官网中，我们可以找到如下关于样式的loader使用方法：

  ![1596532397860](F:\coderwhy_Webpack\webpack_note_img\css-loader.png)

- 由于我的webpack版本为3.6.0，所以我安装的css-loader版本要低，相之对应
  
  - 在项目文件夹下下载css-loader `npm install --save-dev css-loader@2.0.2`

按照官方配置webpack.config.js文件，然后重新打包项目，最后运行index.html 你会发现样式没有生效。原因是css-loader只负责加载css文件，但是并不负责将css具体样式嵌入到文档中

这个时候，我们还需要一个style-loader帮助我们处理

### css文件处理 style-loader

- 我们来安装style-loader  也是要看webpack的版本号与之对应，不然会报错

  `npm install --save-dev style-loader@0.23.1`

- 我们来看看webpack.config.js的配置，style-loader需要放在css-loader的前面

  ```javascript
  //webpack.config.js文件
  
  const path = require("path");
  
  module.exports = {
    entry: "./src/main.js",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          //style-loader 将模块的导出作为样式添加到DOM中  css-loader 解析css文件后，使用import加载，并且返回css代码
          // 使用多个loader时，是从右向左加载的
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
  
  ```

- 疑惑：按照我们的逻辑，在处理css文件过程中，应该是css-loader先加载css文件，再由style-loader来进行进一步的处理，为什么会将style-loader放在前面呢？
- 答案：这是因为webpack在读取使用的loader的过程中，是按照从右向左的顺序读取的。

安装之后可以在项目的package.json文件看它配置依赖

```json
{
  "name": "02-webpack_config",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^2.0.2",
    "style-loader": "^0.23.1",
    "webpack": "^3.6.0"
  }
}

```

当上面的style-loader和css-loader模块安装并配置好了就可以进行打包项目了 在命令行输入npm run build 执行打包

### less文件处理-准备工作

- 如果我们希望在项目中使用less、scss、stylus来写样式，webpack是否可以帮助我们处理呢？

  - 下面以less为例，其他也是一样的

- 首先还是在css文件夹下创建一个名为special的less文件

  ```less
  //special.less
  @fontSize: 50px;
  @fontColor: orange;
  
  body {
      font-size: @fontSize;
      color: @fontColor;
  }
  ```

- 在main.js中引用该less文件

  ```javascript
  // 引用less文件
  require('./css/special.less')
  document.writeln('<h2>你好啊 less</h2>')
  ```

### less文件处理 less-loader

- 还是和上面css-loader一样，在webpack中找到指定版本对应的less-loader的版本，进行下载部署  `npm install less-loader@4.1.0 --save-dev` 

  - 注意：我们这里还需要安装less，因为webpack会使用less对less文件进行编译
    - npm install less@3.9.0 --save-dev

- 然后去修改webpack.config.js配置文件

  ```javascript
  //在module属性下的rules属性下进行添加即可，详细文档在webpack官网
  
  {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader", //creates style nodes from JS strings
            },
            {
              loader: "css-loader", //translates CSS into CommonJS
            },
            {
              loader: "less-loader", //compiles less to CSS
            }
          ]}
  ```

- 完成下载并配置之后即可通过命令 `npm run build`进行项目打包

### 图片文件处理-资源准备阶段

- 首先，我们在项目中加入两张图片：

  - 一张较小的图片cc.jpg（小于8kb），一张较大的图片timg.jpg（大于8kb）

- 然后再css样式里面引用该图片进行测试，拿normal.css文件修改样式：

  ```css
  body {
      /* background-color: pink; */
      /* background: url("../img/cc.jpg");   小于8kb的图片*/  
      background: url("../img/timg.jpg"); /*大于8kb的图片*/
  }
  ```

### 图片文件处理 url-loader

- 图片处理，我们使用url-loader来处理，先进行安装,老样子先看版本 `npm install url-loader@1.1.2 --save-dev`  再修改webpack.config.js配置文件, 由于后面要和file-loader一起配置所以在后面说
- 配置完成后进行打包，运行index.html 就会发现我们的背景图片显示出来了
  - 仔细观察，你会发现背景图示通过base64显示出来的
  - 这是因为配置文件中limit属性的作用，当图片小于8kb时，对图片进行base64编码

### 图片文件处理 file-loader

- 那么问题来了，如果大于8kb呢？我们将css样式中的background属性的图片改为timg.jpg 

- 如果直接打包运行的话，会报错，这时候需要安装file-loader `npm install file-loader@3.0.1 --save-dev`

- 安装完成后直接进行打包，运行，发现图片没显示出来，这是因为没获取到打包之后的图片路径，这个时候的图片它是直接在dist文件夹中，而获取的路径前面没有加./dist/ ，所以图片不显示，所以这个时候需要进行配置

  ```javascript
  //webpack.config.js
  const path = require("path");
  
  module.exports = {
    entry: "./src/main.js",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.js",
        
       //我们这个时候配置的是下面的这段代码
      //publicPath属性可以把所有url请求的资源路径部署到 ./dist 文件夹中 相当于指定了资源总体路径
      publicPath: "./dist/",
  ```

- 配置完成，重新打包，运行，图片就能正常显示出来了。

### 图片文件处理-修改文件名称

- 我们发现webpack在打包图片的时候自动帮助我们生成一个非常长的名字

  - 这是一个32位hash值，目的是防止名字重复
  - 但是，真实开发中，我们可能对打包的图片名字有一定的要求
  - 比如，将所有的图片放在一个文件夹中，跟上图片原来的名称，同时也要防止重复

- 所以我们可以在webpack配置文件中名为url-loader的options属性中添加如下选项

  - img：文件要打包到的文件夹
  - name：获取图片原来的名字，放在该位置上
  - hash:8：为了防止图片名字冲突，依然使用hash，但是我们只保留8位
  - ext：使用图片原来的扩展名

  ```javascript
  {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                // 当加载的图片，小于limit指定的时，会将图片编译成base64字符串形式
                // 当加载的图片，大于limit指定时，需要使用file-loader模块进行加载
                limit: 8192,
                //下面的name属性作用是把文件大小大于limit指定大小的文件放置在指定的文件夹中，并且以图片本身的名字命名加上哈希算法的随机八位数，后缀为.ext
                name: "img/[name].[hash:8].[ext]",
              },
            },
          ],
        },
  ```

  

- 但是，我们发现图片并没有显示出来，这是因为图片使用的路径不正确

  - 默认情况下，webpack会将生成的路径直接返回给使用者
  - 但是，我们整个程序式打包在dist文件夹下的，所以这里我们需要在路径下再添加一个 ./dist/

```javascript
//publicPath属性可以把所有url请求的资源路径部署到 ./dist 文件夹中 相当于指定了资源总体路径
    publicPath: "./dist/",
```

- 定义路径和规则，配置之后，再进行打包运行，图片就能正常显示了，并且在打包的文件夹中创建了img的文件夹，下面存放着开头为自己传入图片的图片名+hash随机8位命名，后缀为图片原始的后缀名： timg.80a2560b.jpg ，这样的图片。 

### ES6语法处理

- 如果你仔细阅读webpack打包的js文件，发现写的ES6语法并没有转成ES5，那么就意味着可能一些对ES6还不支持的浏览器没有办法很好的运行我们的代码。

- 如果希望将ES6的语法转成ES5，那么就需要使用babel。

  - 在对应的webpack版本中，使用对应的babel的loader就可以了

    `npm install --save-dev babel-loader@7.1.5 babel-core@6.26.3 babel-preset-es2015`

- 在上面安装了三个模块，一个是babel-loader 一个是babel-core(支持转化的核心) 还有一个是babel-preset-es2015 用来识别ES6语法，安装好之后接下来去配置webpack文件

  ```javascript
  //webpack.config.js
  {
          test: /\.m?js$/,
          //exclude: 排除  include：包含
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']  //因为要识别es6语法 就在里面填加es2015
            }
          }
        }
  ```

- 配置好，进行npm run build 打包，打开打包之后的js文件，搜索关于es2015(es6)的语法，没有找到，就说明ES6语法处理成功。

### 引入vue.js

- 后续项目中，我们会使用Vuejs进行开发，而且会以特殊的文件来组织vue的组件
  
  - 所以下面学习如何在我们的webpack环境中集成Vuejs
- 现在，我们希望在项目中使用Vuejs，那么必然需要对其有依赖，所以需要先进行安装
  
- 因为我们后续是在实际项目中也会使用vue的，所以并不是开发时依赖，所以安装后面没加-dev  :  `npm install --save vue@2.5.21`
  
- 安装完成之后，接下来导入vue模块来使用它

  ```javascript
  // main.js
  // 使用vue进行开发
  import Vue from 'vue'
  
  const app = new Vue({
      el: '#app',
      data: {
          message: 'Hello Webpack'
      }
  })
  ```

  ```html
  <!-- 在index.html文件中导入vue实例中的数据，测试是否成功 -->
  <div id="app">
          <h2>{{message}}</h2>
      </div>
  ```

- 把上面的工作都完成了，进行npm run build打包项目，运行，发现没有出现想要的效果，并且浏览器中有报错。

- 错误说的是我们使用的是runtime-only版本的Vue，而这个版本的Vue无法使用模板字符串，而在runtime-compiler的版本代码中，可以有template，因为有compiler可以用于编译template。

- 所以接下来我们得去webpack配置文件进行更深一步的配置了

  ```javascript
  // webpack.config.js  
  //在module属性同级下面添加兄弟属性 resolve
  resolve: {
      // alias: 别名
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  ```

- 安装，使用Vue，并且配置成功，再进行npm run build 打包项目运行就显示出想要的效果了。

### el 和 template区别(一)

- 正常运行之后，我们来考虑另外一个问题：

  - 如果我们希望将data中的属性显示在界面中，就必须是修改index.html文件
  - 如果我们后面自定义了组件，也必须修改index.html来使用组件
  - 但是html模板在之后的开发中，我并不希望手动的来频繁修改，是否可以做到呢？

- 这时需要定义template属性：

  - 在main.js文件中，我们定义了Vue实例，我们定义了el属性，用于和index.html中的#app进行绑定，让Vue实例之后可以管理它其中的内容。

  - 现在，我们可以将index.html中绑定Vue实例的的div元素中的{{message}}内容删掉，只保留一个基本的id为app的div元素。

  - 但是如果我依然希望在其中显示{{message}}的内容，应该怎么处理呢？

  - 我们可以在main.js的Vue实例中，定义一个template属性，代码如下

    ```javascript
    // main.js
    //如果只有一个Vue实例的小demo 可以不用加 const app
    new Vue({
        el: '#app',
        template: `
        <div>
            <h2>{{message}}</h2>
            <button @click="btnClick">按钮</button>
            <h2>{{name}}</h2>
        </div>`,
        data: {
            message: 'Hello Webpack',
            name: '古力娜扎'
        },
    ```

### vuejs最基础的封装

- 由于在main.js中的vue实例里面直接写模板和方法显得整个main.js太乱了，所以我们得把vue实例中的详细数据和模板简单的封装一下。

- 先把vue实例中的模板和数据抽离到APP变量里

  ```javascript
  //main.js
  //抽取
  const App = {
      template: `
      <div>
          <h2>{{message}}</h2>
          <button @click="btnClick">按钮</button>
          <h2>{{name}}</h2>
      </div>`,
      data() {
          return {
              message: 'Hello Webpack',
              name: '古力娜扎'
          }
      },
      methods: {
          btnCilck() {
  
          }
      }
  }
  
  new Vue({
      el: '#app',
      template: '<App/>',
      components: {
          App
      }
  })
  ```

- 抽离之后还是不够简洁，于是我们在src文件夹下创建了一个vue的文件，新建一个app.js文件用来存放vue实例中的模板和数据

  ```javascript
  //app.js
  export default {
      template: `
      <div>
          <h2>{{message}}</h2>
          <button @click="btnClick">按钮</button>
          <h2>{{name}}</h2>
      </div>
      `,
      data() {
          return {
              message: 'Hello Webpack',
              name: 'xhx'
          }
      },
      methods: {
          btnCilck() {
  
          }
      }
  }
  ```

- 抽取封装好之后，我们得调用，于是在main.js中引入app.js

  ```javascript
  import App from './vue/app'
  //在下面的vue实例中调用模板
  new Vue({
      el: '#app',
      template: '<App/>',  //模板的标签名为<App>
      components: {
          App
      }
  })
  ```

- 这样就完成了简单的vuejs的封装，npm run build 运行一下，发现可以正常显示模板和数据

### .vue文件封装处理

- 但是一个组件以一个js对象的形式进行组织和使用的时候是非常不方便的

  - 一方面编写template模块非常的麻烦
  - 另外一方面如果有样式的话，我们写在哪里比较合适呢？

- 现在，我们以一种全新的方式来组织一个vue的组件，就是.vue后缀的文件

- 但是这个文件可以正确的被加载吗？

  -  显然不可能，这种特殊的文件格式必须有人帮助我们处理
  - 于是我们请出了vue-loader以及处理模板的vue-template-compiler

- 安装vue-loader和vue-template-compiler

  `npm install --save-dev vue-loader@13.0.0 vue-template-compiler@2.5.21`

- 安装好之后修改webpack配置文件

  ```javascript
  //webpack.config.js
  //在所有配置的module属性的rules属性下添加这个vue-loader
  	{
          test: /\.vue$/,
          use: ['vue-loader']
        }
  ```

- 配置完成之后就可以在src文件夹下的vue文件夹下创建后缀名为.vue的文件了，我们把上面简单封装到app.js文件的vuejs模板和数据全部迁移到vue文件夹下的App.vue文件中

  ```vue
  <!--App.vue -->
  <!-- 模板-->
  <template>
    <div>
      <h2 class="title">{{ message }}</h2>
      <button @click="btnClick">按钮</button>
      <h2>{{ name }}</h2>
      <Cpn />
    </div>
  </template>
  
  <script>
  //导入Cpn组件
  import Cpn from "./Cpn.vue";
  
  //vue实例的数据和方法和组件挂载等信息
  export default {
    name: "App",
    components: {
      Cpn,
    },
    data() {
      return {
        message: "Hello Webpack",
        name: "xhx",
      };
    },
    methods: {
      btnCilck() {},
    },
  };
  </script>
  
  <!--vue实例中需要用的css样式文件 -->
  <style>
  .title {
    color: green;
  }
  </style>
  
  ```
  - 在上面的App.vue文件中 我们导入了Cpn.vue文件

  ```vue
  <template>
    <div>
      <h2>我是cpn组件的标题</h2>
      <p>我是cpn组件的内容</p>
      <h2>{{ name }}</h2>
    </div>
  </template>
  
  <script>
  export default {
    name: "Cpn",
    data() {
      return {
        name: "CPN组件的name",
      };
    },
  };
  </script>
  
  <style></style>
  
  ```

- 把.vue文件的模板，组件，方法，样式等都配置好之后，接下来需要在main.js文件中引用他们

  ```javascript
  //main.js
  //把之前简单封装的app.js文件给注释掉  下面只引入了APP.vue  Cpn.vue由App.vue来引入
  import App from './vue/App.vue'
  
  //还是不变
  new Vue({
      el: '#app',
      template: '<App/>',
      components: {
          App
      }
  })
  ```

- 模板的安装，webpack配置文件的配置，和.vue文件的编写，以及main.js文件的引用之后，就可以对该项目进行打包处理看效果了， 执行npm run build 在浏览器中打开index.html文件，想要的效果可以正常显示。

### 认识plugin

- plugin是什么？
  - plugin是插件的意思，通常是用于对某个现有的架构进行扩展
  - webpack中的插件，就是对webpack现有功能的各种扩展，比如打包优化，文件压缩等等。
- loader和plugin区别
  - loader主要用于转换某些类型的模块，它是一个转换器
  - plugin是插件，它是对webpack本身的扩展，是一个扩展器
- plugin的使用过程：
  - 步骤一：通过npm安装需要使用的plugins(某些webpack已经内置的插件不需要安装了)
  - 步骤二：在webpack.config.js中的plugins中配置插件

### 添加版权的Plugin

- 我们先来使用一个最简单的插件，为打包的文件添加版权声明

  - 该插件的名字叫BannerPlugin，属于webpack自带的插件。

- 按照下面的方式来修改webpack.config.js的文件

  ```javascript
  const webpack = require('webpack')
  //在module.exports对象下面添加plugins属性
  plugins: [
      new webpack.BannerPlugin('最终版权归xhx所有')
    ]
  ```

  

- 重新打包程序`npm run build`：查看bundle.js文件的头部，可以看到有自定义的版权注释标识

### 打包html的plugin

- 目前，我们的index.html文件是存放在根目录下的。

  - 我们知道，在真实发布项目时，发布的是dist文件夹中的内容，但是dist文件夹中如果没有index.html文件，那么打包的js等等文件也就没有意义了。
  - 所以，我们需要将index.html文件打包到dist文件夹中，这个时候就可以使用HtmlWebpackPlugin插件

- HtmlWebpackPlugin插件可以为我们做这些事情：

  - 自动生成一个index.html文件(可以指定模板来生成)
  - 将打包的js文件，自动通过script标签插入到body中

- 安装HtmlWebpackPlugin插件

  - `npm install --save-dev html-webpack-plugin@3.2.0`

- 使用插件，修改webpack.config.js文件中的配置

  - 导入插件，注释掉路径，使用插件

  ```javascript
  //webpack.config.js
  //导入HtmlWebpackPlugin插件
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  
  //把output属性下的filename属性下的 publicPath 路径配置注释掉
  // publicPath: "./dist/",  //由于index.html打包之后就在dist文件夹下，所以不需要这个路径指定了
  
   plugins: [
      new webpack.BannerPlugin("最终版权归xhx所有"),
      new HtmlWebpackPlugin({
          //这里的template表示根据什么模板来生成index.html
        template: "index.html",
      }),
    ],
  ```

- 安装，配置完成之后，在命令行中npm run build 就可以看见dist文件夹下有index.html文件了，里面的模板和js文件也可以正常的导入，在浏览器中打开也可以正常的显示效果。

### js压缩的Plugin

- 在项目发布之前，我们必然需要对js等文件进行压缩处理。

  - 这里，我们就对打包的js文件进行压缩

  - 我们使用一个第三方的插件uglifyjs-webpack-plugin

    `npm install --save-dev uglifyjs-webpack-plugin@1.1.1`

- 修改webpack配置文件，使用该插件

  ```javascript
  // webpack.config.js
  const uglifyJSPlugin = require("uglifyjs-webpack-plugin");
  
  module.exports = {
      ...
   plugins: [
      new webpack.BannerPlugin("最终版权归xhx所有"),
      new HtmlWebpackPlugin({
        template: "index.html",
      }),
      new uglifyJSPlugin(),
    ],
  }
  ```

- 重新打包npm run build 查看打包后的bundle.js文件，是已经被压缩过了的。

- 另外提一点，压缩js代码这些配置在我们开发阶段是不需要的，等到真正发布项目时，才压缩。

### 搭建本地服务器

- webpack提供了一个可选的本地开发服务器，这个本地服务器基于node.js搭建，内部使用express框架，可以实现我们想要的让浏览器自动刷新显示我们修改后的结果

- 不过它是一个单独的模块，在webpack中使用之前要先安装它

  `npm install --save-dev webpack-dev-server@2.9.3`

- devserver也是作为webpack中的一个选项，选项本身可以设置如下属性：

  - contentBase：为哪一个文件夹提供本地服务，默认是根文件夹，我们这里要填./dist
  - port：端口号
  - inline：页面实时刷新
  - historyApiFallback：在SPA页面中，依赖HTML5的history模式

- webpack.config.js文件配置修改如下

  ```javascript
  module.exports = {
      ...
      module: {
          ...
  		devServer: {
      	//在开发的时候用的上，等发布的时候就用不上了
      		contentBase: "./dist", //部署服务器要监控的文件夹
      		inline: true, //是否实时监控
    					},
     			 }
  }
  ```

- 除了配置本地服务器的参数，还得通过命令行快速启动，由于我们的服务器是按照在该项目下的，不在全局，所以我们在package.json文件中加入下面的快速启动

  ```json
  //快速启动webpack 通过build命令
  "build": "webpack",
  //快速启动服务器，通过dev命令  --open意思是启动服务器时自动打开inde.html文件
  "dev": "webpack-dev-server --open"
  ```

- 由于之前文件都打包好了，现在是为了部署在服务器上启动，于是在命令行中 npm run dev，就会看见自动弹出浏览器，并且路径是通过 http://localhost:8080/  访问的。
- 提一点：搭建本地服务器只在开发阶段用得上，等到真正发布时，是不需要这个本地服务器的。

### 对webpack.config.js文件进行分离

- 由于上面的js压缩插件是用于最后发布的项目上的，在开发阶段用不上；本地服务器在开发阶段需要，在最后发布阶段不需要。为了解决这两个相互冲突的问题，不再开发和发布时候频繁的来回注释。我们需要把webpack.config.js文件进行分离。

  - 我们在项目文件中新建文件夹build，专门存放配置文件，里面新建三个文件，一个是公共的base.config.js配置文件，一个是项目发布时的prod.config.js配置文件，一个是开发阶段的dev.config.js配置文件

- 在分离之前，我们需要安装一个专门把配置文件进行分离合并的插件

  `npm install --save-dev webpack-merge@4.1.5`

- 安装之后我们直接拿来使用

  ```javascript
  //dev.config.js
  const webpackMerge = require("webpack-merge");
  const baseConfig = require("./base.config");
  
  module.exports = webpackMerge(baseConfig, {
      //抽离了服务器模块
    devServer: {
      //在开发的时候用的上，等发布的时候就用不上了
      contentBase: "./dist", //部署服务器要监控的文件夹
      inline: true, //是否实时监控
    },
  });
  
  ```

  ```javascript
  //prod.config.js
  const uglifyJSPlugin = require("uglifyjs-webpack-plugin");
  const webpackMerge = require("webpack-merge");
  const baseConfig = require("./base.config");
  
  module.exports = webpackMerge(baseConfig, {
      //抽离了js压缩模块
    plugins: [
      new uglifyJSPlugin(), //开发阶段不需要压缩js代码，等真正发布的时候才用的上
    ],
  });
  
  ```

- 当然了，base.config.js文件也是需要修改的，除了删除掉已经被抽离的部分，我们还需要修改文件打包之后的路径，因为我们之前配置文件用的是webpack.config.js，它是在build同级的目录下的，我们现在的配置文件存放在build文件中，如果不锈钢path.join的路径会导致打包之后的文件都存放在build文件夹下。详细看下面代码

```javascript
//base.config.js
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.join(__dirname, "../dist"),
```

- 把三个配置文件全部修改完毕了，这样还是不够的，package.json文件默认还是寻找的之前的webpack.config.js文件，我们得修改他们的寻找路径和寻找文件名

  ```json
  "build": "webpack --config ./build/prod.config.js",
  "dev": "webpack-dev-server --open --config ./build/dev.config.js"
  ```

- 配置都完成之后，我们就可以删除掉根目录的webpack.config.js配置文件，因为我们不需要了。 再进行npm run build  和 npm run dev  都可以正常运行。

