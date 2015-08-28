Feed_Entries.before.insert(function (userId, doc) {
    doc.upvoters=[];
    var sigma=Math.floor((Math.random()*17)+1);
    doc.votes=Math.floor((Math.random() * 337) + sigma);
});


Meteor.startup(function () {
    // code to run on server at startup

    feedReader();

});

function feedReader() {

    // pass the created collections to Feed.collections()
    var collections = {
        feeds: Feeds,
        feed_entries: Feed_Entries
    };

    Feed.collections(collections);

   var web_feed = {
        _id: '1',
        category: 'Web Development',
        link: 'http://pipes.yahoo.com/pipes/pipe.run?_id=cc012cad8243310c75ecd32ce1d544e3&_render=rss',
        refresh_interval: 8000
    };

    Feed.createRssFeed(web_feed);

    var mobile_feed = {
        _id: '2',
        category: 'Mobile Development',
        link: 'http://pipes.yahoo.com/pipes/pipe.run?_id=a3c9849e38b0e0d328c48bfc09f5d221&_render=rss',
        refresh_interval: 8000
    };

    Feed.createRssFeed(mobile_feed);

    var java_feed = {
        _id: '3',
        category: 'Java',
        link: 'http://pipes.yahoo.com/pipes/pipe.run?_id=94549d2bdb49ab89ff2d521139639f78&_render=rss',
        refresh_interval: 8000
    };
    
    Feed.createRssFeed(java_feed);
    
    var tech_feed = {
        _id: '4',
        category: 'Tech',
        link: 'http://pipes.yahoo.com/pipes/pipe.run?_id=cc0453a93dd5258ce13d1892989335b8&_render=rss',
        refresh_interval: 8000
    };

    Feed.createRssFeed(tech_feed);
    Feed.read();
}
