var t = require('tcomb')
var pixelsToCanvas = require('pixels-canvas')

// widget docs
// https://github.com/Matt-Esch/virtual-dom/blob/master/docs/widget.md

module.exports = CanvasWidget

function CanvasWidget (options) {
  if (!(this instanceof CanvasWidget)) {
    return new CanvasWidget(options)
  }
  this.pixels = options.pixels
}

CanvasWidget.prototype.type = "Widget"
CanvasWidget.prototype.init = function () {
  var canvas = document.createElement('canvas')
  this.render = pixelsToCanvas(canvas)
  return canvas
}
CanvasWidget.prototype.update = function(previous, domNode) {
  this.render = this.render || previous.render

  t.assert(!t.Nil.is(this.pixels), 'options.pixels should be defined')
  this.render(this.pixels)
}
CanvasWidget.prototype.destroy = function(domNode){}
