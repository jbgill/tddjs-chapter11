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

var should = require('should');

var observer_util = require('../observer_util');

describe('Observable test suite', function() {

  describe('ObservableAddObserverTest', function() {
    it('should store the observer function', function() {
      var observable = Object.create(observer_util.observable);
      var observers = [function() {}, function() {}];

      observable.addObserver(observers[0]);
      observable.addObserver(observers[1]);

      observable.hasObserver(observers[0]).should.eql(true);
      observable.hasObserver(observers[1]).should.eql(true);
    });

    it("should throw for an uncallable observer", function() {
      var observable = Object.create(observer_util.observable);

      (function() {
        observable.addObserver({});
      }).should.throwError('TypeError');
    });
  });

  describe('ObservableHasObserverTest', function() {
    it("should return false when we don't have the observer", function() {
      var observable = Object.create(observer_util.observable);

      observable.hasObserver(function(){}).should.eql(false);
    });
  });

  describe('ObservableNotifyObserversTest', function() {
    it("should call all observers", function() {
      var observable = Object.create(observer_util.observable);
      var observer1 = function() { observer1.called = true;};
      var observer2 = function() { observer2.called = true;};

      observable.addObserver(observer1);
      observable.addObserver(observer2);
      observable.notifyObservers();

      observer1.called.should.eql(true);
      observer2.called.should.eql(true);
    });

    it("should pass through arguments to observers", function() {
      var observable = Object.create(observer_util.observable);
      var actual;

      observable.addObserver(function() {
        actual = arguments;
      });

      observable.notifyObservers("String", 1, 32);
      actual.should.eql(["String", 1, 32]);
    });

    it("should notify all even when some fail (throw an exception)", function() {
      var observable = Object.create(observer_util.observable);
      var observer1 = function(){ throw new Error("Oops"); };
      var observer2 = function(){ observer2.called = true; };

      observable.addObserver(observer1);
      observable.addObserver(observer2);
      observable.notifyObservers();

      observer2.called.should.eql(true);
    });

    it("should call observers in the order they were added)", function() {
      var observable = Object.create(observer_util.observable);
      var calls = [];
      var observer1 = function(){ calls.push(observer1); };
      var observer2 = function(){ calls.push(observer2); };

      observable.addObserver(observer1);
      observable.addObserver(observer2);
      observable.notifyObservers();

      observer1.should.eql(calls[0]);
      observer2.should.eql(calls[1]);
    });

    it("should not fail if no observers yet", function() {
      var observable = Object.create(observer_util.observable);

      (function() {
        observable.notifyObservers({});
      }).should.not.throwError();

    });
  });


});