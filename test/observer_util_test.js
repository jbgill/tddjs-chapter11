// STEP 5: We realize that our ObservableAddOberverTest is making bad assumptions
// about the implementation by accessing the observers array directly.  To help solve that we
// will add a new method to Observable, called hasObserver.  We start with a new test.

var should = require('should');

var observer_util = require('../observer_util');

describe('Observable test suite', function() {

  describe('ObservableAddObserverTest', function() {
    it('should store the observer function', function() {
      var observable = new observer_util.Observable();
      var observers = [function() {}, function() {}];

      observable.addObserver(observers[0]);
      observable.addObserver(observers[1]);

      // we know this is a bad condition - we'll get to it later
      observers.should.eql(observable.observers);
    });
  });

  describe('ObservableHasObserverTest', function() {
    it('should return true when we have the observer', function() {
      var observable = new observer_util.Observable();
      var observer = function() {};

      observable.addObserver(observer);

      observable.hasObserver(observer).should.eql(true);
    });
  });


});