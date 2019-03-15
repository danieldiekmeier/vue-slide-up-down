# vue-slide-up-down

Like jQuery's [`slideUp`](http://api.jquery.com/slideup/) / [`slideDown`](http://api.jquery.com/slidedown/), but for [Vue](vuejs.org)!

Demo: https://codepen.io/danieldiekmeier/pen/YapGWq


## Installation

```sh
npm i vue-slide-up-down
```

Usage with Webpack or other module bundlers:

```js
import SlideUpDown from 'vue-slide-up-down'
// or
const SlideUpDown = require('vue-slide-up-down')

Vue.component('slide-up-down', SlideUpDown)
```

Or use the UMD build directly in your browser (the component is provided as `window.VueSlideUpDown`).

```html
<script type="text/javascript" src="node_modules/vuejs/dist/vue.min.js"></script>
<script type="text/javascript" src="node_modules/vue-slide-up-down/dist/vue-slide-up-down.umd.js"></script>
<script type="text/javascript">
  Vue.component('slide-up-down', VueSlideUpDown);
</script>
```


## Usage

The component takes three props:

- `active` (Boolean): Whether to show the component (`true`) or not (`false`)
- `duration` (Number): How long the animation is supposed to be, in milliseconds. Defaults to `500`.
- `tag` (String): Which HTML tag to use for the wrapper element. Defaults to `div`.

```html
<div class="MyContent">
  <h1>Always show this</h1>

  <slide-up-down :active="active" :duration="1000">
    Only show this if "active” is true
  </slide-up-down>
</div>
```

The component emits four Vue events: 

- `open-start`
- `open-end`
- `close-start`
- `close-end`

```html
<slide-up-down @close-end="console.log('done closing!')" />
```

### Custom `transition-timing-function`

If you want to use a different timing function, add some CSS for your `<slide-up-down>` element. (See `demo/index.html` for a full example.)

```html
<style>
  .wobbly-accordeon {
    transition-timing-function: cubic-bezier(0.195, 1.650, 0.435, -0.600);
  }
</style>

<slide-up-down class="wobbly-accordeon">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta omnis velit ab culpa, officia, unde nesciunt temporibus cum reiciendis distinctio.
</slide-up-down>
```
