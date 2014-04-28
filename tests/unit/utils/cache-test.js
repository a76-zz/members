import cache from 'appkit/utils/cache';

test("write single element", function() {
  var key = "write single element", range;

  cache.write(key, [1], {from: 0, to: 1});
  range = cache.readUnsafe(key, {from: 0, to: 1});

  equal(range[0], 1);
});

test("write", function() {
  var key = "write", range;
  
  cache.write(key, [7, 8], {from: 7, to: 9});
  range = cache.read(key, {from: 7, to: 9});

  equal(range.found, true);
  equal(range.data[0], 7);
  equal(range.data[1], 8);
});

test("count", function() {
  var key = "count";

  cache.write(key, [7, 8], {from: 7, to: 9});
  equal(cache.count(key), 2);
});

test("coverage empty cache", function() {
  var key = "coverage empty cache", coverage;

  coverage = cache.coverage(key, { from: 0, to: 3 }, 5);
  equal(0, coverage.from);
  equal(5, coverage.to);
});

test("coverage empty cache 2", function() {
  var key = "coverage empty cache 2", coverage;
  
  coverage = cache.coverage(key, { from: 0, to: 2 }, 10, 20);
  equal(0, coverage.from);
  equal(10, coverage.to);
});

test("coverage", function() {
  var key = "coverage", coverage;

  cache.write(key, [0, 1, 2, 3], { from: 0, to: 4 });
  coverage = cache.coverage(key, { from: 0, to: 2 }, 10, 20);

  equal(4, coverage.from);
  equal(14, coverage.to);

  coverage = cache.coverage(key, { from: 18, to: 20 }, 10, 20);

  equal(10, coverage.from);
  equal(20, coverage.to);

  coverage = cache.coverage(key, { from: 18, to: 20 }, 20, 20);

  equal(4, coverage.from);
  equal(20, coverage.to);

  coverage = cache.coverage(key, { from: 18, to: 20 }, 40, 20);

  equal(4, coverage.from);
  equal(20, coverage.to);

  cache.write(key, [18, 19], { from: 18, to: 20 });

  coverage = cache.coverage(key, { from: 15, to: 18 }, 10, 20);

  equal(8, coverage.from);
  equal(18, coverage.to);

  coverage = cache.coverage(key, { from: 15, to: 20 }, 10, 20);

  equal(8, coverage.from);
  equal(18, coverage.to);

  coverage = cache.coverage(key, { from: 4, to: 7 }, 10, 20);

  equal(4, coverage.from);
  equal(14, coverage.to);

  cache.write(key, [5, 6], { from: 5, to: 7 });

  coverage = cache.coverage(key, { from: 8, to: 20 }, 10, 20);

  equal(8, coverage.from);
  equal(18, coverage.to);

  coverage = cache.coverage(key, { from: 8, to: 20 }, 11, 20);

  equal(7, coverage.from);
  equal(18, coverage.to);

  coverage = cache.coverage(key, { from: 15, to: 18 }, 10, 20);

  equal(8, coverage.from);
  equal(18, coverage.to);

  coverage = cache.coverage(key, { from: 5, to: 20 }, 10, 20);

  equal(7, coverage.from);
  equal(18, coverage.to);
});

