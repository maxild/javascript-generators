/* jshint esnext: true */
var Q = require('q'),
    co = require('co');

// Note: Bluebird is two orders of magnitude faster than Q, and is
// much more debuggable. You can look at the benchmarks yourself.

// TODO: Checkout Koa!!!!!

// co requires Promise to be defined
global.Promise = require('bluebird');

// Q
function delayWithQ(milliseconds) {
  var deferred = Q.defer();
  setTimeout(deferred.resolve, milliseconds);
  return deferred.promise;
}

// Bluebird
function delayWithPromise(milliseconds) {
  return new Promise(function(resolve){
    setTimeout(resolve, milliseconds);
  });
}

// You have to use a deferred object when wrapping a
// callback API that doesn't follow the standard
// NodeJS function(err, data)-convention. Like setTimeout (or fs.exists):
// Otherwise use Promise.promisify API (denodify in Q)
function delay(ms) {
    var deferred = Promise.pending(); //Or Q.defer() in Q
    setTimeout(function(){
        deferred.fulfill();
    }, ms);
    return deferred.promise;
}

//var delayDenodified = Q.denodeify(setTimeout);
var delayPromisified = Promise.promisify(setTimeout);

// Thunk
function delayWithThunk(milliseconds) {
  // A 'thunk' returns a function that accepts a callback.
  // The whole point of this wrapping is to eliminate all parameters other than callback,
  // so that Koa, co, run, suspend or whatnot knows how to consume it
  return function(cb) {
    setTimeout(cb, milliseconds);
  };
}

function onerror(err) {
  // log any uncaught errors
  // co will not throw any errors you do not handle!!!
  // HANDLE ALL YOUR ERRORS!!!
  console.error(err.stack);
}

function main() {
  // co will always return a promise
  co(function *(){
    yield delayWithPromise(2000);
    console.log('This code is almost called syncronously by using generator from control.');
    yield delayWithPromise(1000);
    yield delay(1000);
    console.log('Bluebird is faster than Q, I have heard...both work with co.');
    yield delayWithThunk(2000);
    console.log('Co supports promises and thunks.');
  }).catch(onerror);
}

module.exports = main;
