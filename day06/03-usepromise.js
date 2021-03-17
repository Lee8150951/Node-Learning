const fs = require('fs')

const p1 = new Promise(function (resolve, reject) {
  fs.readFile('./data/01.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

const p2 = new Promise(function (resolve, reject) {
  fs.readFile('./data/02.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

const p3 = new Promise(function (resolve, reject) {
  fs.readFile('./data/03.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

p1
  .then(function (data) {
    console.log(data)
    // 当前函数中return的结果就可以在后面的then中接收到
    // 当return的是一个promise对象：
    // 后续的then中的方法，第一个参数会用做p2的resolve，第二个参数会用做reject
    return p2
  }, function (err) {
    console.log("ERR P1")
  })
  .then(function (data) {
    console.log(data)
    return p3
  }, function (err) {
    console.log("ERR P2")
  })
  .then(function (data) {
    console.log(data)
  }, function (err) {
    console.log("ERR P3")
  })