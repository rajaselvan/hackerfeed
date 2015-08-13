topstories = function(options) {
  return Feed_Entries.find({}, options);
}
webdev = function(options) {
  return Feed_Entries.find({feed_id: '1'}, options);
}
mobiledev = function(options) {
  return Feed_Entries.find({feed_id: '2'}, options);
}
javadev = function(options) {
  return Feed_Entries.find({feed_id: '3'}, options);
}
allthreads = function(options) {
  return Posts.find({}, options);
}
