// require方法有两个功能：
// 1、加载并执行模块内容(但是拿不到里面的变量和方法)
// 2、拿到被加载文件模块导出的接口对象
var ret = require('./module-b')
// 可以将require()理解成一个对象，这个对象等价于导入模块的exports对象
console.log(ret);
console.log(ret.foo);

var add = ret.add(1, 2);
console.log(add);

var sub = ret.sub(1, 2);
console.log(sub);