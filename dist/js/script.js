    /* Fade In & Out Function */
    (function () {
        var FX = {
            easing: {
                linear: function (progress) {
                    return progress;
                },
                quadratic: function (progress) {
                    return Math.pow(progress, 2);
                },
                swing: function (progress) {
                    return 0.5 - Math.cos(progress * Math.PI) / 2;
                },
                circ: function (progress) {
                    return 1 - Math.sin(Math.acos(progress));
                },
                back: function (progress, x) {
                    return Math.pow(progress, 2) * ((x + 1) * progress - x);
                },
                bounce: function (progress) {
                    for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                        if (progress >= (7 - 4 * a) / 11) {
                            return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                        }
                    }
                },
                elastic: function (progress, x) {
                    return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
                }
            },
            animate: function (options) {
                var start = new Date;
                var id = setInterval(function () {
                    var timePassed = new Date - start;
                    var progress = timePassed / options.duration;
                    if (progress > 1) {
                        progress = 1;
                    }
                    options.progress = progress;
                    var delta = options.delta(progress);
                    options.step(delta);
                    if (progress == 1) {
                        clearInterval(id);
                        options.complete();
                    }
                }, options.delay || 10);
            },
            fadeOut: function (element, options) {
                var to = 1;
                this.animate({
                    duration: options.duration,
                    delta: function (progress) {
                        progress = this.progress;
                        return FX.easing.swing(progress);
                    },
                    complete: options.complete,
                    step: function (delta) {
                        element.style.opacity = to - delta;
                    }
                });
            },
            fadeIn: function (element, options) {
                var to = 0;
                this.animate({
                    duration: options.duration,
                    delta: function (progress) {
                        progress = this.progress;
                        return FX.easing.swing(progress);
                    },
                    complete: options.complete,
                    step: function (delta) {
                        element.style.opacity = to + delta;
                    }
                });
            }
        };
        window.FX = FX;
    })();


document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("button");

    const modalCallMe = document.querySelector(".modalCallMe");
    const modalCallMeClose = document.querySelector(".modalCallMe_close");
    const modalCallMeOverlay = document.querySelector(".modalCallMe_overlay");

    const modalDiagnostics = document.querySelector(".modalDiagnostics");
    const modalDiagnosticsClose = document.querySelector(".modalDiagnostics_close");
    const modalDiagnosticsOverlay = document.querySelector(".modalDiagnostics_overlay");

    const jsCallMeButton = document.querySelectorAll(".jsCallMe");
    const jsDiagnosticsButton = document.querySelectorAll(".jsDiagnostics");

    const fadeTime = 1000;

    /* var slider = tns({
        container: '.reviewsSlider',
        items: 1,
        slideBy: 'page',
        mode: 'gallery',
        controlsPosition: 'bottom',
        controlsContainer: '.reviewsControls',
        navPosition: 'bottom',
        navContainer: '.reviewsNav',
        autoplay: false
      }); */
    
    var reviewsSlider = new Swiper('.reviews__swiper', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        /* effect: 'fade',

        fadeEffect: {
            crossFade: true
        }, */

        // If we need pagination
        pagination: {
            el: '.reviews-pagination',
        },
        
        // Navigation arrows
        navigation: {
        nextEl: '.reviews-right',
        prevEl: '.reviews-left',
        },


    });


    /* Certificates Swiper */
    var certificatesSlider = new Swiper('.certificates__swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        slidesPerView: 3,
        spaceBetween: 0,
      
        // If we need pagination
        pagination: {
          el: '.certificates-pagination',
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.certificates-right',
          prevEl: '.certificates-left',
        },

        breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
            },
            // when window width is >= 640px
            768: {
              slidesPerView: 3,
            }
        }
    });




    // Buttons
    for (var i = 0; i < jsCallMeButton.length; i++) {
        jsCallMeButton[i].addEventListener('click', function () {
            event.preventDefault();
            modalCallMe.style.display = "flex";

            FX.fadeIn(modalCallMe, {
                duration: fadeTime
            });

        }, false);
    };

    for (var i = 0; i < jsDiagnosticsButton.length; i++) {
        jsDiagnosticsButton[i].addEventListener('click', function () {
            modalDiagnostics.style.display = "flex";
            event.preventDefault();

            FX.fadeIn(modalDiagnostics, {
                duration: fadeTime
            });
        }, false);
    };




    // Modal Close
    modalCallMeClose.addEventListener("click", () => {
        event.preventDefault();

        FX.fadeOut(modalCallMe, {
            duration: fadeTime,
            complete: function () {
                modalCallMe.style.display = "";
            }
        });
    }, false);


    modalDiagnosticsClose.addEventListener("click", () => {
        event.preventDefault();

        FX.fadeOut(modalDiagnostics, {
            duration: fadeTime,
            complete: function () {
                modalDiagnostics.style.display = "";
            }
        });
    }, false);


    modalCallMeOverlay.addEventListener("click", () => {
        FX.fadeOut(modalCallMe, {
            duration: fadeTime,
            complete: function () {
                modalCallMe.style.display = "";
            }
        });
    }, false);


    modalDiagnosticsOverlay.addEventListener("click", () => {
        FX.fadeOut(modalDiagnostics, {
            duration: fadeTime,
            complete: function () {
                modalDiagnostics.style.display = "";
            }
        });
    }, false);

})