// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  //
  // el: '<audio controls autoplay />',

  initialize: function() {
    this.render();
  },

  template: _.template('<h1><%= title %> by <%= artist %></h1>'),

  setSong: function(song){
    this.model = song;
    this.$el.attr('src', this.model ? this.model.get('url') : '');
    this.render();
  },

  songEnd: function() {
    return this.el.ended || !this.el.currentSrc;
  },

  events: {
    'ended' : function() {
      this.model.requestNewSong();
    }
  },

  render: function() {
    if (_.has(this.model.attributes, 'title')) {
      this.$el.closest('div').prepend(this.template(this.model.attributes));
    }
  }

});
