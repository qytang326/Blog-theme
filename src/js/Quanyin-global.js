/*! Quanyin Blog Theme v2.0.0 (https://qytang326.github.io) || Copyright 2018 Quanyin Tang <qytang326@gmail.com> */
/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2015 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

/*!
* Quanyin Blog v1.0.0 (http://startbootstrap.com)
* Copyright 2017 @Quanyin
* Licensed under Apache 2.0
*/

// Tooltip Init
// Unuse by Quanyin since V1.0: Titles now display by default so there is no need for tooltip
// $(function() {
//     $("[data-toggle='tooltip']").tooltip();
// });


// make all images responsive
/*
 * Unuse by Quanyin
 * actually only Portfolio-Pages can't use it and only post-img need it.
 * so I modify the _layout/post and CSS to make post-img responsive!
 */
// $(function() {
//  $("img").addClass("img-responsive");
// });

// responsive tables
$(document).ready(function () {
    $("table").wrap("<div class='table-responsive'></div>");
    $("table").addClass("table");
});

// responsive embed videos
$(document).ready(function () {
    $('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    $('iframe[src*="youtube.com"]').addClass('embed-responsive-item');
    $('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    $('iframe[src*="vimeo.com"]').addClass('embed-responsive-item');
});

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function ($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height(),
            bannerHeight = $('.intro-header .container').height();
        $(window).on('scroll', {
            previousTop: 0
        }, function () {
            var currentTop = $(window).scrollTop(),
                $catalog = $('.side-catalog');

            //check if user is scrolling up by mouse or keyborad
            if (currentTop < this.previousTop) {
                //if scrolling up...
                if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                    $('.navbar-custom').addClass('is-visible');
                } else {
                    $('.navbar-custom').removeClass('is-visible is-fixed');
                }
            } else {
                //if scrolling down...
                $('.navbar-custom').removeClass('is-visible');
                if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
            }
            this.previousTop = currentTop;

            //adjust the appearance of side-catalog
            $catalog.show();
            if (currentTop > bannerHeight + 41) {
                $catalog.addClass('fixed');
            } else {
                $catalog.removeClass('fixed');
            }
        });
    }
});
var $body = document.body;
var $toggle = document.querySelector(".navbar-toggle");
var $navbar = document.querySelector("#Quanyinblog_navbar");
var $collapse = document.querySelector(".navbar-collapse");
var __QuanyinNav__ = {
    close: function close() {
        $navbar.className = " ";

        setTimeout(function () {

            if ($navbar.className.indexOf("in") < 0) {
                $collapse.style.height = "0px";
            }
        }, 400);
    },
    open: function open() {
        $collapse.style.height = "auto";
        $navbar.className += " in";
    }
};

$toggle.addEventListener("click", function (e) {
    if ($navbar.className.indexOf("in") > 0) {
        __QuanyinNav__.close();
    } else {
        __QuanyinNav__.open();
    }
});

document.addEventListener("click", function (e) {
    if (e.target == $toggle) return;
    if (e.target.className == "icon-bar") return;
    __QuanyinNav__.close();
});
/**
 * SnackBar.js
 *
 * This small component is borrowed from
 * https://codepen.io/wibblymat/pen/avAjq
 */

var createSnackbar = function () {
  // Any snackbar that is already shown
  var previous = null;

  /*
  <div class="paper-snackbar">
    <button class="action">Dismiss</button>
    This is a longer message that won't fit on one line. It is, inevitably, quite a boring thing. Hopefully it is still useful.
  </div>
  */

  return function (config) {
    var message = config.message,
        actionText = config.actionText,
        action = config.action,
        duration = config.duration;

    if (previous) {
      previous.dismiss();
    }
    var snackbar = document.createElement('div');
    snackbar.className = 'paper-snackbar';
    snackbar.dismiss = function () {
      this.style.opacity = 0;
    };
    var text = document.createTextNode(message);
    snackbar.appendChild(text);
    if (actionText) {
      if (!action) {
        action = snackbar.dismiss.bind(snackbar);
      }
      var actionButton = document.createElement('button');
      actionButton.className = 'action';
      actionButton.innerHTML = actionText;
      actionButton.addEventListener('click', action);
      snackbar.appendChild(actionButton);
    }
    setTimeout(function () {
      if (previous === this) {
        previous.dismiss();
      }
    }.bind(snackbar), duration || 5000);

    snackbar.addEventListener('transitionend', function (event, elapsed) {
      if (event.propertyName === 'opacity' && this.style.opacity == 0) {
        this.parentElement.removeChild(this);
        if (previous === this) {
          previous = null;
        }
      }
    }.bind(snackbar));

    previous = snackbar;
    document.body.appendChild(snackbar);
    // In order for the animations to trigger, I have to force the original style to be computed, and then change it.
    getComputedStyle(snackbar).bottom;
    snackbar.style.bottom = '0px';
    snackbar.style.opacity = 1;
  };
}();
/* ===========================================================
 * sw-registration.js
 * ===========================================================
 * Copyright 2017 @Quanyin
 * Licensed under Apache 2.0
 * Register service worker.
 * ========================================================== */

/* SW Version Upgrade Ref: <https://youtu.be/Gb9uI67tqV0> */

function handleRegistration(registration) {
  console.log('Service Worker Registered. ', registration);
  /**
   * ServiceWorkerRegistration.onupdatefound
   * The service worker registration's installing worker changes.
   */
  registration.onupdatefound = function (e) {
    var installingWorker = registration.installing;
    installingWorker.onstatechange = function (e) {
      if (installingWorker.state !== 'installed') return;
      if (navigator.serviceWorker.controller) {
        console.log('SW is updated');
      } else {
        console.log('A Visit without previous SW');
        createSnackbar({
          message: 'App ready for offline use.',
          duration: 3000
        });
      }
    };
  };
}

if (navigator.serviceWorker) {
  /*  For security reasons, a service worker can only control the pages */
  /* that are in the same directory level or below it. That's why we put sw.js at ROOT level. */
  navigator.serviceWorker.register('/sw.min.js').then(function (registration) {
    return handleRegistration(registration);
  }).catch(function (error) {
    console.log('ServiceWorker registration failed: ', error);
  });

  /* register message receiver */
  /*  https://dbwriteups.wordpress.com/2015/11/16/service-workers-part-3-communication-between-sw-and-pages/ */
  navigator.serviceWorker.onmessage = function (e) {
    console.log('SW: SW Broadcasting:', event);
    var data = e.data;

    if (data.command == "UPDATE_FOUND") {
      console.log("UPDATE_FOUND_BY_SW", data);
      createSnackbar({
        message: "Content updated.",
        actionText: "refresh",
        action: function action(e) {
          location.reload();
        }
      });
    }
  };
}
var bszCaller, bszTag;!function () {
  var c,
      d,
      _e,
      a = !1,
      b = [];ready = function ready(c) {
    return a || "interactive" === document.readyState || "complete" === document.readyState ? c.call(document) : b.push(function () {
      return c.call(this);
    }), this;
  }, d = function d() {
    for (var a = 0, c = b.length; c > a; a++) {
      b[a].apply(document);
    }b = [];
  }, _e = function e() {
    a || (a = !0, d.call(window), document.removeEventListener ? document.removeEventListener("DOMContentLoaded", _e, !1) : document.attachEvent && (document.detachEvent("onreadystatechange", _e), window == window.top && (clearInterval(c), c = null)));
  }, document.addEventListener ? document.addEventListener("DOMContentLoaded", _e, !1) : document.attachEvent && (document.attachEvent("onreadystatechange", function () {
    /loaded|complete/.test(document.readyState) && _e();
  }), window == window.top && (c = setInterval(function () {
    try {
      a || document.documentElement.doScroll("left");
    } catch (b) {
      return;
    }_e();
  }, 5)));
}(), bszCaller = { fetch: function fetch(a, b) {
    var c = "BusuanziCallback_" + Math.floor(1099511627776 * Math.random());window[c] = this.evalCall(b), a = a.replace("=BusuanziCallback", "=" + c), scriptTag = document.createElement("SCRIPT"), scriptTag.type = "text/javascript", scriptTag.defer = !0, scriptTag.src = a, document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);
  }, evalCall: function evalCall(a) {
    return function (b) {
      ready(function () {
        try {
          a(b), scriptTag.parentElement.removeChild(scriptTag);
        } catch (c) {
          bszTag.hides();
        }
      });
    };
  } }, bszCaller.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback", function (a) {
  bszTag.texts(a), bszTag.shows();
}), bszTag = { bszs: ["site_pv", "page_pv", "site_uv"], texts: function texts(a) {
    this.bszs.map(function (b) {
      var c = document.getElementById("busuanzi_value_" + b);c && (c.innerHTML = a[b]);
    });
  }, hides: function hides() {
    this.bszs.map(function (a) {
      var b = document.getElementById("busuanzi_container_" + a);b && (b.style.display = "none");
    });
  }, shows: function shows() {
    this.bszs.map(function (a) {
      var b = document.getElementById("busuanzi_container_" + a);b && (b.style.display = "inline");
    });
  } };
/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
/* This file is meant as a standalone workflow for
- testing support for link[rel=preload]
- enabling async CSS loading in browsers that do not support rel=preload
- applying rel preload css once loaded, whether supported or not.
*/
(function( w ){
    "use strict";
    // rel=preload support test
    if( !w.loadCSS ){
        w.loadCSS = function(){};
    }
    // define on the loadCSS obj
    var rp = loadCSS.relpreload = {};
    // rel=preload feature support test
    // runs once and returns a function for compat purposes
    rp.support = (function(){
        var ret;
        try {
            ret = w.document.createElement( "link" ).relList.supports( "preload" );
        } catch (e) {
            ret = false;
        }
        return function(){
            return ret;
        };
    })();

    // if preload isn't supported, get an asynchronous load by using a non-matching media attribute
    // then change that media back to its intended value on load
    rp.bindMediaToggle = function( link ){
        // remember existing media attr for ultimate state, or default to 'all'
        var finalMedia = link.media || "all";

        function enableStylesheet(){
            link.media = finalMedia;
        }

        // bind load handlers to enable media
        if( link.addEventListener ){
            link.addEventListener( "load", enableStylesheet );
        } else if( link.attachEvent ){
            link.attachEvent( "onload", enableStylesheet );
        }

        // Set rel and non-applicable media type to start an async request
        // note: timeout allows this to happen async to let rendering continue in IE
        setTimeout(function(){
            link.rel = "stylesheet";
            link.media = "only x";
        });
        // also enable media after 3 seconds,
        // which will catch very old browsers (android 2.x, old firefox) that don't support onload on link
        setTimeout( enableStylesheet, 3000 );
    };

    // loop through link elements in DOM
    rp.poly = function(){
        // double check this to prevent external calls from running
        if( rp.support() ){
            return;
        }
        var links = w.document.getElementsByTagName( "link" );
        for( var i = 0; i < links.length; i++ ){
            var link = links[ i ];
            // qualify links to those with rel=preload and as=style attrs
            if( link.rel === "preload" && link.getAttribute( "as" ) === "style" && !link.getAttribute( "data-loadcss" ) ){
                // prevent rerunning on link
                link.setAttribute( "data-loadcss", true );
                // bind listeners to toggle media back
                rp.bindMediaToggle( link );
            }
        }
    };

    // if unsupported, run the polyfill
    if( !rp.support() ){
        // run once at least
        rp.poly();

        // rerun poly on an interval until onload
        var run = w.setInterval( rp.poly, 500 );
        if( w.addEventListener ){
            w.addEventListener( "load", function(){
                rp.poly();
                w.clearInterval( run );
            } );
        } else if( w.attachEvent ){
            w.attachEvent( "onload", function(){
                rp.poly();
                w.clearInterval( run );
            } );
        }
    }


    // commonjs
    if( typeof exports !== "undefined" ){
        exports.loadCSS = loadCSS;
    }
    else {
        w.loadCSS = loadCSS;
    }
}( typeof global !== "undefined" ? global : this ) );
window.onscroll = function () {
    var goTop = document.getElementsByClassName("back2top");
    if (goTop.length > 0) {
        goTop[0].style.display = document.documentElement.scrollTop >= 300 || document.body.scrollTop >= 300 ? 'block' : 'none';
        goTop[0].onclick = function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };
    }
};
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (<none>)
 * Config saved to config.json and <none>
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
