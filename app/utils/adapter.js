import cache from 'appkit/utils/cache';
import pager from 'appkit/utils/pager';
import filter from 'appkit/utils/filter';
import sorter from 'appkit/utils/sorter';
import comparator from 'appkit/utils/comparator';

var Promise = Ember.RSVP.Promise;

function extractFilter (query) {
  var notFilter = {
    page: true,
    pageSize: true,
    sortBy: true,
    sortAsc: true
  },
  result = {};

  for (var prop in query) {
    if (query.hasOwnProperty(prop) && !notFilter[prop]) {
      result[prop] = query[prop];
    }
  }

  return result;
}

function equals (object1, object2) {
  var containsAll = function (source, target) {
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        if (source[prop] !== target[prop]) {
          return false;
        }
      }
    }

    return true;
  };

  return containsAll(object1, object2) && containsAll(object2, object1);
}

function getFilterMode(context, _filter) {
  return context.total && cache.contains(context.key, {from: 0, to: context.total}) && comparator(context.filter, _filter) ? 2 : 0;
} 

function doFilter (context, _filter, mode) {
  var mode = mode || getFilterMode(context, _filter),
    data,
    range;

  if (mode === 2) {
    context.l2filter = _filter;
    data = cache.read_all(context.key);
    data = filter(_filter, data);
    data = sorter(context.sort, data);
    return data;
  }


}

export default Ember.Object.extend({
  context: {},
  getContext: function(key){
    var context = this.get('context');
    if (context[key] === undefined) {
      context[key] = {
        key: key,
        filter: {}
      }
    }

    return context[key];
  },
  
  findQuery: function(key, query) {
    
  }

});