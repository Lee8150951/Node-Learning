const fs = require('fs')

function ReadFile(filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

ReadFile('./data/01.txt')
  .then(function (data) {
    console.log(data)
    return ReadFile('./data/02.txt')
  })
  .then(function (data) {
    console.log(data)
    return ReadFile('./data/03.txt')
  })
  .then(function (data) {
    console.log(data);
  })