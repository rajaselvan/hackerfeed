Template.feedItem.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  unescaped: function() {
    return unescape(this.title);
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-success upvotable';
    } else {
      return 'disabled';
    }
  }
});

Template.feedItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});


