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

