function fn (callback) {
  // var callback = function (data) { console.log(data) }
  setTimeout(function () {
      var data = 'hello'
      callback(data)
  }, 1000)
}

fn(function (data) {
  console.log(data)
})