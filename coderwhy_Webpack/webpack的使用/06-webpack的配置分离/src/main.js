// 1. 使用commonjs的模块化规范
const {
    add,
    mul
} = require('./js/mathUtils')

console.log(add(20, 30));
console.log(mul(20, 30));

// 2. 使用ES6模块化的规范
import {
    name,
    age,
    height
} from "./js/info";

console.log(name);
console.log(age);
console.log(height);

// 引用css文件
require('./css/normal.css')

// 引用less文件
require('./css/special.less')
document.writeln('<h2>你好啊 less</h2>')

// 使用vue进行开发
import Vue from 'vue'
// import App from './vue/app'
import App from './vue/App.vue'

//抽取
// const App = {
//     template: `
//     <div>
//         <h2>{{message}}</h2>
//         <button @click="btnClick">按钮</button>
//         <h2>{{name}}</h2>
//     </div>`,
//     data() {
//         return {
//             message: 'Hello Webpack',
//             name: '古力娜扎'
//         }
//     },
//     methods: {
//         btnCilck() {

//         }
//     }
// }

//把抽取的代码封装到vue文件夹下的app.js中了


new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
})

document.writeln('<span>配置分离成功！</span>')