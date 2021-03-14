var express = require('express')
var app = express()

app.use('/public/', express.static('./public/'))
app.use('/static/', express.static('./static/'))

// app.get('/', function (req, res) {
//   res.send('hello express!')
// })

// app.get('/about', function (req, res) {
//   res.send('This is About...')
// })
// 直接映射关系在router.js中

app.listen(8080, function () {
  console.log('app is running...');
})