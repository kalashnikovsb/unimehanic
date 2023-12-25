const arr = [10, 12, 15, 21];

// Первоначальный код выводит 4 раза Bad: undefined
// Это происходит потому что к первому выполнению функции setTimeout переменная i уже будет равна 4,
// а элемента массива с таким индексом не существует


// 1е решение, использовать let вместо var
for (let i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
  }, 3000);
}


// 2е решение, использовать замыкания для запоминания текущего i
for (var i = 0; i < arr.length; i++) {
  setTimeout(function(i) {
    return function() {
      console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
    }
  }(i), 3000);
}