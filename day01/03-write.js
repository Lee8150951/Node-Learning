var fs = require('fs')
// 写文件
// 第一个参数是要写入文件的参数，第二个参数是要写入的内容，第三个参数是回调函数
// 回调函数只接收一个参数就是error
fs.writeFile('./day01/hello.txt', 'Hello Node.js', function(error) {
    console.log(error);
})