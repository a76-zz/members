import Mock from 'appkit/utils/adapter-mock';
import Adapter from 'appkit/utils/adapter';

var mock = Mock.create({
  cache: {
    member: [
      {firstName: 'a', lastName: 'b'},
      {firstName: 'b', lastName: 'c'},
      {firstName: 'c', lastName: 'd'}
    ]
  }
});

asyncTest("mock", function() {
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
  });
});
