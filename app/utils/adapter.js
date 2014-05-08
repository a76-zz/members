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

function isWhole (context) {
  return context.total && cache.contains(context.key, {from: 0, to: context.total});
}

function getFilterMode (context, _filter) {
  return isWhole(context) && comparator(context.filter, _filter) ? 2 : 0;
} 

function getSnapshot (context, mode) {
  var total, range, data, result = {};

  if (mode === 2) {
    total = context.l2cache.length;
    range = pager.getRange(context.pageSize, context.page, total);
    data = context.l2cache.slice(range.from, range.to);
  } else {
    total = context.total;
    range = pager.getRange(context.pageSize, context.page, total);
    data = cache.readUnsafe(context.key, range);
  }

  result.meta = {
    total: total,
    mode: mode,
    range: range,
    filter: context.filter
  };

  result[context.key] = data;
  return result;
}

export default Ember.Object.extend({
  context: {},
  findQuery: function(key, query, findQueryExecutor) {
    var getContext = function(that, key) {
          var context = that.get('context'),
            createContext = function (key) {
              var capacity = that.get('defaultCapacity');
              return {
                key: key,
                filter: {},
                capacity: capacity,
                sort: {
                  key: null,
                  asc: true,
                  value: function (current) {
                    return current[this.key];
                  }
                }
              };
            };

          if (context[key] === undefined) {
            context[key] = createContext(key);
          }
          return context[key];
        },
        saveContext = function (context) {
          context.sortBy = query.sortBy;
          context.sortAsc = query.sortAsc;
          context.page = query.page;
          context.pageSize = query.pageSize;  
        },
        doQueryInternal = function (mode, filterOperator) {
          var data;
          if (context.l2cache) {
            data = context.l2cache;
          } else {
            data = cache.readAll(context.key);
          } 

          if (filterOperator) {
            data = filterOperator(_filter, data);
          } 

          saveContext(context);

          context.l2cache = sorter(context.sort, data);
          return new Promise(function(resolve, reject) {
            resolve(getSnapshot(context, mode));
          });
        },
        _filter = extractFilter(query),
        context = getContext(this, key),
        mode = getFilterMode(context, _filter),
        range = pager.getRange(query.pageSize, query.page, context.total);


    if (equals(context.filter, _filter)) {
      if (context.sortBy === query.sortBy && context.sortAsc === query.sortAsc) {
        if (cache.contains(key, range)) {
          saveContext(context);
          return new Promise(function(resolve, reject) {
            resolve(getSnapshot(context, 1));
          });
        } 
      } else {
        if (isWhole(context)) {
          return doQueryInternal(1);
        }
      } 
    } else {
      if (mode === 2) {
        return doQueryInternal(2, filter);
      } else {
        context.total = undefined;
        cache.reset(key);
      }
    }

    context.filter = _filter;
    saveContext(context);
    range = cache.coverage(context.key, range, context.capacity, context.total);

    return findQueryExecutor(key, {
      filter: _filter,
      sort: {
        key: query.sortBy,
        asc: query.sortAsc
      },
      range: range
    }).then(function(response) {
      context.total = response.meta.total;
      cache.write(key, response[key], response.meta.range);
      return getSnapshot(context, mode);
    });
  }

});