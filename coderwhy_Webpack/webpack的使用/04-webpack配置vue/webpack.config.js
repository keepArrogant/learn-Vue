const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    //publicPath属性可以把所有url请求的资源路径部署到 ./dist 文件夹中 相当于指定了资源总体路径
    publicPath: "./dist/",
  },
  module: {
    rules: [{
        test: /\.css$/i,
        //style-loader 将模块的导出作为样式添加到DOM中  css-loader 解析css文件后，使用import加载，并且返回css代码
        // 使用多个loader时，是从右向左加载的
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader", //creates style nodes from JS strings
          },
          {
            loader: "css-loader", //translates CSS into CommonJS
          },
          {
            loader: "less-loader", //compiles less to CSS
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: "url-loader",
          options: {
            // 当加载的图片，小于limit指定的时，会将图片编译成base64字符串形式
            // 当加载的图片，大于limit指定时，需要使用file-loader模块进行加载
            limit: 8192,
            //下面的name属性作用是把文件大小大于limit指定大小的文件放置在指定的文件夹中，并且以图片本身的名字命名加上哈希算法的随机八位数，后缀为.ext
            name: "img/[name].[hash:8].[ext]",
          },
        }, ],
      },
      {
        test: /\.m?js$/,
        //exclude: 排除  include：包含
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ],
  },
  resolve: {
    //指定extensions属性 数组中的扩展名的后缀可以不用写
    extensions: ['.js', '.css', '.vue'],
    // alias: 别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};