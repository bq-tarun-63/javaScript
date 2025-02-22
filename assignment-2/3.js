function createCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count
    };
}
const counter1 = createCounter();
const counter2 = createCounter();
counter1.increment();
console.log(counter2.getValue());


console.log(1);
setTimeout(() => console.log(2), 1000);
setTimeout(() => console.log(3), 0);
console.log(4);

async function fetchData() {
    let data = await fetch("https://dummyjson.com/test");
    return data.json();
}

fetchData().then(data => console.log(data));
// { status: 'ok', method: 'GET' }


setTimeout(() => console.log('A'), 0);
Promise.resolve().then(() => console.log('B'));
console.log('C');