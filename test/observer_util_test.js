// STEP 2:  first test.  Over in the obeserver source, we make it pass

var should = require('should');

var observer_util = require('../observer_util');

describe('Observable test suite', function() {

  describe('ObservableAddObserverTest', function() {
    it('should store the observer function', function() {
      var observable = new observer_util.Observable();
      var observer = function() {};

      observable.addObserver(observer);

      // we know this is a bad condition - we'll get to it later
      observer.should.equal(observable.observers[0]);
    });
  });


});