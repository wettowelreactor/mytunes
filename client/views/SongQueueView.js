// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'add' , this.render);
    this.listenTo(this.collection, 'remove', this.render);
  },


  render: function() {
    this.$el.html('<th><h1>Queue</h1></th>').append(
      this.collection.map(function(song) {
        return new SongQueueEntryView({model: song}).render();
      })
    );
    return this;
  }

});
