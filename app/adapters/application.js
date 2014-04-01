export default DS.FixtureAdapter.extend({
  queryFixtures: function(fixtures, query, type) {
    return this.fixturesForType(type);
  }
});
