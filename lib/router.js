Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('notifications')];
  }
});


WebFeedsController = RouteController.extend({
  template: 'feedsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {limit: this.postsLimit(), sort: {'published' : -1}};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('web_dev', this.findOptions());
  },
  posts: function() {
    return webdev(this.findOptions());
  },
  nextPath: function() {
    return Router.routes.webFeeds.path({postsLimit: this.postsLimit() + this.increment});
  },
  data: function() {
    var self = this;
    return {
      posts: self.posts(),
      ready: self.postsSub.ready,
      nextPath: function() {
        if (self.posts().count() === self.postsLimit())
          return self.nextPath();
      }
    };
  }
});


MobileFeedsController= RouteController.extend({
  template: 'feedsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {limit: this.postsLimit(),sort: {'published' : -1}};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('mobile_dev', this.findOptions());
  },
  posts: function() {
    return mobiledev(this.findOptions());
  },
  nextPath: function() {
    return Router.routes.mobileFeeds.path({postsLimit: this.postsLimit() + this.increment});
  },
  data: function() {
    var self = this;
    return {
      posts: self.posts(),
      ready: self.postsSub.ready,
      nextPath: function() {
        if (self.posts().count() === self.postsLimit())
          return self.nextPath();
      }
    };
  }
});

JavaFeedsController = RouteController.extend({
  template: 'feedsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {limit: this.postsLimit(), sort: {'published' : -1}};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('java_dev', this.findOptions());
  },
  posts: function() {
    return javadev(this.findOptions());
  },
  nextPath: function() {
    return Router.routes.javaFeeds.path({postsLimit: this.postsLimit() + this.increment});
  },
  data: function() {
    var self = this;
    return {
      posts: self.posts(),
      ready: self.postsSub.ready,
      nextPath: function() {
        if (self.posts().count() === self.postsLimit())
          return self.nextPath();
      }
    };
  }
});




Router.route('/web/:postsLimit?', {
  name: 'webFeeds',
  controller: WebFeedsController
});

Router.route('/mobile/:postsLimit?', {
  name: 'mobileFeeds',
  controller: MobileFeedsController
});

Router.route('/java/:postsLimit?', {
  name: 'javaFeeds',
  controller: JavaFeedsController
});

ThreadListController = RouteController.extend({
  template: 'threadsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {limit: this.postsLimit(), sort: {'published' : -1}};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('threads', this.findOptions());
  },
  posts: function() {
    return allthreads(this.findOptions());
  },
  nextPath: function() {
    return Router.routes.threadList.path({postsLimit: this.postsLimit() + this.increment});
  },
  data: function() {
    var self = this;
    return {
      posts: self.posts(),
      ready: self.postsSub.ready,
      nextPath: function() {
        if (self.posts().count() === self.postsLimit())
          return self.nextPath();
      }
    };
  }
});



PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {limit: this.postsLimit(), sort: {'published' : -1}};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  nextPath: function() {
    return Router.routes.postsList.path({postsLimit: this.postsLimit() + this.increment});
  },
  data: function() {
    var self = this;
    return {
      posts: self.posts(),
      ready: self.postsSub.ready,
      nextPath: function() {
        if (self.posts().count() === self.postsLimit())
          return self.nextPath();
      }
    };
  }
});








BestFeedsController =  RouteController.extend({
  template: 'feedsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return { limit: this.postsLimit(), sort: {votes: -1, published: -1, _id: -1}};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('top_stories', this.findOptions());
  },
  posts: function() {
    return topstories(this.findOptions());
  },
  nextPath: function() {
    return Router.routes.bestFeeds.path({postsLimit: this.postsLimit() + this.increment});
  },
  data: function() {
    var self = this;
    return {
      posts: self.posts(),
      ready: self.postsSub.ready,
      nextPath: function() {
        if (self.posts().count() === self.postsLimit())
          return self.nextPath();
      }
    };
  }
});



Router.route('/', {
  name: 'home',
  controller: BestFeedsController
});

Router.route('/best/:postsLimit?', {
  name: 'bestFeeds',
  controller: BestFeedsController
});

Router.route('/threads/:postsLimit?', {
  name: 'threadList',
  controller: ThreadListController
});






Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() {
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
