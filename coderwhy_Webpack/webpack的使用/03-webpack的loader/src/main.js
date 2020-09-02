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