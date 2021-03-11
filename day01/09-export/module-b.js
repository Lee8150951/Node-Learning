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