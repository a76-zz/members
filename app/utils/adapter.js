import cache from 'appkit/utils/cache';
import pager from 'appkit/utils/pager';
import filter from 'appkit/utils/filter';
import sorter from 'appkit/utils/sorter';
import comparator from 'appkit/utils/comparator';

var Promise = Ember.RSVP.Promise;

function extractFiltering (query) {
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

function isFilteringQuery: function(filtering, queryFiltering) {
  var prop;

  for (prop in queryFiltering) {
    if (queryFiltering.hasOwnProperty(prop)) {
      if (filtering[prop] !== queryFiltering[prop]) {
        return true;
      }
    }
  }

  for (prop in filtering) {
    if (filtering.hasOwnProperty(prop)) {
      if (filtering[prop] !== queryFiltering[prop]) {
        return true;
      }
    }
  }

  return false;
}

function getRange(key, context) {
  return pager.getRange(context.pageSize, context.page, context.total);
}

function getTotal(mode, context) {
  return mode === 2 ? context.l2cache.length : context.total;
}

function getFiltering(mode, context) {
  return mode === 2 ? context.l2filtering : context.filtering
}

function getData(key, mode, context, range) {
  return mode === 2 ? context.l2cache.slice(range.from, range.to) : cache.read_unsafe(key, range);
}

export default Ember.Object.extend({
  context: {},
  getContext: function(key){
    var context = this.get('context');
    if (context[key] === undefined) {
      context[key] = {
        filtering: {}
      }
    }

    return context[key];
  },
  getSnapshot: function(key, mode) {
    var context = this.getContext(key),
    range = getRange(key, context),
    result = {
      meta: {
        total: getTotal(mode, context)
      }
    };

    result[key] = getData(key, mode, context, range);
    
    return result;
  },
  findQuery: function(key, query) {

  }
  toPage: function(key, page) {
    var context = this.getContext(key),
    range;

    context.page = page;

    if (context.l2cache) {
      return 
    }

  }

});