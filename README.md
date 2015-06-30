# jquery.revealer

Animate elements to and from display: none!

## Requirements

This plugin requires jQuery, and the [jquery.trend.js](https://github.com/PixelUnion/jquery.trend) plugin.

## Usage

```
$('button.show').on('click', function() {
  $('#my-element').revealer('show');
});

$('button.hide').on('click', function() {
  $('#my-element').revealer('hide');
});

$('button.toggle').on('click', function() {
  $('#my-element').revealer('toggle');
});
```

Revealer doesn't actually change your element's styles--instead it adds classes in an order that allows you to transition smoothly.

####`.animating`
Apply your initial transition state (e.g. `opacity: 0;`) as well as your `transition:` property with this class.

####`.visible`
Apply your final transition state (e.g. `opacity: 1`) to this state.

### caveat
We assume an inital default state of `display: none`. Therefore the above classes should also include a `display: block;` property.

### Different transitions on in and out
To apply different transitions for enter and leave, use `.animating-in` and `.animating-out` to declare different initial transition states. `.visible` will then include the final state for both in and out.

### Setting a state without a transition
To skip the transitioning and force a specific display state, you may pass `true` as the second parameter to `show`, `hide`, or `toggle`:

```
$('.el').revealer('show', true);
```

### Get the current state
To check if an element is currently visible, use the `isVisible` function:

```
var visible = $('.el').revealer('isVisible');
```

## Example

```
.element-to-reveal {
  display: none;

  &.animating,
  &.visible {
    display: block;
  }

  // initial state for enter transition
  &.animating-in {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  // initial state for leave transition
  &.animating-out {
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  // final states for both in and out
  &.visible {
    transform: translateX(0);
    opacity: 1;
  }
}
```

### Or some working code:

http://codepen.io/jnorth/pen/pJpGjj
