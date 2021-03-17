// Promise是一个构造函数（和node没关系，浏览器也能用）
const fs = require('fs')
// 创建Promise容器
// 1、创建Promise(容器内部写入一个函数，这个函数属于一个异步任务)
// 容器一旦创建就开始执行
const demo = new Promise(function (resolve, reject) {
  fs.readFile('./data/01.txt', 'utf8', function (err, data) {
    if (err) {
      // 承诺容器中的任务失败
      // 将容器的pending状态转为reject
      reject(err)
    } else {
      // 承诺容器中的任务成功
      // 将容器的pending状态转为resolve
      resolve(data)
    }
  })
})

// demo就是承诺容器
// 当demo成功了，然后(then)做指定的操作(在函数中)
// then方法接收的就是容器中的resolve函数
demo.then(function (data) {
  console.log(data);
}, function (err) {
  console.log('ERROR:' + err);
})