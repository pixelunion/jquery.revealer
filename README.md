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

####`.revealer-animating` 
Apply your initial transition state (e.g. `opacity: 0;`) as well as your `transition:` property with this class.

####`.revealer-visible` 
Apply your final transition state (e.g. `opacity: 1`) to this state.

### caveat
We assume an inital default state of `display: none`. Therefore the above classes should also include a `display: block;` property.

### Different transitions on in and out
To apply different transitions for enter and leave, use `.revealer-animating-in` and `.revealer-animating-out` to declare different initial transition states. `.revealer-visible` will then include the final state for both in and out.

## Example

```
.element-to-reveal {
  display: none;
  
  &.revealer-animating,
  &.revealer-visible {
    display: block;
  }

  // initial state for enter transition
  &.revealer-animating-in {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  // initial state for leave transition
  &.revealer-animating-out {
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  // final states for both in and out
  &.revealer-visible {
    transform: translateX(0);
    opacity: 1;
  }
}
```

###Or some working code (_out of date!_):

http://codepen.io/anon/pen/XJXKey
