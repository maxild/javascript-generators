/* jshint esnext: true */
var suspend = require('suspend'),
    thunkify = require('thunkify'),
    fs = require('fs'),
    resume = suspend.resume,
    readFile = thunkify(fs.readFile);

function main() {
  // NodeJs callback pattern
  suspend(function*() {
    var data = yield fs.readFile(__filename, 'utf8', resume());
    console.log(data);
  })();
  // Thunks are functions that only have a single argument, a callback,
  // and the thunk is used by the 'controller' that will call the thunk
  // and send back control to the generator function (our user function)
  // genObj.next() => generator will yield the first Thunk
  // genObj.next(value) => suspend will send back the result (or Exception) of the calling the Thunk
  //     pause until next is called again
  // if (done == false) genObj.next() etc etc.....
  suspend(function*() {
      var package = JSON.parse(yield readFile('package.json', 'utf8'));
      console.log('package name: ' + package.name);
  })();
  // Promises also supported in generators via suspend (see https://github.com/jmar777/suspend)
}

module.exports = main;
