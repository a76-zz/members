// routes/members/index.js

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('members');
  }
});