var Tc = require('tcomb')
var pixelsToCanvas = require('pixels-canvas')
var Ndpixels = require('ndpixels')

// widget docs
// https://github.com/Matt-Esch/virtual-dom/blob/master/docs/widget.md

module.exports = CanvasWidget

function CanvasWidget (options) {
  if (!(this instanceof CanvasWidget)) {
    return new CanvasWidget(options)
  }

  Tc.assert(!Tc.Nil.is(options.pixels), 'options.pixels should be defined')
  this.pixels = Ndpixels(options.pixels)
  this.pixels = options.pixels
}

CanvasWidget.prototype.type = "Widget"
CanvasWidget.prototype.init = function () {
  var canvas = document.createElement('canvas')
  this.render = pixelsToCanvas(canvas)
  this.render(this.pixels)
  return canvas
}
CanvasWidget.prototype.update = function (previous, domNode) {
  this.render = this.render || previous.render
  this.render(this.pixels)
}
CanvasWidget.prototype.destroy = function (domNode) {}
