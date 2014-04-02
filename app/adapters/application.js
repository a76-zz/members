import cache from "../utils/cache";
import filter from "../utils/filter";
import pager from "../utils/pager";
import sort from "../utils/sorter";

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

export default DS.FixtureAdapter.extend({
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

    data = data.slice(range.from, range.to);
    return data;
  }
});
