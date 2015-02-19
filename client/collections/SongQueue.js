// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Backbone.Collection.extend({
  model: SongModel,

  initialize: function(){
    this.on('dequeueSong', this.dequeueSong, this);
  },

  addSong: function(song) {
    this.add(song);
  },

  dequeueSong: function(song) {
    console.log('SongQeue dequeue');
    this.remove(song);
  }


});
