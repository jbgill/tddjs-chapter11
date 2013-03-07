// STEP 10:  Refactor so we can make arbitrary objects observable.  This needs to be done
// a step at a time by introducing new functionality alongside existing functionality before 
// removing/replacing obsolete functionality, adjusting and adding tests with each incremental change.
// Steps:  
// 1.  Empty Constructor
// 2.  Adjust methods to initialize observers array if not already done
// 3.  Replace constructor with an object definition
// 4.  Refactor tests to use the observable object instead of constructor
// 5.  We can then extend or relace any object's prototype to contain this 
//     observable object's interface.  See Listing 11.32

var observable = {};

var addObserver = function(observer) {
  if (typeof observer != "function") {
    throw new TypeError("TypeError");
  }
  if (!this.observers) {
    this.observers = [];
  }
  this.observers.push(observer);
};
observable.addObserver = addObserver;

var hasObserver = function(observer) {
  var i, l;
  if (!this.observers) {
    return false;
  }
  for (i=0,l=this.observers.length; i<l; i++) {
    if (this.observers[i] == observer) {
      return true;
    }
  }
  return false;
};
observable.hasObserver = hasObserver;

var notifyObservers = function() {
  var i,l;
  if (!this.observers) {
    return;
  }
  for (i=0,l=this.observers.length; i<l; i++) {
    try {
      this.observers[i].apply(this, arguments);
    } catch (e) {}
  }
};
observable.notifyObservers = notifyObservers;

exports.observable = observable;
