// STEP 8:  We need a new notifyObservers method to call the observers and pass arguments
// through to them, so we need two new test cases (write tests first because they define 
// the requirements of the method).

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
  });


});