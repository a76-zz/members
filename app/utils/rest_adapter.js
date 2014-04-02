import cache from "appkit/utils/cache";
import filter from "appkit/utils/filter";

export default DS.RESTAdapter.extend({
  findQuery: function(store, type, query) {
    return this._super(store, type, query);
  }
});