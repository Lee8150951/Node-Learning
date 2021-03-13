const http = require('http')
const server = http.createServer()
server.on('request', function (req, res) {
  var url = req.url
  if (url === '/') {
    res.end('Hello World')
  } else {
      res.end('404 Not Found')
  }
})
server.listen(8080, function () {
  console.log('running...')
})