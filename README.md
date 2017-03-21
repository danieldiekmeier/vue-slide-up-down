# vue-slide-up-down

Like jQuery's [`slideUp`](http://api.jquery.com/slideup/) / [`slideDown`](http://api.jquery.com/slidedown/), but for [Vue](vuejs.org)!

## Installation

For now: Put [this file](https://raw.githubusercontent.com/danieldiekmeier/vue-slide-up-down/master/src/SlideUpDown.vue?token=ACAFHsn9ZlFUeXemiXVhMVCjNcvfW8LRks5Y2nfYwA%3D%3D) into your project.

Maybe I'll put this on npm soon? I don't know.

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
