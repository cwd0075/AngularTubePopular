'use strict';

describe('myTube', function() {
  beforeEach(module('myTube'));

  it('should define a version higher than 1.0', inject(function(VERSION) {
    expect(VERSION).toBeGreaterThan(1.0);
  }));
});