/* jshint esnext: true */

function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
}

function* powersOfTwo(maxExponent) {
    var exponent = 0;
    while (exponent <= maxExponent) {
        yield Math.pow(2, exponent);
        exponent += 1;
    }
}

// Generator objects have the following 4 (or 3) methods
// 1) next()
// 2) next(value) (send(value) in Python)
// 3) throw
// 4) close
// Generator objects no longer has a send(val) method, it is replaced by next(val)
// next is called to resume the generator, and next() is equal to calling next(null)
// throw makes the generator throw an exception
// close....
function* crazyGenerator(x) {
    yield x + 1;
    var y = yield null;
    return x + y;
}


function* consumerGenerator(){
  var i=0;
  while (true) {
    try {
      var val = yield i++;
      console.log('You "send" me the value: ', val);
    } catch(e) {
      console.log('You "threw" me an error, but I caught it...haha');
    }
  }
}

module.exports = {
 helloWorldGenerator: helloWorldGenerator,
 powersOfTwo: powersOfTwo,
 crazyGenerator: crazyGenerator,
 consumerGenerator: consumerGenerator
};
