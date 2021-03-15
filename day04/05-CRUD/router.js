const fs = require('fs')
const express = require('express')
// 引入Student
const Student = require('./student')

// 1、创建路由容器
const router = express.Router()
// 2、将路由都挂在上路由容器中
router.get('/students', function (req, res) {
  Student.findAll(function (err, students) {
    if (err) {
      return res.status(500).send('Error Page')
    }
    res.render('index.html', {
      students: students
    })
  })
})

router.get('/students/new', function (req, res) {
  res.render('new.html')
})

router.post('/students/new', function (req, res) {
  let student = req.body
  Student.addStu(student, function (err) {
    if (err) {
      return res.status(500).send('Error Page')
    }
    res.redirect('/students')
  })
})

router.get('/students/edit', function (req, res) {
  let id = req.query.id
  Student.findById(id, function (err, student) {
    if (err) {
      return res.status(500).send('Error Page')
    }
    res.render('edit.html', {
      student: student
    })
  })
})

router.post('/students/edit', function (req, res) {
  let id = req.query.id
  let student = req.body
  student.id = id
  Student.editStu(student, function (err) {
    if (err) {
      return res.status(500).send('Error Page')
    }
    res.redirect('/students')
  })
})

router.get('/students/delete', function (req, res) {
  let id = req.query.id
  Student.deleteStu(id, function(err) {
    if (err) {
      return res.status(500).send('Error Page')
    }
    res.redirect('/students')
  })
})
// 3、导出router
module.exports = router