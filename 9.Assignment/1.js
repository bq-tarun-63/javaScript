console.log(x);
var x = 5;
///console.log(y);
let y = 10;

function test() {
    console.log(a);
    var a = 20;
    //console.log(b);
    let b = 30;
}
test();

console.log(sum(3, 4));
function sum(a, b) {
    return a + b;
}

console.log(multiply(2, 3));
const multiply = (a, b) => a * b;