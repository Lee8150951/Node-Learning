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