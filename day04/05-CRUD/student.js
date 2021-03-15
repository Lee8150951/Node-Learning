const fs = require('fs')
const dbPath = './db.json'
/**
 * 获取所有学生
 * return []
 */
exports.findAll = function (callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}
/**
 * 查找单个学生
 */
exports.findById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    let student = students.find(function (item) {
      return item.id + '' === id
    })
    callback(null, student)
  })
}
/**
 * 添加学生
 */
exports.addStu = function (student, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    // 获取json中的数据
    let students = JSON.parse(data).students
    // 保证id不重复
    if (students.length === 0) {
      student.id = '1'
    } else {
      student.id = parseInt(students[students.length - 1].id) + 1 + ''
    }
    // 将数据写入数组中
    students.push(student)
    // 整理成json格式
    let fileData = JSON.stringify({
      students: students
    })
    // 写入数据，产生回调
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}
/**
 * 更新学生
 */
exports.editStu = function (student, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === student.id) {
        students[i] = student
      }
    }
    let fileData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}
/**
 * 删除学生
 */
exports.deleteStu = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === id) {
        students.splice(i, 1)
      }
    }
    let fileData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        callback(err)
      }
      callback(null)
    })
  })
}