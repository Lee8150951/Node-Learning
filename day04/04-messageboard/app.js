const express = require('express')
const app = express()
const url = require('url')
const date = new Date();
const bodyParser = require('body-parser')

const chats = []

// 配置bodyParser解析POST
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 配置使用art-template
// 以.art为结尾的文件时，使用art-template引擎渲染
// express存在一个约定：开发人员将所有的试图文件都放在views目录中
app.engine('html', require('express-art-template'))


app.use('/public/', express.static('./public/'))

app.get('/', function (req, res) {
  res.render('index.html', {
    chats: chats
  })
})

app.get('/form', function (req, res) {
  res.render('form.html')
})

app.get('/submit', function (req, res) {
  const chatObj = req.query
  chatObj.chat_time = date.toLocaleString()
  chats.unshift(chatObj)
  res.redirect('/')
})

// 当以POST请求/submit的时候执行指定处理函数
app.post('/submit', function (req, res) {
  const chatObj = req.body
  chatObj.chat_time = date.toLocaleString()
  chats.unshift(chatObj)
  res.redirect('/')
})

app.get('/admin', function (req, res) {
  res.render('admin/index.html', {
    name: 'Jacob'
  })
})

app.listen(8080, function () {
  console.log('Server is running...');
})