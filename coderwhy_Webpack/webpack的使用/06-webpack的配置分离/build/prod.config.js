const uglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./base.config");

module.exports = webpackMerge(baseConfig, {
  plugins: [
    new uglifyJSPlugin(), //开发阶段不需要压缩js代码，等真正发布的时候才用的上
  ],
});
