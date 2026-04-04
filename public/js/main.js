/**
  * Handle Mobile Menu
  * Handle Footer
  * Header Sticky
  * Variant Picker
  * Stagger Wrap
  * Handle Progress
  * Total Price Variant
  * Total Bundle
  * Item Checkbox
  * Button Quantity
  * Delete Item
  * Wish List
  * Bottom Sticky
  * Preloader
  * Go Top

 */

(function ($) {
  "use strict";

    /* Handle Mobile Menu
  ------------------------------------------------------------------------------------- */
  var handleMobileMenu = function() {
    const $desktopMenu = $(".box-nav-menu").clone();
    $desktopMenu.find(".demo-item, .banner, .wrapper-sub-collection, .wrapper-sub-product, .wrapper-sub-blog").remove();

    const $mobileMenu = $('<ul class="nav-ul-mb"></ul>');

    $desktopMenu.find("> li.menu-item").each(function (i, menuItem) {
        const $item = $(menuItem);
        const text = $item.find("> a.item-link").clone().children().remove().end().text().trim();
        const submenu = $item.find("> .sub-menu");
        const id = "dropdown-menu-" + i;
        if (text.toLowerCase() === "home") {
          const $li = $(`
              <li class="nav-mb-item">
                  <a href="#${id}" class="collapsed mb-menu-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${id}">
                      <span>${text}</span>
                      <span class="btn-open-sub"></span>
                  </a>
                  <div id="${id}" class="collapse">
                      <ul class="sub-nav-menu"></ul>
                  </div>
              </li>
          `);

          $('.modalDemo .demo-name').each(function () {
              const $demoName = $(this);
              const link = $demoName.attr("href") || "#";
              const title = $demoName.text().trim();

              if (title) {
                  $li.find('.sub-nav-menu').append(`<li><a href="${link}" class="sub-nav-link">${title}</a></li>`);
              }
          });

          $mobileMenu.append($li);
          return;
        }

        if (submenu.hasClass("mega-tab")) {
            const $li = $(`
                <li class="nav-mb-item">
                    <a href="#${id}" class="collapsed mb-menu-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${id}">
                        <span>${text}</span>
                        <span class="btn-open-sub"></span>
                    </a>
                    <div id="${id}" class="collapse"></div>
                </li>
            `);

            const $tabSubNav = $('<ul class="sub-nav-menu"></ul>');

            submenu.find(".menu-tab .tab-link").each(function (j) {
                const tabText = $(this).text().trim();
                const tabId = $(this).attr("href");
                const tabContent = submenu.find(tabId);
                const subId = `${id}-tab-${j}`;

                const $tabGroup = $(`
                    <li>
                        <a href="#${subId}" class="collapsed sub-nav-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${subId}">
                            <span>${tabText}</span>
                            <span class="btn-open-sub"></span>
                        </a>
                        <div id="${subId}" class="collapse">
                            <ul class="sub-nav-menu sub-menu-level-2"></ul>
                        </div>
                    </li>
                `);

                tabContent.find(".menu-list a").each(function () {
                    const link = $(this).attr("href") || "#";
                    const title = $(this).text().trim();
                    if (title !== "") {
                        $tabGroup.find(".sub-menu-level-2").append(`<li><a href="${link}" class="sub-nav-link">${title}</a></li>`);
                    }
                });

                $tabSubNav.append($tabGroup);
            });

            $li.find(`#${id}`).append($tabSubNav);
            $mobileMenu.append($li);
        }
        else if (submenu.length > 0) {
            const $li = $(`
                <li class="nav-mb-item">
                    <a href="#${id}" class="collapsed mb-menu-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${id}">
                        <span>${text}</span>
                        <span class="btn-open-sub"></span>
                    </a>
                    <div id="${id}" class="collapse"></div>
                </li>
            `);

            const $subNav = $('<ul class="sub-nav-menu"></ul>');

            submenu.find(".mega-menu-item").each(function (j) {
                const heading = $(this).find(".menu-heading").text().trim();
                const subId = `${id}-group-${j}`;
                const $group = $(`
                    <li>
                        <a href="#${subId}" class="collapsed sub-nav-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${subId}">
                            <span>${heading}</span>
                            <span class="btn-open-sub"></span>
                        </a>
                        <div id="${subId}" class="collapse">
                            <ul class="sub-nav-menu sub-menu-level-2"></ul>
                        </div>
                    </li>
                `);

                $(this).find(".menu-list a").each(function () {
                    const link = $(this).attr("href") || "#";
                    const title = $(this).text().trim();
                    if (title !== "") {
                        $group.find(".sub-menu-level-2").append(`<li><a href="${link}" class="sub-nav-link">${title}</a></li>`);
                    }
                });

                $subNav.append($group);
            });

            if ($subNav.children().length === 0) {
                submenu.find("a").each(function () {
                    const link = $(this).attr("href") || "#";
                    const title = $(this).text().trim();
                    if (title !== "") {
                        $subNav.append(`<li><a href="${link}" class="sub-nav-link">${title}</a></li>`);
                    }
                });
            }
            $li.find(`#${id}`).append($subNav);
            $mobileMenu.append($li);
        }
        else {
            $mobileMenu.append(`<li class="nav-mb-item"><a href="${$item.find("a").attr("href")}" class="mb-menu-link"><span>${text}</span></a></li>`);
        }
    });

    $("#wrapper-menu-navigation").empty().append($mobileMenu.html());
  }

  /* Handle Footer
  -------------------------------------------------------------------------*/
  var handleFooter = function () {
    var footerAccordion = function () {
      var args = { duration: 250 };
      $(".footer-heading-mobile").on("click", function () {
        $(this).parent(".footer-col-block").toggleClass("open");
        if (!$(this).parent(".footer-col-block").is(".open")) {
          $(this).next().slideUp(args);
        } else {
          $(this).next().slideDown(args);
        }
      });
    };
    function handleAccordion() {
      if (matchMedia("only screen and (max-width: 575px)").matches) {
        if (!$(".footer-heading-mobile").data("accordion-initialized")) {
          footerAccordion();
          $(".footer-heading-mobile").data("accordion-initialized", true);
        }
      } else {
        $(".footer-heading-mobile").off("click");
        $(".footer-heading-mobile")
          .parent(".footer-col-block")
          .removeClass("open");
        $(".footer-heading-mobile").next().removeAttr("style");
        $(".footer-heading-mobile").data("accordion-initialized", false);
      }
    }
    handleAccordion();
    window.addEventListener("resize", function () {
      handleAccordion();
    });
  };

  /* Header Sticky
  -------------------------------------------------------------------------*/
  var headerSticky = function () {
    let lastScrollTop = 0;
    let delta = 5;
    let navbarHeight = $("header").outerHeight();
    let didScroll = false;

    $(window).scroll(function () {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        let st = $(window).scrollTop();
        navbarHeight = $("header").outerHeight();

        if (st > navbarHeight) {
          if (st > lastScrollTop + delta) {
            $("header").css("top", `-${navbarHeight}px`);
          } else if (st < lastScrollTop - delta) {
            $("header").css("top", "0");
            $("header").addClass("header-bg");
          }
        } else {
          $("header").css("top", "unset");
          $("header").removeClass("header-bg");
        }
        lastScrollTop = st;
        didScroll = false;
      }
    }, 250);
  };


  /* Variant Picker
  -------------------------------------------------------------------------------------*/
  var variantPicker = function () {
    if ($(".variant-picker-item").length) {
      // variant color
      $(".color-btn").on("click", function (e) {
        var value = $(this).data("scroll");
        $(".value-currentColor").text(value);

        $(this)
          .closest(".variant-picker-values")
          .find(".color-btn")
          .removeClass("active");
        $(this).addClass("active");
      });
      // variant size
      $(".size-btn").on("click", function (e) {
        var value = $(this).data("size");
        $(".value-currentSize").text(value);

        $(this)
          .closest(".variant-picker-values")
          .find(".size-btn")
          .removeClass("active");
        $(this).addClass("active");
      });
    }
  };




  /* Stagger Wrap
  -------------------------------------------------------------------------*/
  var staggerWrap = function () {
    if ($(".stagger-wrap").length) {
      var count = $(".stagger-item").length;
      for (var i = 1, time = 0.2; i <= count; i++) {
        $(".stagger-item:nth-child(" + i + ")")
          .css("transition-delay", time * i + "s")
          .addClass("stagger-finished");
      }
    }
  };



  /* Handle Progress
  ------------------------------------------------------------------------------------- */
  var handleProgress = function () {
    if ($(".progress-sold").length > 0) {
      var progressValue = $(".progress-sold .value").data("progress");
      setTimeout(function () {
        $(".progress-sold .value").css("width", progressValue + "%");
      }, 800);
    }

    function handleProgressBar(showEvent, hideEvent, target) {
      $(target).on(hideEvent, function () {
        $(".tf-progress-bar .value").css("width", "0%");
      });
    
      $(target).on(showEvent, function () {
        setTimeout(function () {
          var progressValue = $(".tf-progress-bar .value").data("progress");
          $(".tf-progress-bar .value").css("width", progressValue + "%");
        }, 600);
      });
    }
    
    if ($(".popup-shopping-cart").length > 0) {
      handleProgressBar("show.bs.offcanvas", "hide.bs.offcanvas", ".popup-shopping-cart");
    }
    
    if ($(".popup-shopping-cart").length > 0) {
      handleProgressBar("show.bs.modal", "hide.bs.modal", ".popup-shopping-cart");
    }
  };

  /* Total Price Variant
  ------------------------------------------------------------------------------------- */
  var totalPriceVariant = function () {
    $(".tf-product-info-list,.tf-cart-item").each(function () {
      var productItem = $(this);
      var basePrice =
        parseFloat(productItem.find(".price-on-sale").data("base-price")) ||
        parseFloat(productItem.find(".price-on-sale").text().replace("$", ""));
      var quantityInput = productItem.find(".quantity-product");

      productItem.find(".color-btn, .size-btn").on("click", function () {
        var newPrice = parseFloat($(this).data("price")) || basePrice;
        quantityInput.val(1);
        productItem
          .find(".price-on-sale")
          .text(
            "$" + newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
        updateTotalPrice(newPrice, productItem);
      });

      productItem.find(".btn-increase").on("click", function () {
        var currentQuantity = parseInt(quantityInput.val(), 10);
        quantityInput.val(currentQuantity + 1);
        updateTotalPrice(null, productItem);
      });

      productItem.find(".btn-decrease").on("click", function () {
        var currentQuantity = parseInt(quantityInput.val(), 10);
        if (currentQuantity > 1) {
          quantityInput.val(currentQuantity - 1);
          updateTotalPrice(null, productItem);
        }
      });

      function updateTotalPrice(price, scope) {
        var currentPrice =
          price ||
          parseFloat(scope.find(".price-on-sale").text().replace("$", ""));
        var quantity = parseInt(scope.find(".quantity-product").val(), 10);
        var totalPrice = currentPrice * quantity;
        scope
          .find(".total-price")
          .text(
            "$" + totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
      }
    });
  };


  /* Total Bundle
  ------------------------------------------------------------------------------------- */
  var updateBundleTotal = function () {
    var $bundleItems = $(".tf-bundle-product-item");
    var totalPrice = 0;
    var totalPriceOld = 0;

    $bundleItems.each(function () {
        var $this = $(this);
        var isChecked = $this.find(".tf-check").prop("checked");

        if (isChecked) {
            var newPrice = parseFloat(
                $this.find(".new-price").text().replace("$", "")
            );
            var oldPrice = parseFloat(
                $this.find(".old-price").text().replace("$", "") || 0
            );

            totalPrice += newPrice;
            totalPriceOld += oldPrice || newPrice; 
        }
    });

    $(".total-price").text(`$${totalPrice.toFixed(2)}`);
    $(".total-price-old").text(`$${totalPriceOld.toFixed(2)}`);
  };

  var initBundleFunctionality = function () {
      var $firstCheck = $(".tf-bundle-product-item").first().find(".tf-check");
      $firstCheck.prop("checked", true).prop("disabled", true);
      updateBundleTotal();
      $(".tf-check").on("change", function () {
          updateBundleTotal();
      });
  };



  /* Item Checkbox
  -------------------------------------------------------------------------*/
  var itemCheckbox = function () {
    if ($(".item-has-checkbox").length) {
      $(".item-has-checkbox input:checkbox").on("click", function (e) {
        $(this).closest(".item-has-checkbox").toggleClass("check");
      });
    }
  };


  /* Button Quantity
  ----------------------------------------------------------------------------*/
  var btnQuantity = function () {
    $(".minus-btn").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      var $input = $this.closest("div").find("input");
      var value = parseInt($input.val(), 10);

      if (value > 1) {
        value = value - 1;
      }
      $input.val(value);
    });

    $(".plus-btn").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      var $input = $this.closest("div").find("input");
      var value = parseInt($input.val(), 10);

      if (value > -1) {
        value = value + 1;
      }
      $input.val(value);
    });
  };

  /* Delete compare
  ----------------------------------------------------------------------------*/
  var deleteCompare = function () {
    function checkEmpty() {
        var $compareInner = $(".tf-compare-inner");
        if ($(".list-file-delete .file-delete").length === 0) {
            $(".tf-compare-buttons").hide(); 
            if ($compareInner.find(".tf-compare-empty").length === 0) {
                $compareInner.append(`
                    <div class="tf-compare-empty text-center">
                        <p class="text-lg fw-medium text-main">Compare list is empty</p>
                    </div>
                `);
            }
        } else {
            $(".tf-compare-buttons").show(); 
            $compareInner.find(".tf-compare-empty").remove(); 
        }
    }

    $(".remove").on("click", function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.closest(".file-delete").remove();
        checkEmpty(); 
    });

    $(".clear-file-delete").on("click", function (e) {
        e.preventDefault();
        $(this).closest(".list-file-delete").find(".file-delete").remove();
        checkEmpty();
    });
  };

  /* Delete wishlist
  ----------------------------------------------------------------------------*/
  var deleteWishList = function () {
    function checkEmpty() {
      var $wishlistInner = $(".wrapper-wishlist");
      var productCount = $(".wrapper-wishlist .card-product").length;
  
      if (productCount <= 8) {
        $(".wrapper-wishlist .wg-pagination").hide();
      } else {
        $(".wrapper-wishlist .wg-pagination").show();
      }
  
      if (productCount === 0) {
        $wishlistInner.append(`
          <div class="tf-wishlist-empty text-center">
            <p class="text-md text-noti">No product were added to the wishlist.</p>
            <a href="index.html" class="tf-btn animate-btn btn-back-shop">Back to Shopping</a>
          </div>
        `);
      } else {
        $wishlistInner.find(".tf-compare-empty").remove();
      }
    }
  
    $(".remove").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.closest(".card-product").remove();
      checkEmpty();
    });
  
    checkEmpty();
  };
  


  /* Wish List 
  ------------------------------------------------------------------------------------- */
  var wishList = function () {
    $(".btn-add-wishlist").on("click", function () {
      $(this).toggleClass("added-wishlist");
    });
    $(".card-product .wishlist").on("click", function () {
      $(this).toggleClass("addwishlist"); 
  
      let icon = $(this).find(".icon"); 
      let tooltip = $(this).find(".tooltip");
  
      if ($(this).hasClass("addwishlist")) {
        icon.removeClass("icon-heart2").addClass("icon-trash");
        tooltip.text("Remove Wishlist");
      } else {
        icon.removeClass("icon-trash").addClass("icon-heart2");
        tooltip.text("Add to Wishlist");
      }
    });
  };

  /* Bottom Sticky
  --------------------------------------------------------------------------------------*/
  var scrollBottomSticky = function () {
    $(window).on("scroll", function () {
      var scrollPosition = $(this).scrollTop();
      var myElement = $(".tf-sticky-btn-atc");

      if (scrollPosition >= 500) {
        myElement.addClass("show");
      } else {
        myElement.removeClass("show");
      }
    });
  };


  /* Preloader
  -------------------------------------------------------------------------------------*/
  var preloader = function () {
    setTimeout(function () {
      $(".preload").fadeOut("slow", function () {
        $(this).remove();
      });
    }, 300);
  };

  /* Go Top
  -------------------------------------------------------------------------------------*/
  var goTop = function () {
    var $goTop = $("#goTop");
    var $borderProgress = $(".border-progress");

    $(window).on("scroll", function () {
      var scrollTop = $(window).scrollTop();
      var docHeight = $(document).height() - $(window).height();
      var scrollPercent = (scrollTop / docHeight) * 100;
      var progressAngle = (scrollPercent / 100) * 360;

      $borderProgress.css("--progress-angle", progressAngle + "deg");

      if (scrollTop > 100) {
        $goTop.addClass("show");
      } else {
        $goTop.removeClass("show");
      }
    });

    $goTop.on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 0);
    });
  };

  // removecompare
  var removecompare = function () {
    $(".tf-compare-remove").on("click", function () {
      const colIndex = $(this).closest('.tf-compare-col').index();
      $('.tf-compare-row').each(function() {
        $(this).find('.tf-compare-col').eq(colIndex).remove();
      });
    });
  }


  // Dom Ready
  $(function () {
    handleMobileMenu();
    handleFooter();
    headerSticky();
    variantPicker();
    staggerWrap();
    handleProgress();
    totalPriceVariant();
    initBundleFunctionality();
    itemCheckbox();
    btnQuantity();
    deleteCompare();
    deleteWishList();
    wishList();
    scrollBottomSticky();
    removecompare();
    preloader();
    goTop();
    new WOW().init();
    
  });
})(jQuery);

    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('.card-body').forEach(cb => {
        // 1. Giữ lại phần tiêu đề
        const titleEl = cb.querySelector('p.fs-5');
        const titleHTML = titleEl.outerHTML;

        // 2. Lấy phần specs (HTML giữa tiêu đề và hết cb)
        let specsHtml = cb.innerHTML.replace(titleHTML, '').trim();

        // 3. Tách theo <br>
        const parts = specsHtml.split(/<br\s*\/?>/);

        // 4. Xây dựng bảng
        let table = '<table class="table table-borderless mb-0">';
        parts.forEach(part => {
          const fragment = document.createElement('div');
          fragment.innerHTML = part;
          const text = (fragment.textContent || '').trim();
          if (!text || text.indexOf(':') < 0) return;

          const label = text.split(':')[0].trim();
          // Lấy HTML của tất cả các nút trong fragment
          const buttons = Array.from(fragment.querySelectorAll('button'))
            .map(btn => btn.outerHTML)
            .join(' ');

          table += `
          <tr>
            <td>${label}:</td>
            <td>${buttons}</td>
          </tr>`;
        });
        table += '</table>';

        // 5. Đặt lại nội dung .card-body
        cb.innerHTML = titleHTML + table;
      });
    });