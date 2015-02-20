var VisualizerView = Backbone.View.extend({
  initialize: function() {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioCtx.createAnalyser();

    var source = audioCtx.createMediaElementSource($('audio')[0]);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    var canvasCtx = this.el.getContext('2d');
    analyser.fftSize = 512;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    // draw an oscilloscope of the current audio source

    var draw = function () {
      var WIDTH = 1024;
      var HEIGHT = 360;
      drawVisual = requestAnimationFrame(draw.bind(this));

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(21, 21, 21)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(255, 0, 0)';

      canvasCtx.beginPath();

      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;

      for(var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(this.el.width, this.el.height/2);
      canvasCtx.stroke();
    };

    draw.call(this);
  }
});
