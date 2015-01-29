// Add backwards compatibility for Node 0.10.x
require('gnode');

var generators = require('./lib/index.js');

// var hwIterator = generators.helloWorldGenerator();

// console.log(hwIterator.next()); // prints { value: 'hello', done: false }
// console.log(hwIterator.next()); // prints { value: 'world', done: false }
// console.log(hwIterator.next()); // prints { value: undefined, done: true }

// ========================

// var it = generators.powersOfTwo(10),
//     result = it.next();

// var i = 0;
// while (!result.done) {
//     console.log('2.pow(%s) = %s', i, result.value);
//     result = it.next();
//     i += 1;
// }

// =========================

// var gen = generators.crazyGenerator(5);
// console.log(gen.next()); // { value: 6, done: false }
// console.log(gen.next()); // { value: null, done: false }
// console.log(gen.next(8)); // { value: 13, done: true }

// =========================

// var consumerGenObject = generators.consumerGenerator();
// console.log(consumerGenObject.next()); // To avoid Exception when sending to newborn generator
// console.log(consumerGenObject.next('Morten'));
// console.log(consumerGenObject.next('Maxild'));
// console.log(consumerGenObject.throw(new Error('Take that you bitch')));

//=================

// var usingSuspend = require('./lib/usingSuspend.js');
// usingSuspend();

var usingRun = require('./lib/usingRun.js');
usingRun();
