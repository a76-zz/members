import cache from "../utils/cache";
import filter from "../utils/filter";
import pager from "../utils/pager";
import sort from "../utils/sorter";

export default DS.FixtureAdapter.extend({
  init: function() {
    this.set('serializer', serializer.create({
      container: this.container
    }));
    this._super();
  },
  queryFixtures: function(fixtures, query, type) {
    var data = this.fixturesForType(type),
    filtering = extractFiltering(query),
    total,
    range;

    data = filter(filtering, data);
    total = data.length;

    data = sort({
      key: query.sortBy,
      asc: query.sortAsc,
      value: function (current) {
        return current[this.key];
      }
    }, data);

    range = pager.getRange(query.pageSize, query.page);

    return {
      member: data.slice(range.from, range.to),
      meta: {
        total: total
      }
    };
  }
});

var extractFiltering = function (query) {
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
};

var serializer = DS.JSONSerializer.extend({
  extractFindQuery: function(store, type, payload) {
    return this.extractArray(store, type, payload[type.typeKey]);
  }
});
