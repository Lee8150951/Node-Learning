// 0、安装
// 1、引包
var express = require('express')
// 2、创建服务器应用程序
// http.createServer
var app = express()

// 静态资源服务（公开指定）
// 只要这样做了就可以直接通过/public/**的方式访问public中的所有资源
app.use('/public/', express.static('./public/'))
app.use('/static/', express.static('./static/'))

app.get('/', function (req, res) {
  res.send('hello express!')
})

app.get('/about', function (req, res) {
  res.send('This is About...')
})

// 相当于server.listen
app.listen(8080, function () {
  console.log('app is running...');
})