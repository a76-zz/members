import Mock from 'appkit/utils/adapter-mock';
import Adapter from 'appkit/utils/adapter';

var mock = Mock.create({
  cache: {
    member: [
      {firstName: 'a', lastName: 'b'},
      {firstName: 'b', lastName: 'c'},
      {firstName: 'c', lastName: 'd'},
      {firstName: 'q', lastName: 'a'},
      {firstName: 'q', lastName: 'e'}
    ]
  }
});

var adapter = Adapter.create({
  defaultCapacity: 2
});

asyncTest("mock single asc", function() {
  mock.findQuery('member', {
    filter: {firstName: 'a'},
    sort: {
      key: 'firstName',
      asc: true
    },
    range: {
      from: 0,
      to: 1
    }
  }).then(function(response) {
    start();
    equal(response.member[0].firstName, 'a');
    equal(response.meta.total, 1);
  });
});

asyncTest("mock sort desc", function() {
  mock.findQuery('member', {
    filter: {},
    sort: {
      key: 'firstName',
      asc: false
    },
    range: {
      from: 0,
      to: 1
    }
  }).then(function(response) {
    start();
    equal(response.member[0].firstName, 'q');
    equal(response.meta.total, 5);
    equal(response.member.length, 1);
  });
});

asyncTest("adapter single asc", function() {
  adapter.findQuery('member', {
    firstName: 'a',
    page: 1,
    pageSize: 1,
    sortBy: 'firstName',
    sortAsc: true
  }, function(key, query) { 
    return mock.findQuery(key, query);
  }).then(function(response) {
    start();
    
    equal(response.meta.filter.firstName, 'a');
    equal(response.member[0].firstName, 'a');

    equal(response.meta.range.from, 0);
    equal(response.meta.range.to, 1);
    equal(response.meta.total, 1);
    equal(response.meta.mode, 0);
    equal(response.member.length, 1);
  });
});

asyncTest("adapter several asc", function() {
  adapter.findQuery('member', {
    firstName: 'q',
    page: 1,
    pageSize: 1,
    sortBy: 'firstName',
    sortAsc: true
  }, function(key, query) { 
    return mock.findQuery(key, query);
  }).then(function(response) {
    start();

    equal(response.meta.filter.firstName, 'q');
    equal(response.member[0].firstName, 'q');

    equal(response.meta.range.from, 0);
    equal(response.meta.range.to, 1);
    equal(response.meta.total, 2);
    equal(response.meta.mode, 0);
    equal(response.member.length, 1);
  });
});

/*test("adapter state", function() {
  var cache = adapter.getCache();
  var member = cache.readAll('member');

  equal(member[0].firstName, 'a');

  equal(member.length, 1);
});*/


