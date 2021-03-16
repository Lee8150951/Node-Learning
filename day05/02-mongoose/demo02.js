const mongoose = require('mongoose')
// 这个Schema就是一种数据模式
const Schema = mongoose.Schema;

// 连接数据库，这个数据库可以不用存在，会自动创建
mongoose.connect('mongodb://localhost/test')

// 通过代码设计文档结构（下面是一个blog的集合模式）
// 表示每个文档必须要有title, author, body等字段并应该符合设置的类型
// 一般这些类型都是JavaScript原生支持的数据类型
// 约束的目的就是避免出现脏数据，保证数据完整性
const blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
})

// 以下是对用户的一种文档结构模式设计
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

// 增加数据，首先使用new实例对象即可
let admin = new User({
  username: '张三',
  password: 'root',
  email: 'zhangsan@admin.com'
})
// save方法进行存储
admin.save(function (err, ret) {
  if (err) {
    console.log('Create ERROR!')
  } else {
    console.log('Create SUCCESS!')
  }
})

// 查询所有数据
User.find(function (err, ret) {
  if (err) {
    console.log('Retrieve ERROR!')
  } else {
    console.log(ret)
  }
})

// 查询指定数据
User.find({
  username: '张三'
}, function (err, ret) {
  if (err) {
    console.log('Retrieve ERROR!')
  } else {
    console.log(ret)
  }
})

// 删除数据
User.remove({
  username: '张三'
}, function (err, ret) {
  if (err) {
    console.log('Remove ERROR!')
  } else {
    console.log('Remove SUCCESS!')
  }
})

// 更新数据(一个参数ID，第二个参数更改内容，第三个参数回调)
User.findByIdAndUpdate('60506bb62a5c242dac7b8056', {
  password: '123'
}, function (err, ret) {
  if (err) {
    console.log('Update ERROR!')
  } else {
    console.log('Update SUCCESS!')
  }
})