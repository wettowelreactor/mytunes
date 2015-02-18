// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.playerView = new PlayerView({el: $('.player'), model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({el: $('.library'), collection: this.model.get('library')});
    this.songQueueView = new SongQueueView({el: $('.queue'), collection: this.model.get('queue')});

    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'
    this.model.on('change:currentSong', function(model){
      this.playerView.setSong(model.get('currentSong'));
    }, this);
  },

  render: function(){
    return this.$el.html([
      this.libraryView.$el
    ]);
  }

});
