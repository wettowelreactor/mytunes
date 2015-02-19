  // SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
var SongQueueEntryView = Backbone.View.extend({
  // your code here!
  tagName: 'tr',

  events: {
    'click': function() {
      this.model.dequeue();
    }
  },

  className: 'queueEntry',

  template: _.template('<td>(<%= artist %>)</td><td><%= title %></td>'),

  render: function() {
    return this.$el.html(this.template(this.model.attributes));
  }

});
