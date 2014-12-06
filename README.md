# jquery.revealer

Animate elements to and from display: none!

## Requirements

This plugin requires jQuery, and the jquery.trend.js plugin.

## Usage

Revealer doesn't actually change your element's styles--instead it adds classes
in a order that allows you to transition smoothly.

To show an element, the classes are applied in the following order:

```
add class: .revealer-prep-in
wait
add class: .revealer-animating-in
add class: .revealer-animating
wait
add class: .revealer-visible
remove class: .revealer-prep-in
wait
remove class: .revealer-animating-in
remove class: .revealer-animating
```

And to hide an element:

```
add class: .revealer-prep-out
wait
add class: .revealer-animating-out
add class: .revealer-animating
wait
remove class: .revealer-visible
remove class: .revealer-prep-out
wait
remove class: .revealer-animating-out
remove class: .revealer-animating
```

## Example

http://codepen.io/anon/pen/XJXKey
