const http = require('http')
const server = http.createServer()
// request请求事件处理函数需要接收两个参数
// Request请求对象：获取客户端的一些请求，例如请求路径
// Response响应对象：响应对象可以用来给客户端发送响应消息
server.on('request', function(request, response) {
    console.log('请求路径是：' + request.url);
    // 发送响应方法：response.write
    // write可以使用多次，但是最后一次一定要使用end结束，否则客户端会一直等待响应
    response.write(request.url)
    response.end()
})
// 绑定端口，启动服务器
server.listen(8080, function() {
    console.log('服务器启动成功，通过localhost:3000进行访问');
})