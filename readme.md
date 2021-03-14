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

