const http = require('http');
const server = http.createServer();
const products = [
    {
        name: 'Apple',
        price: 7499
    }, {
        name: 'Huawei',
        price: 3499
    }, {
        name: 'Samsung',
        price: 4599
    }, {
        name: 'Xiaomi',
        price: 2999
    }
]
server.on('request', function(req, res) {
    console.log("请求：" + req.url);
    // 根据不同的请求路径发送不同的相应
    let url = req.url;
    if(url === "/") {
        res.end('Index Page');
    } else if(url === "/login") {
        res.end('Login Page');
    } else if(url === "/register") {
        res.end('Register Page');
    } else if (url === "/product") {
        // 响应内容只能是二进制数据或字符串
        // 不可以相应数组、对象、Boolean等等
        // res.end(products)
        res.end(JSON.stringify(products))
    } else {
        res.end('404 Not Found')
    }
})
server.listen(8080, function() {
    console.log("服务器启动成功");
})