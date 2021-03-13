const http = require('http')
const fs = require('fs')
const url = require('url')
const template = require('art-template')

const server = http.createServer()
const pathHeder = './view/'
const date = new Date();
const chats = []

server.on('request', function (req, res) {
  let pathObj = url.parse(req.url, true)
  let pathname = pathObj.pathname
  if (pathname === '/') {
    fs.readFile(pathHeder + 'index.html', function (err, data) {
      if (err) {
        res.end('404 Not Found')
      }
      let htmlStr = template.render(data.toString(), {
        chats: chats
      })
      res.end(htmlStr)
    })
  } else if (pathname === '/form') {
    fs.readFile(pathHeder + 'form.html', function (err, data) {
      if (err) {
        res.end('404 Not Found')
      }
      res.end(data)
    })
  } else if (pathname === '/submit') {
    const chatObj = {}
    chatObj.name = pathObj.query.name
    chatObj.info = pathObj.query.info
    chatObj.chat_time = date.toLocaleString()
    chats.push(chatObj)
    res.statusCode = 302
    res.setHeader('Location', '/')
    res.end()
  } else if (pathname.indexOf('/public/') === 0) {
    fs.readFile('.' + req.url, function (err, data) {
      if (err) {
        res.end('404 Not Found')
      }
      res.end(data)
    })
  }
})

server.listen(8080, function () {
  console.log('Server is running...');
})