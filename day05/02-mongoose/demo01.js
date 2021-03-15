// 引入mongoose包
const mongoose = require('mongoose')

// 连接MongoDB数据库
mongoose.connect('mongodb://localhost/test')

// 创建一个模型，在代码中设计数据库
// Cat是集合名，希望这个集合当中存储的文档有一个name，name的要求是字符串类型
// 虽然写的是Cat，但是最终生成的是名为cats的集合
const Cat = mongoose.model('Cat', { name: String })

// 实例化Cat
const kitty = new Cat({ name: 'Zildjian' })

// 持久化保存Kitty实例
kitty.save().then(() => console.log('meow'))