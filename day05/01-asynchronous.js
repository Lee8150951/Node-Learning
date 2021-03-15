// Js异步
// console.log(1)
// setTimeout(function () {
//   console.log(2)
// }, 500)
// console.log(3);
// 在这个顺序中，由于setTimeout函数的存在，导致程序不再按照从上至下的顺序执行
// 这个程序的输出结果将不再是123而是132

// function add(x, y) {
//   console.log(x);
//   setTimeout(function () {
//     console.log("setTimeout");
//     var ret = x + y
//     return ret
//   }, 1000)
//   console.log(y);
// }
// console.log(add(1, 3))

// function add(x, y) {
//   var ret
//   setTimeout(function () {
//     ret = x + y
//     return ret
//   }, 1000)
//   return ret
// }
// console.log(add(1, 3))

function add(x, y, callback) {
  console.log(1)
  setTimeout(function () {
    console.log(2)
    var ret = x + y
    callback(ret)
  }, 1000)
  console.log(3)
}

add(10, 20, function (ret) {
  console.log(4)
  console.log(ret);
})

console.log(5);