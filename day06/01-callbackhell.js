const fs = require('fs')
// 异步代码，这三个文件顺序不一定一样
// 如果要求执行顺序就会产生回调地狱，如下
fs.readFile('./data/01.txt', function (err, data) {
  if (err) {
    // 抛出异常
    // 相当于return console.log('读取失败')
    throw err
  }
  console.log(data.toString())
  fs.readFile('./data/02.txt', function (err, data) {
    if (err) {
      throw err
    }
    console.log(data.toString())
    fs.readFile('./data/03.txt', function (err, data) {
      if (err) {
        throw err
      }
      console.log(data.toString())
    })
  })
})