// STEP 9:  Add test cases for error handling error conditions.  From the book:
// "Ensuring correct behavior in expected situations is important ... however, correct 
// behavior even when the client is misbehaving is just as important to guarantee a 
// stable and predictable system."

var should = require('should');

var observer_util = require('../observer_util');

describe('Observable test suite', function() {

  describe('ObservableAddObserverTest', function() {
    it('should store the observer function', function() {
      var observable = new observer_util.Observable();
      var observers = [function() {}, function() {}];

      observable.addObserver(observers[0]);
      observable.addObserver(observers[1]);

      observable.hasObserver(observers[0]).should.eql(true);
      observable.hasObserver(observers[1]).should.eql(true);
    });

    it("should throw for an uncallable observer", function() {
      var observable = new observer_util.Observable();

      (function() {
        observable.addObserver({});
      }).should.throwError('TypeError');
    });
  });

  describe('ObservableHasObserverTest', function() {
    it("should return false when we don't have the observer", function() {
      var observable = new observer_util.Observable();

      observable.hasObserver(function(){}).should.eql(false);
    });
  });

  describe('ObservableNotifyObserversTest', function() {
    it("should call all observers", function() {
      var observable = new observer_util.Observable();
      var observer1 = function() { observer1.called = true;};
      var observer2 = function() { observer2.called = true;};

      observable.addObserver(observer1);
      observable.addObserver(observer2);
      observable.notifyObservers();

      observer1.called.should.eql(true);
      observer2.called.should.eql(true);
    });

    it("should pass through arguments to observers", function() {
      var observable = new observer_util.Observable();
      var actual;

      observable.addObserver(function() {
        actual = arguments;
      });

      observable.notifyObservers("String", 1, 32);
      actual.should.eql(["String", 1, 32]);
    });

    it("should notify all even when some fail (throw an exception)", function() {
      // Question:  What is a potential problem with this test case?

      var observable = new observer_util.Observable();
      var observer1 = function(){ throw new Error("Oops"); };
      var observer2 = function(){ observer2.called = true; };

      observable.addObserver(observer1);
      observable.addObserver(observer2);
      observable.notifyObservers();

      observer2.called.should.eql(true);
    });

    it("should call observers in the order they were added)", function() {
      var observable = new observer_util.Observable();
      var calls = [];
      var observer1 = function(){ calls.push(observer1); };
      var observer2 = function(){ calls.push(observer2); };

      observable.addObserver(observer1);
      observable.addObserver(observer2);
      observable.notifyObservers();

      observer1.should.eql(calls[0]);
      observer2.should.eql(calls[1]);
    });
  });


});