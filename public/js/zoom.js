window.initProductScript = function() {
    // swiper product details
    if ($(".product-thumbs-slider").length > 0) {
        var direction = $(".tf-product-media-thumbs").data("direction");
        var preview = $(".tf-product-media-thumbs").data("preview");

        if (window.thumbsSwiper) window.thumbsSwiper.destroy(true, true);
        if (window.mainSwiper) window.mainSwiper.destroy(true, true);

        window.thumbsSwiper = new Swiper(".tf-product-media-thumbs", {
            spaceBetween: 10,
            slidesPerView: preview,
            freeMode: true,
            direction: "vertical",
            watchSlidesProgress: true,
            observer: true,
            observeParents: true,
            breakpoints: {
                0: {
                    direction: "horizontal",
                    slidesPerView: preview,
                },
                1200: {
                    direction: direction
                },
            },
        });

        window.mainSwiper = new Swiper(".tf-product-media-main", {
            spaceBetween: 0,
            observer: true,
            observeParents: true,
            speed: 800,
            navigation: {
                nextEl: ".thumbs-next",
                prevEl: ".thumbs-prev",
            },
            thumbs: {
                swiper: window.thumbsSwiper,
            },
        });

        var modelViewer = document.querySelector('.slide-3d');
        if (modelViewer) {
            modelViewer.addEventListener('mouseenter', () => {
                window.mainSwiper.allowTouchMove = false;
            });

            modelViewer.addEventListener('mouseleave', () => {
                window.mainSwiper.allowTouchMove = true;
            });
        }

        function updateActiveButtonThumbs(type, activeIndex) {
            var btnClass = `.${type}-btn`;
            var dataAttr = `data-${type}`;
            var currentClass = `.tf-product-info-list .value-current${capitalizeFirstLetter(type)}`;
            var selectClass = `.tf-product-info-list .select-current${capitalizeFirstLetter(type)}`;
            $(btnClass).removeClass("active");

            var currentSlide = $(".tf-product-media-main .swiper-slide").eq(activeIndex);
            var currentValue = currentSlide.attr(dataAttr);

            if (currentValue) {
                $(`${btnClass}[${dataAttr}='${currentValue}']`).addClass("active");
                $(currentClass).text(currentValue);
                $(selectClass).text(currentValue);
            }
        }

        function scrollToThumbs(type, value, color) {
            if (!value || !color) return;

            var matchingSlides = $(".tf-product-media-main .swiper-slide").filter(function () {
                return (
                    $(this).attr(`data-${type}`) === value &&
                    $(this).attr('data-color') === color
                );
            });

            if (matchingSlides.length > 0) {
                var firstIndex = matchingSlides.first().index();
                window.mainSwiper.slideTo(firstIndex, 1000, false);
                window.thumbsSwiper.slideTo(firstIndex, 1000, false);
            } else {
                var fallbackSlides = $(".tf-product-media-main .swiper-slide").filter(function () {
                    return $(this).attr(`data-${type}`) === value;
                });

                if (fallbackSlides.length > 0) {
                    var fallbackIndex = fallbackSlides.first().index();
                    window.mainSwiper.slideTo(fallbackIndex, 1000, false);
                    window.thumbsSwiper.slideTo(fallbackIndex, 1000, false);
                }
            }
        }

        function setupVariantButtonsThumbs(type) {
            $(`.${type}-btn`).off("click").on("click", function () {
                if ($(this).closest(".modal-quick-view").length) return;
                var value = $(this).data(type);
                var color = $(".tf-product-info-list .value-currentColor").text();

                $(`.${type}-btn`).removeClass("active");
                $(this).addClass("active");

                scrollToThumbs(type, value, color);
            });
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        ["color", "size"].forEach((type) => {
            window.mainSwiper.on("slideChange", function () {
                updateActiveButtonThumbs(type, this.activeIndex);
            });
            setupVariantButtonsThumbs(type);
            updateActiveButtonThumbs(type, window.mainSwiper.activeIndex);
        });
    }

    (function ($) {
        "use strict";

        var section_zoom = function () {
            $(".tf-image-zoom").off("mouseover mouseleave");
            $(".tf-image-zoom").on("mouseover", function () {
                $(this).closest(".section-image-zoom").addClass("zoom-active");
            });
            $(".tf-image-zoom").on("mouseleave", function () {
                $(this).closest(".section-image-zoom").removeClass("zoom-active");
            });
        }
        var cus_zoom = function () {
            var image_zoom = function () {
                var driftAll = document.querySelectorAll('.tf-image-zoom');
                var pane = document.querySelector('.tf-zoom-main');
        
                if (matchMedia("only screen and (min-width: 1200px)").matches) {
                    $(driftAll).each(function(i, el) {
                        if (!el._drift && pane) {
                            try {
                                el._drift = new window.Drift(
                                    el, {
                                    zoomFactor: 2,
                                    paneContainer: pane,
                                    inlinePane: false,
                                    handleTouch: false,
                                    hoverBoundingBox: true,
                                    containInline: true,
                                    }
                                );
                            } catch (e) {}
                        }
                    });
                } else {
                    $(driftAll).each(function(i, el) {
                        if (el._drift) {
                            el._drift.destroy();
                            el._drift = null;
                        }
                    });
                }
        
                if (typeof $.fn.magnificPopup !== "undefined") {
                    $(driftAll).magnificPopup({
                        type: 'image',
                        gallery: {
                            enabled: true
                        },
                        zoom: {
                            enabled: true
                        }
                    });
                }
            };
        
            window.removeEventListener('resize', image_zoom);
            window.addEventListener('resize', image_zoom);
            image_zoom();
        };

        var image_zoom_magnifier = function () {
            var driftAll = document.querySelectorAll('.tf-image-zoom-magnifier');
            $(driftAll).each(function(i, el) {
                if(!el._drift_mag && window.Drift) {
                    try {
                        el._drift_mag = new window.Drift(
                            el, {
                            zoomFactor: 2,
                            inlinePane: true,
                            containInline: false,
                            }
                        );
                    } catch (e) {}
                }
            });
        }

        var image_zoom_inner = function () {
            var driftAll = document.querySelectorAll('.tf-image-zoom-inner');
            var pane = document.querySelector('.tf-product-zoom-inner');
            $(driftAll).each(function(i, el) {
                if(!el._drift_inner && pane && window.Drift) {
                    try {
                        el._drift_inner = new window.Drift(
                            el, {
                            paneContainer: pane,
                            zoomFactor: 2,
                            inlinePane: false,
                            containInline: false,
                            }
                        );
                    } catch (e) {}
                }
            });
        }

        var lightboxswiper = function () {
            if (typeof PhotoSwipeLightbox !== "undefined" && window.mainSwiper && !window._lightboxswiper_inited) {
                window._lightboxswiper_inited = true;
                const lightbox = new PhotoSwipeLightbox({
                    gallery: '#gallery-swiper-started',
                    children: 'a',
                    pswpModule: window.PhotoSwipe,
                    bgOpacity: 1,
                    secondaryZoomLevel: 2,
                    maxZoomLevel: 3,
                });
                lightbox.init();

                lightbox.on('change', () => {
                    const { pswp } = lightbox;
                    window.mainSwiper.slideTo(pswp.currIndex, 0, false);
                });

                lightbox.on('afterInit', () => {
                    if (window.mainSwiper.params.autoplay && window.mainSwiper.params.autoplay.enabled) {
                        window.mainSwiper.autoplay.stop();
                    };
                });

                lightbox.on('closingAnimationStart', () => {
                    const { pswp } = lightbox;
                    window.mainSwiper.slideTo(pswp.currIndex, 0, false);
                    if (window.mainSwiper.params.autoplay && window.mainSwiper.params.autoplay.enabled) {
                        window.mainSwiper.autoplay.start();
                    }
                });
            }
        }
        
        var lightbox = function () {
            if (typeof PhotoSwipeLightbox !== "undefined" && !window._lightbox_inited) {
                window._lightbox_inited = true;
                const lightbox = new PhotoSwipeLightbox({
                    gallery: '#gallery-started',
                    children: 'a',
                    pswpModule: window.PhotoSwipe,
                    bgOpacity: 1,
                    secondaryZoomLevel: 2,
                    maxZoomLevel: 3,
                });
                lightbox.init();
            }
        }

        var model_viewer = function () {
            if ($(".tf-model-viewer").length) {
                $(".tf-model-viewer-ui-button").off("click").on("click", function (e) {
                    $(this).closest(".tf-model-viewer").find("model-viewer").removeClass("disabled");
                    $(this).closest(".tf-model-viewer").toggleClass("active");
                });
        
                $(".tf-model-viewer-ui").off("dblclick").on("dblclick", function (e) {
                    const modelViewerEl = $(this).closest(".tf-model-viewer").find("model-viewer")[0];
                    
                    $(this).closest(".tf-model-viewer").find("model-viewer").addClass("disabled");
                    $(this).closest(".tf-model-viewer").toggleClass("active");
                    
                    if (modelViewerEl) {
                        modelViewerEl.cameraOrbit = "0deg 90deg auto"; 
                        modelViewerEl.updateFraming && modelViewerEl.updateFraming(); 
                    }
                });
            }
        };
        
        section_zoom();
        cus_zoom();
        image_zoom_magnifier();
        image_zoom_inner();
        lightboxswiper();
        lightbox();
        model_viewer();
    })(jQuery);
};

// Initialize on first load
$(function() {
    setTimeout(window.initProductScript, 100);
});

