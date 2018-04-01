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
$(document).ready(function() {
    $("table").wrap("<div class='table-responsive'></div>");
    $("table").addClass("table");
});

// responsive embed videos
$(document).ready(function() {
    $('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    $('iframe[src*="youtube.com"]').addClass('embed-responsive-item');
    $('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    $('iframe[src*="vimeo.com"]').addClass('embed-responsive-item');
});

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height(),
            bannerHeight  = $('.intro-header .container').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
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
                if (currentTop > (bannerHeight + 41)) {
                    $catalog.addClass('fixed');
                } else {
                    $catalog.removeClass('fixed');
                }
            });
    }
});
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