//import { test, moduleForModel } from 'appkit/tests/helpers/module-for';
import { test, moduleForModel } from 'ember-qunit';
import Member from 'appkit/models/member';
 
moduleForModel('member', 'Post Model', {
});
 
test("Member is a valid ember-data Model", function () {
  var member = this.subject({firstName: 'Andrei', lastName: 'Tarkovski'});
  ok(member);
  ok(member instanceof DS.Model);
  ok(member instanceof Member);

  var store2 = DS.Store.extend({my_store: true}).create({container: this.container});

  var store = this.container.lookup('store:main');
  equal(store2.get('my_store'), true);

  store2.createRecord('member', {});
});