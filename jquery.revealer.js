/*!
 * Revealer 2.0.0
 *
 * Copyright 2015, Pixel Union - http://pixelunion.net
 * Released under the MIT license
 */
(function($){
  // check for trend event (make sure jquery.trend is included)
  if (typeof $.event.special.trend !== "object") {
    console.warn("Please make sure jquery.trend is included! Otherwise revealer won't work.");
  }

  // Simple requestAnimationFrame polyfill
  var raf = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function(fn) { window.setTimeout(fn, 1000/60); }


  // Public API
  var methods = {
    isVisible: function(el) {
      return !!el.data("revealer-visible");
    },

    show: function(el, force) {
      // Check state
      if (methods.isVisible(el)) {
        el.removeClass("animating animating-in");
        el.off("revealer-animating revealer-show");
        return;
      }

      // Remove previous event listeners
      el.data("revealer-visible", true);
      el.off("trend");

      if (force) {
        el.addClass("visible");
        el.trigger("revealer-show");
        return;
      }

      raf(function(){
        // Start animation state transition
        el.addClass("animating animating-in");
        el.trigger("revealer-animating");

        raf(function(){
          el.addClass("visible");

          el.one("trend", function(){
            el.removeClass("animating animating-in");
            el.trigger("revealer-show");
          });
        });
      });
    },

    hide: function(el, force) {
      // Check state
      if (!methods.isVisible(el)) {
        el.removeClass("animating animating-out visible");
        el.off("revealer-animating revealer-hide");
        return;
      }

      // Remove previous event listeners
      el.data("revealer-visible", false);
      el.off("trend");

      if (force) {
        el.removeClass("visible");
        el.trigger("revealer-hide");
        return;
      }

      raf(function(){
        el.addClass("animating animating-out");
        el.trigger("revealer-animating");

        raf(function(){
          el.removeClass("visible");

          el.one("trend", function(){
            el.removeClass("animating animating-in animating-out");
            el.trigger("revealer-hide");
          });
        });
      });
    },

    toggle: function(el, force) {
      if (methods.isVisible(el)) {
        methods.hide(el, force);
      } else {
        methods.show(el, force);
      }
    }
  };

  // jQuery plugin
  $.fn.revealer = function(method, force) {
    // Get action
    var action = methods[method || "toggle"];
    if (!action) return this;

    // Run action
    if (method === "isVisible") {
      return action(this);
    }

    return this.each(function(){
      action($(this), force);
    });
  };
})(jQuery);
