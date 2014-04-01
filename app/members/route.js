// routes/members.js
export default Ember.Route.extend({
  queryParams: {
    firstName: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
    pageSize: {
      refreshModel: true
    },
    sortBy: {
      refreshModel: true
    },
    sortAsc: {
      refreshModel: true
    }
  },
  model: function (params) {
    return this.store.findQuery('member', params);
  }  
});
