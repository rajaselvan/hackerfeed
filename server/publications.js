Meteor.publish('singlePost', function (id) {
  check(id, String);
  return Posts.find(id);
});


Meteor.publish('comments', function (postId) {
  check(postId, String);
  return Comments.find({ postId: postId });
});

Meteor.publish('notifications', function () {
  return Notifications.find({ userId: this.userId, read: false });
});

Meteor.publish('web_dev', function (options) {
  check(options, {
    sort: Object,
    fields: Object,
    limit: Number


  });
  return webdev(options);
});

Meteor.publish('mobile_dev', function (options) {
  check(options, {
    sort: Object,
    fields: Object,
    limit: Number


  });
  return mobiledev(options);
});

Meteor.publish('java_dev', function (options) {
  check(options, {
    sort: Object,
    fields: Object,
    limit: Number


  });
  return javadev(options);
});

Meteor.publish('tech_news', function (options) {
  check(options, {
    sort: Object,
    fields: Object,
    limit: Number


  });
  return technews(options);
});

Meteor.publish('top_stories', function (options) {
  check(options, {
    sort: Object,
    fields: Object,
    limit: Number


  });
  return topstories(options);
});

Meteor.publish('threads', function (options) {
  check(options,{
    sort: Object,
    limit: Number
    
  });
return allthreads(options);
});