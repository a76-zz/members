export default DS.Store.extend({
  filterQuery: function(type, query) {
    type = this.modelFor(type);

    var array = this.recordArrayManager
      .createAdapterPopulatedRecordArray(type, query);

    var adapter = this.adapterFor(type);

    Ember.assert("You tried to load a query but you have no adapter (for " + type + ")", adapter);
    Ember.assert("You tried to load a query but your adapter does not implement `findQuery`", adapter.findQuery);

    return promiseArray(_filterQuery(adapter, this, type, query, array));
  }
});

function _createRecordArray(store, type, query) {
  var array = store.recordArrayManager.createAdapterPopulatedRecordArray(type, query);

  array.set('filter', query.filter);
  return array;
}

function _filterQuery(adapter, store, type, query, recordArray) {


}