var Tc = require('tcomb')
var pixelsToCanvas = require('pixels-canvas')
var Ndpixels = require('ndpixels')
var domEvents = require('@f/dom-events')

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
  assignDomEvents(this, options)
}

CanvasWidget.prototype.type = "Widget"
CanvasWidget.prototype.init = function () {
  var canvas = document.createElement('canvas')
  this.render = pixelsToCanvas(canvas)
  this.render(this.pixels)
  assignDomEvents(canvas, this)
  return canvas
}
CanvasWidget.prototype.update = function (previous, domNode) {
  this.render = this.render || previous.render
  this.render(this.pixels)
  assignDomEvents(domNode, this)
}
CanvasWidget.prototype.destroy = function (domNode) {}

function assignDomEvents (target, source) {
  for (var i = 0; i < domEvents.length; ++i) {
    var eventName = 'on' + domEvents[i]
    if (source[eventName]) {
      target[eventName] = source[eventName]
    }
  }
}
