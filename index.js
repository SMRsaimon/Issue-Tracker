let arrey = [];
arrey = [
    { a: 1, b: 4 },
    { a: 1, b: 6 },
    { a: 1, b: 7 },
];

let sum = 0;
arrey.forEach((x) => {
    sum = +(sum + x.a);
});

console.log(sum);