let v: number = 1;
v = v + 1;
console.log(v);

let b = "1";
b = b + 1;
console.log(b);

let x = true;
x = x + 1;
console.log(x);

let h: number = 1;
h = h + "1";
console.log(h);

let a: number[] = [7, true, "Hallo"];

function isDivisible(_dividend: number, _divisor: number): boolean {
    let result: boolean = (_dividend % _divisor == 0);
    return result;
  }