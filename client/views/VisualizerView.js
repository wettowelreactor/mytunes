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

    var freqDomain = new Float32Array(analyser.frequencyBinCount);
    analyser.getFloatFrequencyData(freqDomain);


    var draw = function () {
      var WIDTH = 1024;
      var HEIGHT = 360;
      drawVisual = requestAnimationFrame(draw.bind(this));
      var freqDomain = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(freqDomain);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(21, 21, 21)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(255, 255, 255)';

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

      for (var i = 0; i < analyser.frequencyBinCount; i++) {
        var value = freqDomain[i];
        var percent = value / 256;
        var height = HEIGHT * percent;
        var offset = HEIGHT - height - 1;
        var barWidth = WIDTH/analyser.frequencyBinCount;
        var hue = i/analyser.frequencyBinCount * 360;
        canvasCtx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        canvasCtx.fillRect(i * barWidth, offset, barWidth, height);
      }

      canvasCtx.lineTo(this.el.width, this.el.height/2);
      canvasCtx.stroke();
    };

    draw.call(this);
  }
});
