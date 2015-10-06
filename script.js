var canvasApp = (function() {

  var cv = document.createElement('canvas');
  cv.width = 300;
  cv.height = 300;
  cv.id = 'canvas';

  document.body.appendChild(cv);

  cv.style.backgroundColor = 'white';
  cv.style.border = '1px solid #ccc';

  var context = cv.getContext('2d');

  var draw = (function(x, y) {
    var posX = []
      , posY = []
      , drag = [];

    var bounds = function(x, y, d) {
      posX.push(x);
      posY.push(y);
      drag.push(d);
    };

    var paint = function() {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      context.strokeStyle = '#000';
      context.lineJoin = 'round';
      context.lineWidth = 5;

      for(var i = 0, len = posX.length; i < len; i++) {
        context.beginPath();
        
        if(drag[i] && i)
          context.moveTo(posX[i-1], posY[i-1]);
        else
          context.moveTo(posX[i] - 1, posY[i]);

        context.lineTo(posX[i], posY[i]);
        context.closePath();
        context.stroke();

      }
    };
    
    return {
      bounds: bounds
      , paint: paint
    }
  })();

  var mouseEvents = function() {
    var paint = false;
    
    cv.onmousedown = function(e) {
      paint = true;
      draw.bounds(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    };

    cv.onmouseup = function() {
      paint = false;
    };

    cv.onmousemove = function(e) {
      if(paint) {
        draw.bounds(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        draw.paint();
      }
    };
  };

  var saveTo = function() {
    var img = cv.toDataURL('image/png');
    var req = new XMLHttpRequest();
    req.open('POST', 'save.php', true);
    req.send('img='+ img);
  };

  (function() {
    mouseEvents();
    document.getElementById('save').onclick = saveTo;
  }());
})();
