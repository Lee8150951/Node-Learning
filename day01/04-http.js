// 加载http模块
const http = require('http')
// 使用http.createServer()创建Web服务器
const server = http.createServer()
// 使用服务器进行一系列操作
// 注册request请求事件
// 当客户端把请求发送过来，就会自动触发服务器的request请求事件，然后执行第二个参数：回调处理
server.on('request', function() {
    console.log('收到请求');
})
// 绑定端口，启动服务器
server.listen(3000, function() {
    console.log('服务器启动成功，通过localhost:3000进行访问');
})