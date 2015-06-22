/*!
 * Revealer 1.1.0
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
    isOpen: function(el) {
      return !!el.data("revealer-open");
    },

    show: function(el) {
      // Check state
      if (methods.isOpen(el)) {
        el.removeClass("revealer-animating revealer-animating-in");
        el.off("revealer-animating revealer-show");
        return;
      }

      // Remove previous event listeners
      el.data("revealer-open", true);
      el.off("trend");

      raf(function(){
        // Start animation state transition
        el.addClass("revealer-animating revealer-animating-in");
        el.trigger("revealer-animating");

        raf(function(){
          el.addClass("revealer-visible");

          el.one("trend", function(){
            el.removeClass("revealer-animating revealer-animating-in");
            el.trigger("revealer-show");
          });
        });
      });
    },

    hide: function(el) {
      // Check state
      if (!methods.isOpen(el)) {
        el.removeClass("revealer-animating revealer-animating-out revealer-visible");
        el.off("revealer-animating revealer-hide");
        return;
      }

      // Remove previous event listeners
      el.data("revealer-open", false);
      el.off("trend");

      raf(function(){
        el.addClass("revealer-animating revealer-animating-out");
        el.trigger("revealer-animating");

        raf(function(){
          el.removeClass("revealer-visible");

          el.one("trend", function(){
            el.removeClass("revealer-animating revealer-animating-in revealer-animating-out");
            el.trigger("revealer-hide");
          });
        });
      });
    },

    toggle: function(el) {
      if (methods.isOpen(el)) {
        methods.hide(el)
      } else {
        methods.show(el);
      }
    },

    // set element state without running any animations
    force: function(el, forceMethod) {
      if (forceMethod === "show") {
        el.data("revealer-open", true);
        el.addClass("revealer-visible");
        el.trigger("revealer-show");
      } else if (forceMethod === "hide") {
        el.data("revealer-open", false);
        el.removeClass("revealer-visible");
        el.trigger("revealer-hide");
      } else if (forceMethod === "toggle") {
        el.data("revealer-open", !el.data("revealer-open"));
        el.toggleClass("revealer-visible");
        if (methods.isOpen(el)) {
          el.trigger("revealer-hide");
        } else {
          el.trigger("revealer-show");
        }
      } else {
        throw new Error("invalid force method.");
      }
    }
  };

  // jQuery plugin
  $.fn.revealer = function(method, forceMethod) {

    // Get action
    var action = methods[method || "toggle"];
    if (!action) return this;

    // Run action
    if (method === "isOpen") {
      return action(this);
    }

    if (method === "force") {
      if (!forceMethod) {
        throw new Error("You must declare a method when using force.");
        return;
      }
      return this.each(function(){
        action($(this), forceMethod);
      });
    }

    return this.each(function(){
      action($(this));
    });
  };
})(jQuery);
