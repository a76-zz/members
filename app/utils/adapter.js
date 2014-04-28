import cache from 'appkit/utils/cache';
import pager from 'appkit/utils/pager';
import filter from 'appkit/utils/filter';
import sorter from 'appkit/utils/sorter';
import comparator from 'appkit/utils/comparator';

var Promise = Ember.RSVP.Promise;

function getRange(key, context) {
  return pager.getRange(context.pageSize, context.page, context.total);
}

function getTotal(mode, context) {
  return mode === 2 ? context.l2cache.length : context.total;
}

function getFiltering(mode, context) {
  return mode === 2 ? context.l2filtering : context.filtering
}

function getData(mode, context, range) {
  return mode === 2 ? context.l2cache.slice(range.from, range.to) : cache.read_unsafe(key, range);
}

function getSnapshot(key, mode, context) {

}

export default Ember.Object.extend({
  getContext: function(key){
    return this.get('context').get(key);
  },
  getSnapshot: function(key, mode) {

  } 
});