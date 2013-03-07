// STEP 7:  refactor the tests to eliminate the bad condition and duplication of code

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


});