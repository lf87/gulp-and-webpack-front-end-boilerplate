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
        var $menu = $('.menu').first().clone();
        var $body = $('body');
        $menu.appendTo('.mobmen-container').addClass('mobmen');
        $body.prepend('<div class="body-overlay"></div>');
        var $mobMenu = $('.mobmen');
        var $navIcon = $('.nav-icon');
        var $bodyOverlay = $('.body-overlay');


        $navIcon.on('click', function() {
            $navIcon.toggleClass('nav-icon-go');
            $mobMenu.toggleClass('mob-menu-go');
            $bodyOverlay.toggleClass('active');
            $body.toggleClass('overflow');
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
        var $status = $('.paging-info'),
            $lazy = $('.lazy-slider');

        // Slick slider counters
        $lazy.on('init reInit afterChange', function(event, slick, currentSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.text(i + '/' + slick.slideCount);
        });
        // Slick Slider
        $lazy.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            speed: 600,
            lazyLoad: 'progressive',
            dots: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    dots: false
                }
            }, {
                breakpoint: 380,
                settings: {
                    dots: false
                }
            }]
        });

        // Fixed position navigation bar when user scrolls below #navbar
        function fixnav() {
            var $navBar = $('#navbar');
            if ($(window).width() < 768) {
                // Store the position of the element in position
                var $position = $($navBar).offset();

                // On scrolling of the document do something
                $(document).scroll(function() {
                    // The current height
                    var $yPos = $(this).scrollTop();

                    // If the current Y is bigger than the element. (you scrolled beyond the element)
                    if ($yPos >= $position.top) {
                        $navBar.addClass('fixed');
                    } else {
                        $navBar.removeClass('fixed');
                    }
                });
                var $yPos = $(document).scrollTop();

                // If the current Y is bigger than the element. (you scrolled beyond the element)
                if ($yPos >= $position.top) {
                    $navBar.addClass('fixed');
                } else {
                    $navBar.removeClass('fixed');
                }
            } else {
                $navBar.removeClass('fixed');
            }
        }
        fixnav();

        // Drop down menu fix for - double tap issue on touch devices
        /* $('.site-header a').on('click touchend', function() {
            var $el = $(this);
            var link = $el.attr('href');
            window.location = link;
        }); */

        // Detect touch device
        var preliminaryTouch = false;
        $('body').addClass('no-touch-device');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            preliminaryTouch = true;
        }
        if (preliminaryTouch) {
            $('body').addClass('is-touch-device');
        }
    });


    // Do stuff on window load - Strict
    $(window).load(function() {
        FastClick.attach(document.body); // Warning can be ignored
    });

}());

// Do stuff instantly
(function() {
    // this anonymous function is sloppy...
}());
