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

Vue.component('vue-slide-up-down', VueSlideUpDown)
```

Or use the UMD build directly in your browser:

```html
<script type="text/javascript" src="node_modules/vuejs/dist/vue.min.js"></script>
<script type="text/javascript" src="node_modules/vue-slide-up-down/dist/vue-slide-up-down.umd.js"></script>
<script type="text/javascript">
  Vue.component('vue-slide-up-down', VueSlideUpDown);
</script>
```

## Usage

The component takes two props:

- `active` (Boolean): Whether to show the component (`true`) or not (`false`)
- `duration` (Number): How long the animation is supposed to be, in milliseconds. Defaults to `500`.

## Example

```html
<div class="MyContent">
  <h1>Always show this</h1>
  <vue-slide-up-down :active="active" :duration="1000">
    Only show this if "active” is true
  </vue-slide-up-down>
</div>
```

## Also

This currently works by showing the element, measuring the height, setting the height back to 0, and then CSS-transitioning to the target height. This works _okay_, but is not very performant. If you have other ideas how to make this extremely smooth and good looking, feel free to send issues or pull requests.
