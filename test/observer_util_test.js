// STEP 4:  Make the test pass

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


});