# Node.js学习笔记

## Day01

### Node.js是什么

Node.js 是一个开源与跨平台的 JavaScript 运行时环境，构建于Chrome的V8引擎之上

它不是一门语言，不是库也不是一种框架；在这种环境下，js可以脱离浏览器进行

**简单来说：node.js可以解析和执行JavaScript**

和浏览器中的Js相比较，node.js中的Js不再具有DOM和BOM功能，只包含有原来的EcmaScript部分

在Node环境中为Js提供了一些有关服务器的API：文件读写，网络服务构建，网络通信，http服务器等等

**特点：事件驱动、异步驱动（非阻塞IO模型）、轻量高效**

### Node.js能做什么

Web服务器后端，命令行工具

### Hello World

````javascript
var foo = 'bar'
console.log(foo);
````

### 读文件

````javascript
// 如果想要进行文件读写必须使用require引入fs这个核心模块
var fs = require('fs')
// 第一个参数是文件路径，第二个参数是回调函数
// error 如果读取失败，error是错误对象；成功是null
// data 如果读取失败，data是null；成功是其中数据
fs.readFile('./day01/hello.txt', function(error, data) {
    console.log(data.toString());
    console.log(error);
})
````

### 写文件

````javascript
var fs = require('fs')
// 写文件
// 第一个参数是要写入文件的参数，第二个参数是要写入的内容，第三个参数是回调函数
// 回调函数只接收一个参数就是error
fs.writeFile('./day01/hello.txt', 'Hello Node.js', function(error) {
    console.log(error);
})
````

### 使用Node创建服务器

在node.js中有一个核心模块:http，这个模块的作用就是构建服务器

````javascript
// 加载http模块
const http = require('http')
// 使用http.createServer()创建Web服务器
const server = http.createServer()
// 使用服务器进行一系列操作
// 注册request请求事件
// 当客户端把请求发送过来，就会自动触发服务器的request请求事件，然后执行第二个参数：回调处理
server.on('request', function(request, response) {
    console.log('请求路径是：' + request.url);
    // 发送响应方法：response.write
    // write可以使用多次，但是最后一次一定要使用end结束，否则客户端会一直等待响应
    response.write(request.url)
    response.end()
})
// 绑定端口，启动服务器
server.listen(3000, function() {
    console.log('服务器启动成功，通过localhost:3000进行访问');
})
````

### 核心模块

在Node.js中，为Javascript提供了很多服务器级别的API，这些API大多数都被包装到了一个具名的核心模块中

如fs是操作文件的核心模块，http是构建服务器的核心模块，path是路径操作模块，os是系统信息模块等等

### 模块化原理

模块A

````javascript
console.log("模块A开始执行");
// 使用require('')进行模块化引入
require('./module-b');
console.log("模块A执行结束");
																							--module-a.js
````

模块B

````javascript
console.log("模块B执行");
																							--module-b.js
````

**在Node.js中没有全局作用域，只有模块作用域**

### 模块的输入与输出

require方法有两个功能：

1、加载并执行模块内容(但是拿不到里面的变量和方法)

2、拿到被加载文件模块导出的接口对象

````javascript
// require方法有两个功能：
// 1、加载并执行模块内容(但是拿不到里面的变量和方法)
// 2、拿到被加载文件模块导出的接口对象
var ret = require('./module-b')
// 可以将require()理解成一个对象，这个对象等价于导入模块的exports对象
console.log(ret);
console.log(ret.foo);

var add = ret.add(1, 2);
console.log(add);

var sub = ret.sub(1, 2);
console.log(sub);
````

````javascript
var foo = 'bbb'
// 使用exports打印需要导出的对象
console.log(exports);
// 可以把exports理解成一个可以导出的空对象，向里面动态的添加成员
exports.foo = 'hello'
console.log(exports);

exports.add = function(a, b) {
    return a + b;
}
exports.sub = function(a, b) {
    return a - b;
}
````

### IP地址和端口号

ip地址用于定位计算机，端口号用于定位具体的应用程序，且一切需要联网通信的软件都会占用一个端口号

### 乱码问题解决

````javascript
const http = require("http");
const server = http.createServer();
server.on("request", function(req, res) {
    console.log("请求：" + req.url);
    console.log("客户端地址：" + req.socket.remoteAddress, req.socket.remotePort);
    let url = req.url;
    if(url === '/') {
        // 如果单纯的像下面一样输出数据会出现乱码问题(utf-8)
        // 浏览器不知道这是utf-8编码方式，而会采用当前操作系统进行解析(gbk)
        // res.end("你好，世界");
        // 正确的操作方式就是告诉浏览器应该使用什么编码
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end("你好，世界");
    } else if(url === '/html') {
        // text/plain表示普通文本，如果发送的是html格式的字符串则直接解析成字符串，不会转义
        // 应该改为text/html
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end("<p style='color: red'>你好，Node.js</p>");
    }
})
server.listen(3000, function() {
    console.log("服务器已启动");
})
````

### 发送资源

````javascript
const http = require("http");
// 引入读取文件核心模块
const fs = require("fs");
const server = http.createServer();
server.on("request", function(req, res) {
    let url = req.url;
    if(url === '/') {
        fs.readFile('./test.html', function(error, data) {
            if(error) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.end("页面加载失败");
            } else {
                // data默认是二进制数据，通过.toString方法转化为可识别字符串
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.end(data)
            }
        })
    }
})
server.listen(3000, function() {
    console.log("服务器已启动");
})
````

## Day02

### 代码风格

JavaScript有两种比较成熟的代码风格：①JavaScript Standard Style；②Airbnb JavaScript Style

注意：无分号风格的代码中，要注意一行代码以` (  [ 开头的时候应该在开头处加上一个分号，如下

````javascript
;`hello`.toString()
;(function() {
    console.log('hello world')
})
````

### 模拟构建Apache

````javascript
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
````

### 模板引擎使用

在node.js中支持template的使用，本项目中使用了art-template模板

**在html使用模板语法引擎**

````html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h3>模板引擎不关心内容，只关心自己认识的模板标记语法</h3>
  <!-- 引入template文件 -->
  <script src="../node_modules/art-template/lib/template-web.js"></script>
  <script type="text/template" id="tpl">
    Hello, {{name}}
    Hobbies: {{each hobbies}} {{$value}} {{/each}}
  </script>
  <script>
    var ret = template('tpl', {
      name: 'Jack',
      age: 23,
      hobbies: [
        'basketball', 'singing', 'game'
      ]
    })
    console.log(ret);
  </script>
</body>
</html>
````

**在node.js使用模板引擎**

在使用前使用npm进行安装

````shell
npm install art-template
````

在js中使用：

````javascript
const template = require('art-template')

var tplStr = `
  Hello, {{name}}
  Hobbies: {{each hobbies}} {{$value}} {{/each}}
`
var ret = template.render(tplStr, {
  name: 'Jack',
  age: 23,
  hobbies: [
    'basketball', 'singing', 'game'
  ]
})
console.log(ret);
````

### 客户端渲染与服务端渲染

客户端渲染：不利于被SEO搜索引擎优化（AJAX属于客户端渲染）

服务端渲染：可以被爬虫抓取到，数据直接在服务端被渲染完成后回传

**真正的网站不是纯异步也不是纯服务端渲染出来的，都是两者结合产生的**（符合不同界面的需求）

### 重定向

如何通过服务器让客户端进行重定向？

1、状态码设置为302（临时重定向）--> statusCode

2、在响应头中通过Location告诉客户端向哪里进行重定向 --> setHeader

````javascript
res.statusCode = 302
res.setHeader('Location', '/')
res.end()
````

## Day03

### Node模块系统

使用node编写应用程序主要是在使用：EcmaScript语言、核心模块、第三方模块、自己写的模块。

模块间的通信规则：加载(require)，导出(exports)

**注意：核心模块的require('模块标识符')，中间写的并不是路径，而是模块标识符**

````javascript
var foo = 'bar'
function add (a, b) {
  return a + b
}
exports.add = add
// exports是一个对象，可以多次为这个对象添加成员实现
exports.str = 'hello world'
exports.foo = foo

// 如果某个模块需要直接导出某个成员，而不是挂载的方式应使用以下方式
// module.exports = add
````

````javascript
var fooExports = require('./foo')
console.log(fooExports);
````

**注意：exports可以导出多个（exports挂载的方式），也可以只导出一个（module.exports的方式）**

### module.exports与exports

在node中每个模块内部都存在一个自己的module对象

在该module对象中都有一个成员exports（也是一个对象）

结构相当于

````javascript
var module = {
    exports: {
        ...
    }
}
````

如果只需要向外导出成员，只需要把导出的成员挂载到module.exports上

node内部为了简化操作避免用户频繁的使用module.exports.***来挂载对象，专门提供了一个exports = module.exports来优化代码

所以在挂载多个成员时使用exports.***即可

但是如果在只需要导出一个变量时需要将module.exports重新定义为导出的成员

### require加载规则

**优先从缓存加载**

在node.js中，模块加载会直接从缓存中加载，目的是为了避免重复加载，提高模块的加载效率

### 常用NPM命令

下载命令：npm install *** （-S保存依赖项）

卸载命令：npm uninstall ***

升级NPM：npm install --global npm

初始化：npm init (-y) （-y可以跳过安装过程）

查看帮助：npm help

### Express框架入门

Express框架的目的就是提高效率，是代码更加统一

使用过程：

````javascript
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
  res.send('This is About..')
})

// 相当于server.listen
app.listen(8080, function () {
  console.log('app is running...');
})
````

## Day04

### Nodemon插件

使用nodemon工具启动服务解决频繁修改代码重启服务器的作用

````shell
npm install --global nodemon

# 以前使用的是node app.js启动服务
# 现在使用nodemon app.js启动即可
nodemon app.js
````

nodemon会监视文件的变化，自动重启服务器

**Tips：凡是npm安装命令添加了--global，做所有文件夹均可执行**，属于全局安装

### 理解路由

从一方面来看，路由实质上就是一张表，里面存储的是不同的映射关系

在node.js中app.get就是对路由的一种映射，如：

使用get方法请求'/'执行

````javascript
// 请求'/'，执行以下函数
app.get('/', function (req, res) {
  res.send('hello express!')
})
````

使用post方法请求'/'执行

````javascript
// 请求'/'，执行以下函数
app.post('/', function (req, res) {
  res.send('hello express!')
})
````

### 静态资源访问

方法一：

````javascript
app.use('/public/', express.static('./public/'))
// 访问localhost:8080/public/main.html即可直接访问
````

方法二：

````javascript
app.user(express.static('./public/'))
// 访问localhost:8080/main.html即可直接访问
````

实际上第一种写法的第一个参数是对第二参数的一种别名

### 配置art-template模板引擎

安装：

````shell
npm install --save art-template
npm install --save express-art-template
````

配置：

````javascript
app.use('/public/', express.static('./public/'))
````

使用：

````javascript
app.get('/admin', function (req, res) {
  res.render('admin/index.html', {
    name: 'Jacob'
  })
})
````

### 重写记事本功能

````javascript
const express = require('express')
const app = express()
const url = require('url')
const date = new Date();

const chats = [
  {
    name: 'jacob',
    info: 'skksk',
    chat_time: '2020'
  }
]

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

app.get('/admin', function (req, res) {
  res.render('admin/index.html', {
    name: 'Jacob'
  })
})

app.listen(8080, function () {
  console.log('Server is running...');
})
````

### Post方法数据解析

获取post数据需要结合第三方包：body-parser

````shell
npm install body-parser
````

引包：

````javascript
const bodyParser = require('body-parser')
````

只要加入了这个配置，则在req请求对象上会多出一个属性：body

可以直接使用req.body来获取表单POST请求体数据

配置：

````javascript
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
````

使用：

````javascript
// 当以POST请求/submit的时候执行指定处理函数
app.post('/submit', function (req, res) {
  const chatObj = req.body
  chatObj.chat_time = date.toLocaleString()
  chats.unshift(chatObj)
  res.redirect('/')
})
````

### CRUD模拟

构建完整项目步骤

1、创建项目，在其中创建views、public等基本文件夹

2、npm init 对项目进行npm初始化

3、npm install -S express 使用Express框架

4、新建app.js

5、初始化app.js，构成最基本的hello world

````javascript
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(8080, function () {
  console.log('Server is running');
})
````

6、安装art-template

````shell
npm install --save art-template
npm install --save express-art-template
````

7、配置art-template

````javascript
app.engine('html', require('express-art-template'))
````

8、引入静态文件

````javascript
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))
````

9、读取文件

````javascript
// readFile第二个参数是可选的，属于编码方式
  fs.readFile('./db.json', 'utf8', function (err, data) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.render('index.html', {
      students: JSON.parse(data).students
    })
  })
````

完整代码

````javascript
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
````

### 路由设计

项目中使用以下方式构建路由表

| 请求方法 | 请求路径         | get参数 | post参数                   | 备注             |
| -------- | ---------------- | ------- | -------------------------- | ---------------- |
| GET      | /students        |         |                            | 渲染首页         |
| GET      | /students/new    |         |                            | 渲染添加学生页面 |
| POST     | /students        |         | name/age/gender/hobbies    | 处理添加学生请求 |
| GET      | /students/edit   | id      |                            | 渲染编辑页面     |
| POST     | /students/edit   |         | id/name/age/gender/hobbies | 处理编辑学生请求 |
| GET      | /students/delete | id      |                            | 处理删除请求     |

单独提出路由router.js

````javascript
const fs = require('fs')
module.exports = function (app) {
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
}
````

在app.js中使用上述路由

````javascript
const express = require('express')
const router = require('./router')
const app = express()

// 引入模板
app.engine('html', require('express-art-template'))
// 引入静态文件
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

router(app)

app.listen(8080, function () {
  console.log('Server is running');
})
````

### Express提供的路由服务

router.js

````javascript
const fs = require('fs')
const express = require('express')

// 1、创建路由容器
const router = express.Router()
// 2、将路由都挂在上路由容器中
router.get('/', function (req, res) {
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
// 3、导出router
module.exports = router
````

app.js

````javascript
const express = require('express')
const router = require('./router')
const app = express()

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
````

app.js作为程序入口只需要执行以下职责即可：

1、创建服务；

2、做一些服务和相关配置；

3、模板引擎；

4、提供静态资源服务；

5、解析post请求体（body-parser）

6、挂载路由；

7、监听端口

### 持久化方法封装(Mapper)

这种模块职责是操作文件（数据库）中的数据，只处理数据，不关心业务

实例：

````javascript
const fs = require('fs')
const dbPath = './db.json'
/**
 * 获取所有学生
 */
exports.findAll = function (callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}

/**
 * 查找单个学生
 */
exports.findById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    let student = students.find(function (item) {
      return item.id + '' === id
    })
    callback(null, student)
  })
}

/**
 * 添加学生
 */
exports.addStu = function (student, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    // 获取json中的数据
    let students = JSON.parse(data).students
    // 保证id不重复
    if (students.length === 0) {
      student.id = '1'
    } else {
      student.id = parseInt(students[students.length - 1].id) + 1 + ''
    }
    // 将数据写入数组中
    students.push(student)
    // 整理成json格式
    let fileData = JSON.stringify({
      students: students
    })
    // 写入数据，产生回调
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

/**
 * 更新学生
 */
exports.editStu = function (student, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === student.id) {
        students[i] = student
      }
    }
    let fileData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

/**
 * 删除学生
 */
exports.deleteStu = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === id) {
        students.splice(i, 1)
      }
    }
    let fileData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        callback(err)
      }
      callback(null)
    })
  })
}
````

**Tips：如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取，回调函数目的就是获取异步操作的结果**

````javascript
function fn (callback) {
    // var callback = function (data) { console.log(data) }
    setTimeout(function () {
        var data = 'hello'
        callback(data)
    }, 1000)
}

fn(function (data) {
    console.log(data)
})
````

## Day05

### 回调函数

在JavaScript中函数是一种数据类型，可以作为一种参数而存在

一般情况下，把函数作为参数的目的就是为了获取函数内部的异步操作结果

1、首先理解什么是异步编程，下面是一个例子

````javascript
// Js异步
console.log(1)

setTimeout(function () {
  console.log(2)
}, 1000)

console.log(3);
// 在这个顺序中，由于setTimeout函数的存在，导致程序不再按照从上至下的顺序执行
// 这个程序的输出结果将不再是123而是132
````

js代码在执行过程中不会等待计时器（哪怕设置的是0s）都是执行完其他后再执行

这就是**JavaScript的单线程、事件循环**

2、根据上述思想，模拟出另外一个函数，如下：

````javascript
function add(x, y) {
  console.log(x);
  setTimeout(function () {
    console.log("setTimeout");
    var ret = x + y
    return ret
  }, 1000)
  console.log(y);
}

console.log(add(1, 3))
````

同样的，这个程序执行下来输出顺序应该是1，3，undefined，setTimeout

此外，还有一种情况也将被排除，道理相同，如下：

````javascript
function add(x, y) {
  var ret
  setTimeout(function () {
    ret = x + y
    return ret
  }, 1000)
  return ret
}
console.log(add(1, 3))  => undefined
````

3、由上可知，这种情况下一定要使用到回调函数来获取值

理解一个概念：回调函数一般在执行操作完成之后调用

````javascript
function add(x, y, callback) {
  console.log(1)
  setTimeout(function () {
    console.log(2)
    var ret = x + y
    callback(ret)
  }, 1000)
  console.log(3)
}

add(10, 20, function (ret) {
  console.log(4)
  console.log(ret);
})

console.log(5);
````

上述程序输出结果是1，3，5，2，4，30

那么，这个程序可以理解为，程序的运行不再需要等待setTimeout的等待过程，而是在这个等待的过程中可以去执行别的操作（如本程序中的console.log(5)就属于别的操作），达成了异步的意义，另外，callback的设定相当于对setTimeout设置了一个’监视器‘，程序自动完成了serTimeout内的操作时会自动调用call-back函数，达成对数据的操作。因此，在callback函数中可以对setTimeout中的任何参数进行操作而不会受到影响。

而在该程序中setTimeout就是对浏览器异步过程的一种模拟，因为真正的程序执行过程中诸如常用的：readFile、writeFile、readdir、Ajax都属于异步操作，不仅仅局限于setTimeout。

### MongoDB简介

关系型数据库：

- 表就是一种关系，或者说是表与表之间存在关系
- 所有的关系型数据库都需要通过sql语言来操作
- 数据表支持约束

非关系型数据库：

- 非常灵活，也可以在非关系型数据库设置为关系
- 有的非关系型数据库就是key-value键值对
- MongoDB是最像关系型数据库的非关系型数据库
- MongoDB不需要设计表结构
- 可以任意向MongoDB中存入数据，没有结构性这么一说

### MongoDB启动与结束

开启服务:

````shell
mongodb
# 如果想要修改默认的数据存储目录
mongod --dbpath=数据存储目录路径
# 如果修改了，则每次启动都需要使用以上代码
````

关闭服务：

```shell
Ctrl+c，或者直接关闭
```

连接数据库：

```shell
# 该命令默认连接本机的MongoDB服务
mongo
```

退出数据库：

````shell
# 在连接状态输入exit退出连接
exit
````

### MongoDB基本命令

- 查看所有数据库

   `show dbs`

- 查看当前操作的数据库

   `db`

- 切换到指定数据库（如果没有会自动新建） 

  `use 数据库名称`

- 插入数据（示例）

  `db.student.insertOne({"name": "jack"})`

其中student是当前操作的数据库中的一个“集合”，相当于关系型数据库中的“表”

- 查询当前数据库下所有的集合

  `show collections`

- 查询集合中的数据

  `db.student.find()`

**MongoDB中对存入数据没有任何限制，存入数据是不需要像关系型数据库要对表结构进行修改**

### Mongoose

Mongoose是基于官方MongoDB的mongodb包再一次进行了封装，功能是操作MongoDB

````javascript
// 引入mongoose包
const mongoose = require('mongoose')

// 连接MongoDB数据库
mongoose.connect('mongodb://localhost/test')

// 创建一个模型，在代码中设计数据库
// Cat是集合名，希望这个集合当中存储的文档有一个name，name的要求是字符串类型
// 虽然写的是Cat，但是最终生成的是名为cats的集合
const Cat = mongoose.model('Cat', { name: String })

// 实例化Cat
const kitty = new Cat({ name: 'Zildjian' })

// 持久化保存Kitty实例
kitty.save().then(() => console.log('meow'))
````

### MongoDB结构

- 可以有多个数据库
- 一个数据库中可以有多个集合（表）
- 一个集合中可以有多个文档（表记录）
- 文档结构很灵活，没有任何限制
- MongoDB很灵活，不需要像MySQL一样先建立数据库，表，设计表结构
  - 在这里只需要插入数据库写清楚用的是哪个数据库的哪个集合就可以了

````json
{
    qq: {
        users: [
            {name: "zhangsan", age: 15},
            {name: "lisi", age: 20},
            {name: "wangwu", age: 25},
            {name: "maqi", age: 30}
            ...
        ],
        products: [
            ...
        ],
        ...
    },
    wechat: {...},
    tim: {...}
}
````

使用schema对文档结构进行约束

````javascript
const mongoose = require('mongoose')
// 这个Schema就是一种数据模式
const Schema = mongoose.Schema;

// 连接数据库，这个数据库可以不用存在，会自动创建
mongoose.connect('mongodb://localhost/test')

// 通过代码设计文档结构（下面是一个user的集合模式）
// 表示每个文档必须要有title, author, body等字段并应该符合设置的类型
// 一般这些类型都是JavaScript原生支持的数据类型
// 约束的目的就是避免出现脏数据，保证数据完整性// 以下是对用户的一种文档结构模式设计
const userSchema = new Schema({
  username: {
    type: String,
    // 这个required表明username字段是必填的
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: String
})

// 将文档结构发布为模型
// mongoose.model()方法是为了将一个架构发布为model
// 第一个参数：传入一个大写名词单数字符串来表示集合名称
//            mongoose会自动将大写字母化为小写并形成一个小写复数的集合名词
// 第二个参数：架构模板名称
const User = mongoose.model('User', userSchema)
````

