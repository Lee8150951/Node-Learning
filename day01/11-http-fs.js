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