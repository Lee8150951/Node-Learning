const template = require('art-template')
const fs = require('fs')

fs.readFile('D:/学习/后端开发/Node.js/day02/demo.html', function (err, data) {
  if (err) {
    return console.log('文件读取失败');
  }
  var ret = template.render(data.toString(), {
    name: 'Jack',
    age: 23,
    hobbies: [
      'basketball', 'singing', 'game'
    ]
  })
  console.log(ret);
})