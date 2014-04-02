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
  }, {
    id: "4",
    firstName: 'Alesia',
    lastName: 'Popkova'
  }, {
    id: "5",
    firstName: 'Marina',
    lastName: 'Litvin'
  }, {
    id: "6",
    firstName: 'Viktar',
    lastName: 'Kozak'
  }, {
    id: "7",
    firstName: 'Pavel',
    lastName: 'Labovich'
  }, {
    id: "8",
    firstName: 'Pavel',
    lastName: 'Lesovich'
  }    
]});

export default Member;

