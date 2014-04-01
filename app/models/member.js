// models/member.js
var Member = DS.Model.extend({
   firstName: DS.attr('string'),
   lastName: DS.attr('string')
});

Member.reopenClass({
  FIXTURES: [
  {
    id: "1",
    firstName: 'Andrei',
    lastName: 'Tarkovski'
  }, {
    id: "2",
    firstName: 'Andrei',
    lastName: 'Silchankau'
  }, {
    id: "3",
    firstName: 'Andrei',
    lastName: 'Tamelo'
  }    
]});

export default Member;

