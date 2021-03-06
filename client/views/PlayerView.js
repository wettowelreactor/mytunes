// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  //
  // el: '<audio controls autoplay />',

  initialize: function() {
    this.initialRender();
  },

  template: _.template('<%= title %> by <%= artist %> played <%= songCount %> times.'),

  setSong: function(song){
    this.model = song;
    this.$el.attr('src', this.model ? this.model.get('url') : '');
    if (this.model !== null){
      this.model.set('songCount', this.model.get('songCount') + 1);
    }
    this.render();
  },

  songEnd: function() {
    return this.el.ended || this.el.played.length === 0;
  },

  events: {
    'ended' : function() {
      this.model.requestNewSong();
    }
  },
  initialRender: function() {
    this.$el.closest('div').prepend('<h1>Click Song to Play!</h1>');

  },
  render: function() {
      if (this.model && _.has(this.model.attributes, 'title')) {
        this.$el.closest('div').find('h1').html(this.template(this.model.attributes));
      } else {
        this.$el.closest('div').find('h1').html('Click Song to Play!');
      }
    }

});
