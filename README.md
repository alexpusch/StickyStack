StickyStack
=============
## Make you reading context, titles, and subtitles stick while user scroll the page - [Demo](http://alexpusch.github.io/StickyStack)

### Usage

#### Plain use:

```html
<script type="text/javascript" src='stickyStack.min.js'></script>
```

#### Browserify, Webpack, etc.
```js
StickyStack = require('StickyStack')
```

#### Make stuff sticky
```js
// make .header stick at the top of the page, .title, and .subtitle to follow
var stickyStack = new StickyStack(['.header','.title', '.subtitle'])
```
```js
// clean up when done
stickyStack.destroy()
```

**Important:**
Sticky stack makes things sticky. You still have to style the elements to make it look good.
For example:
```css
// make sure the sticky elements occlude the content behind them.
.sticky-elements{
  width: 100%;
  background: white;
}
```

### API
#### Constructor ```StickyStack([first level elements, second level elements, ... ], options)```
```js
var stickyStack = new StickyStack(['.title', '.subtitle', 'h3'])
```
* elements[array/string] - an array of elements, grouped by desired level in stickiness stack. Each element can be
  * CSS selector for desired elements
  * DOM element
  * Array of DOM elements
* options:
  * offset: the initial offset of the sticky stack. Distance from the head of the parent object

#### ```StickyStack.prototype.refresh()```
Recalculate and reposition all elements. Use this after a change in the page have changed the horizontal positioning of elements.

#### ```StickyStack.prototype.destroy()```
Removes sticky stack effect from page.

