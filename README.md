# virtual-canvas

canvas element for virtual-dom

```shell
npm install --save virtual-canvas
```

## usage

### `createCanvas = require('virtual-canvas')`

### `tree = createCanvas(options)`

- `options.pixels`: required [pixels](https://github.com/livejs/ndpixels)

## example

```js
var hyperx = require('hyperx')
var vdom = require('virtual-dom')
var hx = hyperx(vdom.h)
var createCanvas = require('virtual-webtorrent')

var tree = hx`
  <section>
    ${createCanvas({ pixels: pixels })}
  </section>
`
document.body.appendChild(vdom.create(tree))
```

for a full example, see [./example](http://ahdinosaur.github.io/virtual-canvas)

## License

The Apache License

Copyright &copy; 2016 Michael Williams (@ahdinosaur)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
