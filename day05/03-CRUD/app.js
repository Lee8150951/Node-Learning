const express = require('express')
const router = require('./router')
const app = express()
const bodyParser = require('body-parser')

// 配置模板引擎body-parser一定要在app.use(router)挂在路由之前
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 引入模板
app.engine('html', require('express-art-template'))
// 引入静态文件
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

// 将路由挂载至app服务中
app.use(router)

app.listen(8080, function () {
  console.log('Server is running');
})