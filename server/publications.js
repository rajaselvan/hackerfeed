Meteor.publish('posts', function(options) {
  check(options, {
    limit: Number,
    sort: Object
  });
  return Posts.find({}, options);
});

Meteor.publish('singlePost', function(id) {
  check(id, String);
  return Posts.find(id);
});


Meteor.publish('comments', function(postId) {
  check(postId, String);
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});

Meteor.publish('web_dev', function(options) {
  check(options, {
    limit: Number,
    sort: Object
  });
  return webdev(options);
});

Meteor.publish('mobile_dev', function(options) {
  check(options, {
    limit: Number,
    sort: Object
  });
  return mobiledev(options);
});

Meteor.publish('java_dev', function(options) {
  check(options, {
    limit: Number,
    sort: Object
  });
  return javadev(options);
});

Meteor.publish('top_stories', function(options) {
  check(options, {
    limit: Number,
    sort: Object
  });
  return topstories(options);
});

Meteor.publish('threads', function(options) {
  check(options, {
    limit: Number,
    sort: Object
  });
  return allthreads(options);
});