# vue-slide-up-down

Like jQuery's [`slideUp`](http://api.jquery.com/slideup/) / [`slideDown`](http://api.jquery.com/slidedown/) / [`slideToggle`](http://api.jquery.com/slidetoggle/), but for [Vue](https://vuejs.org)!

Demo: https://codepen.io/danieldiekmeier/pen/YapGWq

## Installation

```sh
npm i vue-slide-up-down
```

```js
import { createApp } from 'vue'
import SlideUpDown from 'vue-slide-up-down'

const app = createApp({ ... })
app.component('slide-up-down', SlideUpDown)
```

> [!NOTE]
> Version 3 of this package is only compatible with Vue 3. If you're still on Vue 2, install the previous version with `npm i vue-slide-up-down@2`

## Usage

```html
<div class="MyContent">
  <h1>Always show this</h1>

  <slide-up-down :active="active" :duration="1000">
    Only show this if "active” is true
  </slide-up-down>
</div>
```

The component takes four props:

- `active` (Boolean, required): Whether to show the component (`true`) or not (`false`)
- `duration` (Number, optional): How long the animation is supposed to be, in milliseconds. Defaults to `500`.
- `tag` (String, optional): Which HTML tag to use for the wrapper element. Defaults to `div`.
- `use-hidden` (Boolean, optional): Whether to apply the `hidden` attribute to the element when closed. Defaults to `true`. This hides the component from the screen and from assistive devices. The internal elements of the component are completely invisible, and can't be focused (by a keyboard or assistive device). (This is probably what you want!)

  If you really need to, you can set this property to `false` to _not_ use the `hidden` attribute. For example if you want to have a `min-height` on your component and not actually transition to a height of `0`.

  **⚠️ Be aware that this can create accessibility issues**, specifically for users with a keyboard or screen reader. Even though the component may _appear_ hidden, focusable elements within the component are still able to be accessed through keyboard navigation.

The component emits four events:

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
  .wobbly-accordion {
    transition-timing-function: cubic-bezier(0.195, 1.65, 0.435, -0.6);
  }
</style>

<slide-up-down class="wobbly-accordion">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta omnis velit
  ab culpa, officia, unde nesciunt temporibus cum reiciendis distinctio.
</slide-up-down>
```
