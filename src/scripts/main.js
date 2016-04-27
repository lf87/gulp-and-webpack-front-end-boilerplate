// Strict Mode is a new feature in ECMAScript 5 that allows you to place a program, or a function, in a "strict" operating context.
// This strict context prevents certain actions from being taken and throws more exceptions.
// And:

// Strict mode helps out in a couple ways:

// It catches some common coding bloopers, throwing exceptions.
// It prevents, or throws errors, when relatively "unsafe" actions are taken (such as gaining access to the global object).
// It disables features that are confusing or poorly thought out.

// When the below is set to true, the comment below enables use strict globally

/*jshint strict: false */

(function() {
    'use strict';
    // this anonymous function is strict...;

    // Add classes to lazy loaded elements for transitions
    window.lazySizesConfig = {
        addClasses: true
    };

    $(document).ready(function() {

        // Mobile Menu
        var menu = $('.menu').first().clone();
        var body = $('body');
        menu.appendTo('.mobmen-container').addClass('mobmen');
        body.prepend('<div class="body-overlay"></div>');
        var mobmenu = $('.mobmen');
        var nav_icon = $('.nav-icon');
        var body_overlay = $('.body-overlay');


        nav_icon.on('click', function() {
            nav_icon.toggleClass('nav-icon-go');
            mobmenu.toggleClass('mob-menu-go');
            body_overlay.toggleClass('active');
            body.toggleClass('overflow');
        });

        // Resize delay
        var rtime = new Date(946728000);
        var timeout = false;
        var delta = 200;
        $(window).resize(function() {
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(resizeend, delta);
            }
        });

        function resizeend() {
            if (new Date() - rtime < delta) {
                setTimeout(resizeend, delta);
            } else {
                timeout = false;
                fixnav();
            }
        }

        // Listen for orientation changes
        window.addEventListener("orientationchange", function() {
            // Do stuff
        }, false);

        // Slick slider variables
        var status = $('.paging-info'),
            lazy = $('.lazy-slider');

        // Slick slider counters
        lazy.on('init reInit afterChange', function(event, slick, currentSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            status.text(i + '/' + slick.slideCount);
        });
        // Slick Slider
        lazy.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            adaptiveHeight: true,
            speed: 600,
            lazyLoad: 'progressive',
            dots: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    // Do stuff
                }
            }, {
                breakpoint: 380,
                settings: {
                    // Do stuff
                }
            }]
        });

        // Fixed position navigation bar when user scrolls below #navbar
        function fixnav() {
            if ($(window).width() < 768) {
                // Store the position of the element in position
                var navbar = $('#navbar');
                var position = $(navbar).offset();

                // On scrolling of the document do something
                $(document).scroll(function() {
                    // The current height
                    var y = $(this).scrollTop();

                    // If the current Y is bigger than the element. (you scrolled beyond the element)
                    if (y >= position.top) {
                        navbar.addClass('fixed');
                    } else {
                        navbar.removeClass('fixed');
                    }
                });
                var y = $(document).scrollTop();

                // If the current Y is bigger than the element. (you scrolled beyond the element)
                if (y >= position.top) {
                    navbar.addClass('fixed');
                } else {
                    navbar.removeClass('fixed');
                }
            }
        }
        fixnav();

        if ($(window).width() > 767) {
            // Scroll to top of page (Where slideshow is) when user clicks a Gallery thumb
            var gallery_img = $('.gallery-container img');

            gallery_img.on('click', function() {
                $("html, body").animate({ scrollTop: 0 }, 500);
            });
        }

        // Fix for double tap issue on touch devices
        $('.site-header a').on('click touchend', function() {
            var el = $(this);
            var link = el.attr('href');
            window.location = link;
        });
    });


    // Do stuff on window load - Strict
    $(window).load(function() {
        // Do stuff
    });

}());

// Do stuff instantly
(function() {
    // this anonymous function is sloppy...
}());
