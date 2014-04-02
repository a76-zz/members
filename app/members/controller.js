// controllers/members.js

export default Ember.ArrayController.extend({
  queryParams: ['page', 'pageSize', 'sortBy', 'sortAsc', 'firstName', 'lastName'],
  page: 1,
  pageSize: 2,
  sortBy: 'firstName',
  sortAsc: true,
  firstName: null,
  lastName: null,

  actions: {
    filter: function () {
      this.transitionToRoute({queryParams: {page: 1}});
    },
    toPage: function (page) {
      this.page = page;
      this.transitionToRoute();
    }
  } 
});