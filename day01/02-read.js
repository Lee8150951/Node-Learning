// node.js环境下可以对文件进行读写
// 如果想要进行文件读写必须使用require引入fs这个核心模块
var fs = require('fs')
// 读取文件
// 第一个参数是文件路径，第二个参数是回调函数
// error 如果读取失败，error是错误对象；成功是null
// data 如果读取失败，data是null；成功是其中数据
fs.readFile('./day01/hello.txt', function(error, data) {
    console.log(data.toString());
    console.log(error);
})