/*
 * jQuery plugin allowing showing tooltips over truncated text.
 * Copyright © 2015 by Eugene Lyushenko. MIT Licensed.
 */

;(function($, window, document, undefined) {
  "use strict";

  // Add new selector :truncated (for 'overflow' or 'text-overflow').
  // This will return only elements that are overflowing.
  $.expr[':'].truncated = function(el) {
    var $el = $(el);
    var styles = { display: 'inline', width: 'auto', visibility: 'hidden' };
    var $clone = $el.clone().css(styles).appendTo('body');
    var cloneWidth = $clone.width();
    $clone.remove();
    return cloneWidth > $el.width();
  };

  // Plugin
  var HoverTruncated = function(el, options) {
    this.$el      = $(el);
    this.options  = options;
    this.$tooltip = null;
    this.init();
    return this;
  };

  HoverTruncated.VERSION  = '1.0.1';
  HoverTruncated.DEFAULTS = {
    dataAttr:    'hover-truncated',
    className:   'hover-truncated',
    tooltipText: null,
    offsetX:     10,
    offsetY:     10
  };

  HoverTruncated.prototype.init = function() {
    var self = this;
    this.$el.on({
      mouseenter: function() {
        self.show();
      },
      mouseleave: function() {
        self.hide();
      }
    });
  };

  HoverTruncated.prototype.getTooltipText = function() {
    var text = this.options.tooltipText;
    if (text) {
      // strip html
      var div = document.createElement('div');
      div.innerHTML = text;
      text = $(div).text();
    } else {
      text = this.$el.text();
    }
    return text;
  };

  HoverTruncated.prototype.show = function() {
    // re-init if destroyed
    if (this.isDestroyed()) this.init();
    // only one tooltip allowed
    if (this.$tooltip) return;
    var $el  = this.$el,
        text = this.getTooltipText();
    // append tooltip
    var $tooltip = $(document.createElement('div'))
      .addClass(this.options.className)
      .html(text)
      .appendTo('body');
    // apply positioning
    var top  = ($el.offset().top  - $tooltip.height() - this.options.offsetY) + 'px';
    var left = ($el.offset().left - this.options.offsetX) + 'px';
    $tooltip.css({ top: top, left: left });
    this.$tooltip = $tooltip;
  };

  HoverTruncated.prototype.hide = function() {
    if (this.inDom()) {
      this.$tooltip.remove();
    }
    this.$tooltip = null;
  };

  HoverTruncated.prototype.update = function(newText) {
    this.options.tooltipText = newText;
  };

  HoverTruncated.prototype.inDom = function() {
    var $tooltip = this.$tooltip;
    return $tooltip &&
           $tooltip.length &&
           $.contains($tooltip[0].ownerDocument.documentElement, $tooltip[0]);
  };

  HoverTruncated.prototype.isDestroyed = function() {
    return !this.$el.data(this.options.dataAttr);
  };

  HoverTruncated.prototype.destroy = function() {
    this.$el.off('mouseenter mouseleave').removeData(this.options.dataAttr);
    this.hide();
  };

  // Usage:
  // $('.selector').HoverTruncated([option]);
  // option - show, hide, destroy, update
  function Plugin(option) {
    var args = Array.prototype.slice.call(arguments, 1);
    // display tooltip only over truncated elements
    return this.filter(':truncated').each(function() {
      var $el     = $(this);
      var options = $.extend({}, HoverTruncated.DEFAULTS,
        (typeof option == 'object' && option) || {});
      var instance = $el.data(options.dataAttr);

      if (!instance) {
        if (option === 'destroy') return;
        instance = new HoverTruncated(this, options);
        $el.data(options.dataAttr, instance);
      }

      if (typeof option == 'string' && /destroy|show|hide|update/.test(option)) {
        instance[option].apply(instance, args);
      }
    });
  }

  var old = $.fn.hoverTruncated;

  $.fn.hoverTruncated             = Plugin;
  $.fn.hoverTruncated.Constructor = HoverTruncated;

  $.fn.hoverTruncated.noConflict = function() {
    $.fn.hoverTruncated = old;
    return this;
  };

}).call(this, jQuery, window, document);
