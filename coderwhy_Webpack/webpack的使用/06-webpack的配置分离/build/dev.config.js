const webpackMerge = require("webpack-merge");
const baseConfig = require("./base.config");

module.exports = webpackMerge(baseConfig, {
  devServer: {
    //在开发的时候用的上，等发布的时候就用不上了
    contentBase: "./dist", //部署服务器要监控的文件夹
    inline: true, //是否实时监控
  },
});
