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
  increment: 10,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {'pubdate' : -1}, fields: {'summary':0, 'description':0},  limit: this.postsLimit()};
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
  fastRender: true,
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
  increment: 10,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {'pubdate' : -1}, fields: {'summary':0, 'description':0},  limit: this.postsLimit()};
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
  fastRender: true,
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
  increment: 10,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {'pubdate' : -1}, fields: {'summary':0, 'description':0},  limit: this.postsLimit()};
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
  fastRender: true,
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

TechFeedsController = RouteController.extend({
  template: 'feedsList',
  increment: 10,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {'pubdate' : -1}, fields: {'summary':0, 'description':0},  limit: this.postsLimit()};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('tech_news', this.findOptions());
  },
  posts: function() {
    return technews(this.findOptions());
  },
  nextPath: function() {
    return Router.routes.techFeeds.path({postsLimit: this.postsLimit() + this.increment});
  },
  fastRender: true,
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

Router.route('/tech/:postsLimit?', {
  name: 'techFeeds',
  controller: TechFeedsController
  
});



ThreadListController = RouteController.extend({
  template: 'threadsList',
  increment: 10,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {'submitted' : -1}, limit: this.postsLimit()};
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












BestFeedsController =  RouteController.extend({
  template: 'feedsList',
  increment: 10,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return { sort: {votes: -1, pubdate: -1, _id: -1}, fields: {'summary':0, 'description':0},  limit: this.postsLimit()};
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
  controller: BestFeedsController,
  fastRender: true
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
