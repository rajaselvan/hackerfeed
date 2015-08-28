Feeds = new Meteor.Collection("feeds");
Feed_Entries = new Meteor.Collection("feed_entries");




Meteor.methods({
 upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);
    
    var affected = Feed_Entries.update({
      _id: postId, 
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
    
    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  }
});