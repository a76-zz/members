// controllers/members.js

export default Ember.ArrayController.extend({
  queryParams: ['page', 'pageSize', 'sortBy', 'sortAsc', 'firstName'],
  page: 1,
  pageSize: 1,
  sortBy: 'firstName',
  sortAsc: true,
  firstName: null 
});