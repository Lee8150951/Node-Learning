const express = require('express')
const app = express()
const fs = require('fs')

// 引入模板
app.engine('html', require('express-art-template'))
// 引入静态文件
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.get('/', function (req, res) {
  // readFile第二个参数是可选的，属于编码方式
  fs.readFile('./db.json', 'utf8', function (err, data) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('index.html', {
      students: JSON.parse(data).students
    })
  })
})

app.listen(8080, function () {
  console.log('Server is running');
})