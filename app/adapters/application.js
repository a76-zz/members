import cache from "../utils/cache";
import filter from "../utils/filter";
import pager from "../utils/pager";
import sort from "../utils/sorter";

export default DS.FixtureAdapter.extend({
  queryFixtures: function(fixtures, query, type) {
    var data = this.fixturesForType(type),
        range;

    data = filter(null, data);

    data = sort({
    	key: query.sortBy,
    	asc: query.sortAsc,
    	value: function (current) {
    		return current[this.key]
    	}
    }, data);
   
    range = pager.getRange(query.pageSize, query.page);

    data = data.slice(range.from, range.to);
    return data;
  }
});
