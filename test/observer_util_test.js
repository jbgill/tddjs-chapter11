// STEP 6:  We need a new test to expose the hard-coded hasObserver

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

    it("should return false when we don't have the observer", function() {
      var observable = new observer_util.Observable();

      observable.hasObserver(function(){}).should.eql(false);
    });
  });


});