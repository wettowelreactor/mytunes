// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  //
  // el: '<audio controls autoplay />',
  template: _.template('<audio controls autoplay />'),

  initialize: function() {
    this.render();
  },

  setSong: function(song){
    this.model = song;
    this.$el.find('audio').attr('src', this.model ? this.model.get('url') : '');
    this.render();
  },

  songEnd: function() {
    var audio = this.$el.find('audio')[0];
    return audio.ended || !audio.currentSrc;
  },

  render: function(){
    if( this.$el.find('audio').length === 0 ) {
      this.$el.append(this.template());
    }
  }

});
