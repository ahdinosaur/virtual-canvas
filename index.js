var vdom = {
  diff: require('virtual-dom/diff'),
  patch: require('virtual-dom/patch'),
  createElement: require('virtual-dom/create-element')
}
var pull = require('pull-stream')
var rainbowPixels = require('rainbow-pixels')
var raf = require('pull-raf')
var sheetify = require('sheetify')
var virtualCanvas = require('../')

sheetify('./index.css', { global: true })
 
function render (pixels) {
  return virtualCanvas({ pixels: pixels })
}

pull(
  rainbowPixels({
    shape: [
      Math.floor(document.body.clientWidth / 16),
      Math.floor(document.body.clientHeight / 16)
    ]
  }),
  pullVdom(render, vdom, document.querySelector('main'))
)

function pullVdom (render, vdom, container) {
  var initialized = false
  var root, tree

  return pull(
    raf(),
    pull.map(function (state) {
      // init
      if (!initialized) {
        tree = render(state)
        root = vdom.createElement(tree)
        container.appendChild(root)
        initialized = true
        return
      }

      // update
      var nextTree = render(state)
      var patches = vdom.diff(tree, nextTree)
      root = vdom.patch(root, patches)
      tree = nextTree
    }),
    pull.drain()
  )
}
