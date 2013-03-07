// STEP 11:  Refactor method names (apparently they are too verbose for the author)
//  just search and replace addObserver -> observe, notifyObservers -> notify

var should = require('should');

var observer_util = require('../observer_util');

describe('Observable test suite', function() {

  describe('ObservableAddObserverTest', function() {
    it('should store the observer function', function() {
      var observable = Object.create(observer_util.observable);
      var observers = [function() {}, function() {}];

      observable.observe(observers[0]);
      observable.observe(observers[1]);

      observable.hasObserver(observers[0]).should.eql(true);
      observable.hasObserver(observers[1]).should.eql(true);
    });

    it("should throw for an uncallable observer", function() {
      var observable = Object.create(observer_util.observable);

      (function() {
        observable.observe({});
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

      observable.observe(observer1);
      observable.observe(observer2);
      observable.notify();

      observer1.called.should.eql(true);
      observer2.called.should.eql(true);
    });

    it("should pass through arguments to observers", function() {
      var observable = Object.create(observer_util.observable);
      var actual;

      observable.observe(function() {
        actual = arguments;
      });

      observable.notify("String", 1, 32);
      actual.should.eql(["String", 1, 32]);
    });

    it("should notify all even when some fail (throw an exception)", function() {
      var observable = Object.create(observer_util.observable);
      var observer1 = function(){ throw new Error("Oops"); };
      var observer2 = function(){ observer2.called = true; };

      observable.observe(observer1);
      observable.observe(observer2);
      observable.notify();

      observer2.called.should.eql(true);
    });

    it("should call observers in the order they were added)", function() {
      var observable = Object.create(observer_util.observable);
      var calls = [];
      var observer1 = function(){ calls.push(observer1); };
      var observer2 = function(){ calls.push(observer2); };

      observable.observe(observer1);
      observable.observe(observer2);
      observable.notify();

      observer1.should.eql(calls[0]);
      observer2.should.eql(calls[1]);
    });

    it("should not fail if no observers yet", function() {
      var observable = Object.create(observer_util.observable);

      (function() {
        observable.notify({});
      }).should.not.throwError();

    });
  });


});