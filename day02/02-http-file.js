const http = require('http')
const fs = require('fs')
const server = http.createServer()
// 静态统一路径
const wwwDir = 'D:/学习/后端开发/Node.js/day02/assets'

server.on('request', function (req, res) {
  var url = req.url
  var filePath = '/index.html'
  if (url !== '/') {
    filePath = url
  }
  fs.readFile(wwwDir + filePath, function (err, data) {
    if (err) {
      return res.end('404 Not Found')
    }
    res.end(data)
  })
})

server.listen(8080, function () {
  console.log('running...')
})