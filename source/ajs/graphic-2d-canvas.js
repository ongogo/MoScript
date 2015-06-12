with (MO) {
   MO.FG2dCanvasContext = function FG2dCanvasContext(o) {
      o = RClass.inherits(this, o, FG2dContext);
      o._handle = null;
      o.construct = FG2dCanvasContext_construct;
      o.linkCanvas = FG2dCanvasContext_linkCanvas;
      o.setFont = FG2dCanvasContext_setFont;
      o.clear = FG2dCanvasContext_clear;
      o.drawLine = FG2dCanvasContext_drawLine;
      o.drawRectangle = FG2dCanvasContext_drawRectangle;
      o.drawText = FG2dCanvasContext_drawText;
      o.drawImage = FG2dCanvasContext_drawImage;
      o.drawBorderLine = FG2dCanvasContext_drawBorderLine;
      o.drawBorder = FG2dCanvasContext_drawBorder;
      o.drawGridImage = FG2dCanvasContext_drawGridImage;
      o.fillRectangle = FG2dCanvasContext_fillRectangle;
      o.toBytes = FG2dCanvasContext_toBytes;
      return o;
   }
   MO.FG2dCanvasContext_construct = function FG2dCanvasContext_construct() {
      var o = this;
      o.__base.FG2dContext.construct.call(o);
   }
   MO.FG2dCanvasContext_linkCanvas = function FG2dCanvasContext_linkCanvas(hCanvas) {
      var o = this;
      o.__base.FG2dContext.linkCanvas.call(o, hCanvas);
      if (hCanvas.getContext) {
         var handle = hCanvas.getContext('2d');
         if (!handle) {
            throw new TError(o, "Current browser can't support Context2D technique.");
         }
         o._handle = handle;
      }
      o._hCanvas = hCanvas;
   }
   MO.FG2dCanvasContext_setFont = function FG2dCanvasContext_setFont(font) {
      this._handle.font = font;
   }
   MO.FG2dCanvasContext_clear = function FG2dCanvasContext_clear(r, g, b, a, d) {
      var o = this;
      var handle = o._handle;
      var size = o._size;
      handle.clearRect(0, 0, size.width, size.height);
   }
   MO.FG2dCanvasContext_drawLine = function FG2dCanvasContext_drawLine(x1, y1, x2, y2, color, lineWidth) {
      var o = this;
      var handle = o._handle;
      handle.strokeStyle = color;
      handle.lineWidth = lineWidth;
      handle.moveTo(x1, y1);
      handle.lineTo(x2, y2);
      handle.stroke();
   }
   MO.FG2dCanvasContext_drawRectangle = function FG2dCanvasContext_drawRectangle(x, y, width, height, color, lineWidth) {
      var o = this;
      var handle = o._handle;
      handle.strokeStyle = color;
      handle.lineWidth = lineWidth;
      handle.strokeRect(x, y, width, height);
   }
   MO.FG2dCanvasContext_drawText = function FG2dCanvasContext_drawText(text, x, y, color) {
      var o = this;
      var handle = o._handle;
      handle.fillStyle = color;
      handle.fillText(text, x, y);
   }
   MO.FG2dCanvasContext_drawImage = function FG2dCanvasContext_drawImage(content, x, y) {
      var o = this;
      var handle = o._handle;
      var size = o._size;
      var data = null
      if (content.tagName == 'IMG') {
         data = content;
      } else if (RClass.isClass(content, FImage)) {
         data = content.image();
      } else {
         throw new TError(o, 'Unknown content type');
      }
      handle.drawImage(data, x, y, size.width, size.height);
   }
   MO.FG2dCanvasContext_drawBorderLine = function FG2dCanvasContext_drawBorderLine(x1, y1, x2, y2, borderLine) {
      var o = this;
      var handle = o._handle;
      handle.beginPath();
      handle.strokeStyle = borderLine.color;
      handle.lineWidth = borderLine.width;
      handle.moveTo(x1 + 0.5, y1 + 0.5);
      handle.lineTo(x2 + 0.5, y2 + 0.5);
      handle.stroke();
   }
   MO.FG2dCanvasContext_drawBorder = function FG2dCanvasContext_drawBorder(rectangle, border) {
      var o = this;
      var left = rectangle.left;
      var top = rectangle.top;
      var right = rectangle.left + rectangle.width - 1;
      var bottom = rectangle.top + rectangle.height - 1;
      o.drawBorderLine(left, bottom, left, top, border.left);
      o.drawBorderLine(left - 0.5, top, right + 0.5, top, border.top);
      o.drawBorderLine(right, top, right, bottom, border.right);
      o.drawBorderLine(left - 0.5, bottom, right + 0.5, bottom, border.bottom);
   }
   MO.FG2dCanvasContext_drawGridImage = function FG2dCanvasContext_drawGridImage(content, x, y, width, height, padding) {
      var o = this;
      var handle = o._handle;
      var data = null
      if (RClass.isClass(content, FImage)) {
         data = content.image();
      } else {
         throw new TError(o, 'Unknown content type');
      }
      var ssize = content.size();
      var sx = new Array();
      sx[0] = 0;
      sx[1] = padding.left;
      sx[2] = ssize.width - padding.right;
      var sy = new Array();
      sy[0] = 0;
      sy[1] = padding.top;
      sy[2] = ssize.height - padding.bottom;
      var dx = new Array();
      dx[0] = x;
      dx[1] = x + padding.left;
      dx[2] = width - padding.right;
      var dy = new Array();
      dy[0] = y;
      dy[1] = y + padding.top;
      dy[2] = height - padding.bottom;
      var w = new Array();
      w[0] = padding.left;
      w[1] = width - padding.left - padding.right;
      w[2] = padding.right;
      var h = new Array();
      h[0] = padding.top;
      h[1] = height - padding.top - padding.bottom;
      h[2] = padding.bottom;
      for (var i = 0; i < 9; i++) {
         var row = Math.floor(i / 3);
         var column = i % 3;
         if (h[row] > 0 && w[column] > 0) {
            handle.drawImage(data, sx[column], sy[row], w[column], h[row], dx[column], dy[row]);
         }
      }
   }
   MO.FG2dCanvasContext_fillRectangle = function FG2dCanvasContext_fillRectangle(x, y, width, height, color) {
      var o = this;
      var handle = o._handle;
      handle.fillStyle = color;
      handle.fillRect(x, y, width, height);
   }
   MO.FG2dCanvasContext_toBytes = function FG2dCanvasContext_toBytes() {
      var o = this;
      var size = o._size;
      return o._handle.getImageData(0, 0, size.width, size.height);
   }
}
