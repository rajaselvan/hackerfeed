Template.commentItem.helpers({
  submittedText: function() {
    return moment(this.submitted).fromNow();
  }
});