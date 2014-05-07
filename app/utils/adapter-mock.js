import cache from "../utils/cache";
import filter from "../utils/filter";
import pager from "../utils/pager";
import sort from "../utils/sorter";

var Promise = Ember.RSVP.Promise;

export default Ember.Object.extend({
  cache: null,
  findQuery: function(key, query) {
    var cache = this.get('cache')[key];

    return new Promise(function (resolve, reject) {
      var data = filter(query.filter, cache),
        total = data.length,
        range = {
          from: query.range.from,
          to: Math.min(query.range.to, total)
        },
        result = {
          meta: {}
        };

      data = sort({
        key: query.sort.key,
        asc: query.sort.asc,
        value: function (current) {
          return current[this.key];
        }
      }, data);

      result.meta.total = total;
      result.meta.range = range;

      result[key] = data.slice(range.from, range.to);
      resolve(result);
    });
  }
});