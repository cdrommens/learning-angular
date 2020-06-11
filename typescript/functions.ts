// typescript automaticaly infers the return type to number
function add(n1: number, n2: number) {
    return n1 + n2;
}

// function type
let combinedValues: (a: number, b: number) => number;
combinedValues = add;  // pointer to add function

console.log(combinedValues(8, 8));  // call add function through combinedValues

// callback function as argument
function addAndHandle(n1: number, n2: number, callBackFunction: (num: number) => void) {
    const result = n1 + n2;
    callBackFunction(result);
}

addAndHandle(10, 20, (result) => {
    console.log(result);
})