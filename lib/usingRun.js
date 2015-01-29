/* jshint esnext: true */
var fs = require('fs');

// This is a thunk
function read(file) {
  return function(cb) {
    fs.readFile(file, 'utf8', cb);
  };
}

function run(genFn) {
  // create generator object
  var genObj = genFn();

  function next(err, data){
    var ret = err ? genObj.throw(err) : genObj.next(data);
    if (ret.done) return;
    // call the next thunk
    ret.value(next);
  }

  // return the higher order function controlling
  // the looping over all the yielded/generated thunks
  return next;
}

// Generators are really nice in NodeJS
//  1) Exception handling
//  2) No callback hell
//  3) 'yields' can move around (up, down)
//  4) Promises are nice too by the way, but more verbose!!!
//  5) Inside function*() { .... } it almost looks like regular synchronous code
//     apart from
//      i) the wrapper function run()
//      ii) yield statements
//      iii) the special thunks (read, not fs.readFile)
function main() {
  run(function*() {
    var data = yield read(__filename);
    console.log(data);
    try {
      var wrongPackage = JSON.parse(yield read('../package.json'));
      console.log('package name: ' + wrongPackage.name);
    }
    catch (e) {
      console.error(e);
    }
    var package = JSON.parse(yield read('package.json'));
    console.log('package name: ' + package.name);
  })();
}

module.exports = main;
