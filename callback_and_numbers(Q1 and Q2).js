// callback example

const show = (result) => {
  console.log("Here is the reuslt " + result);
};

const doSomeMath = (a, b, callback) => {
  let mult = a * b;
  return callback(mult);
};

doSomeMath(10, 10, show);

// callbackexample

// print the sequence like 1,3,6,10,15
let lstNum = 0;
const printSeq = (end) => {
  let seq = [];
  for (let i = 1; i <= end; i++) {
    seq.push(i + lstNum);
    lstNum = i + lstNum;
  }
  return seq;
};

let seq = printSeq(15);
console.log(seq);
