function fizzbuzz(x) {
  if (x % 15 === 0) console.log("FizzBuzz");
  else if (x % 5 === 0) console.log("Buzz");
  else if (x % 3 === 0) console.log("Fizz");
  else console.log(x);
}

for (let x = 1; x <= 20; x++) fizzbuzz(x);
