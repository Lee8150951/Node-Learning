var express = require('express')
var app = express()

// 静态资源映射
app.use('/public/', express.static('./public/'))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8080, function () {
  console.log('App is running...');
})