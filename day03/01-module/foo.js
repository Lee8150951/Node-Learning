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