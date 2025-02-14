const myArr = [1, 2, 3, 4, 5, 6];
const newArr = myArr.flatMap(x => [x*2, x * 1,x*9]);
console.log(newArr);