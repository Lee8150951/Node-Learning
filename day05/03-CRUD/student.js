const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/students')

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: [0, 1], // 枚举，必须是0，1
    default: 0
  },
  age: {
    type: Number
  },
  hobbies: {
    type: String
  }
})

module.exports = mongoose.model('Student', studentSchema)