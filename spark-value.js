Foos = new Meteor.Collection("foo");

if (Meteor.isClient) {
  Template.hello.foo = function () {
    return Foos.findOne();
  };

  Template.hello.events({
    'keyup #oneField' : function (event, template) {
      if (event.which !== 13)
        return;
      Foos.update(this._id, {$set: {one: event.target.value}});
    },
    'keyup #twoField' : function (event, template) {
      if (event.which !== 13)
        return;
      Foos.update(this._id, {$set: {two: event.target.value}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Foos.find().count() === 0) {
      Foos.insert({one: "bar", two: "baz"});
    }
  });
}
