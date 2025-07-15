$(window).scroll(function () {
  var headerHeight = $(".header").outerHeight();
  // kiểm tra điều kiện > header thì mới addClass
  if ($(window).scrollTop() > headerHeight) {
    $(".header").addClass("fixed");
  } else {
    $(".header").removeClass("fixed");
  }

  //scroll to div
  // if ($(this).scrollTop() >= $('.navigator').offset().top) {
  //     $('.navigator-container').addClass('fixed');
  //     $('.navigator-logo').show();
  // } else {
  //     $('.navigator-container').removeClass('fixed');
  //     $('.navigator-logo').hide();
  // }
});

/* back to top */
var btn = $("#backtotop");

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass("show");
  } else {
    btn.removeClass("show");
  }
});

btn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate(
    {
      scrollTop: 0
    },
    "1000"
  );
});

$(document).ready(function () {
  $(".hasDatepicker").flatpickr({
    dateFormat: "d/m/Y"
  });
  // $("#check-out").flatpickr({
  //   dateFormat: "d/m/Y"
  // });
});
$(document).mouseup(function (e) {
  if ($(e.target).closest(".menu-mobile").length === 0) {
    $(".menu-mobile").removeClass("opened");
    $("body").removeClass("ov-hidden");
    $(".overlay-over").hide();
    $(".hasChildren .carret").removeClass("active");
    $(".hasChildren .submenu").hide();
  }
  if ($(e.target).closest(".reservations").length === 0) {
    $(".reservations").removeClass("opened");
    $("body").removeClass("ov-hidden");
    $(".overlay-over").hide();
  }
});

function initMenu() {
  $(".toggle-menu").click(() => openMenu());
  $(".menu-mobile-close").click(() => closeMenu());
  $(".hasChildren .carret").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
    $(this).parents(".hasChildren").children(".submenu").slideToggle();
    $(".overlay-over").show();
  });
}

function openMenu() {
  $(".menu-mobile").addClass("opened");
  $("body").addClass("ov-hidden");
  $(".overlay-over").show();
}

function closeMenu() {
  $(".menu-mobile").removeClass("opened");
  $("body").removeClass("ov-hidden");
  $(".overlay-over").hide();
  $(".hasChildren .carret").removeClass("active");
  $(".hasChildren .submenu").hide();
}

$(initMenu);

$(window)
  .on("resize", () => {
    if (window.innerWidth > 1360) closeMenu();
  })
  .trigger("resize"); // kiểm tra luôn khi load

//xử lí reservation mobile
function closeReservations() {
  $(".reservations").removeClass("opened");
  $("body").removeClass("ov-hidden");
  $(".overlay-over").hide();
}

$(document).ready(function () {
  $(".toggle-search").click(function () {
    if (window.innerWidth < 768) {
      $(".reservations").addClass("opened");
      $("body").addClass("ov-hidden");
      $(".overlay-over").show();
    }
  });

  $(".reservations-mobile-close").click(function () {
    if (window.innerWidth < 768) {
      closeReservations();
    }
  });

  $(window)
    .on("resize", function () {
      if (window.innerWidth > 768) {
        closeReservations();
      }
    })
    .trigger("resize"); // kiểm tra luôn khi load
});

//destination tab

$(".page-list-tabnav .tab-item").click(function () {
  var tabId = $(this).data("tab"); // lấy giá trị ví dụ: "#tab-home"

  // Bỏ active tab hiện tại
  $(".page-list-tabnav .tab-item").removeClass("active");
  $(".page-list-tabnav .tab-content").removeClass("active");

  // Thêm active cho tab được click và nội dung tương ứng
  $(this).addClass("active");
  $(".page-list-tabnav " + tabId).addClass("active");
});

$(".about-page-inner .tab-item").click(function () {
  var tabId = $(this).data("tab"); // ví dụ: "tab-1"

  // Bỏ active tab hiện tại
  $(".about-page-inner .tab-item").removeClass("active");
  $(".about-page-inner .tab-content").removeClass("active");

  // Thêm active cho tab được click và nội dung tương ứng
  $(this).addClass("active");
  $(".about-page-inner #" + tabId).addClass("active");
});

$(".faq-list .item .item-head").click(function () {
  $(this).toggleClass("active");
  $(this).parent(".item").toggleClass("active");
});

//sort filter
$(function () {
  // Toggle dropdown khi click button
  $(".sort-button").on("click", function (e) {
    e.stopPropagation();
    // Đóng tất cả trước
    $(".sort-options").not($(this).next()).hide();
    // Mở đúng dropdown đang click
    $(this).next(".sort-options").toggle();
  });

  // Chọn 1 item trong menu
  $(".sort-options li").on("click", function () {
    const text = $(this).text();
    const value = $(this).data("value");

    // Gán label vào đúng button
    $(this)
      .closest(".sort-filter-inner")
      .find(".sort-button")
      .html(text + ' <span class="arrow">&#x25BC;</span>');

    // Ẩn menu
    $(".sort-options").hide();

    // Gọi hàm lọc nếu cần
    console.log("Selected:", value);
  });

  // Click ra ngoài sẽ đóng dropdown
  $(document).on("click", function () {
    $(".sort-options").hide();
  });
});

$(".teams-founder-inner .item .gr-btn .btn-normal").on("click", function (e) {
  e.preventDefault();

  var $box = $(this).closest(".box-content"); // vùng chứa phần cần toggle
  var $desc = $box.find(".desc");
  var $grBtn = $box.find(".gr-btn");

  $desc.toggleClass("expanded");
  $grBtn.toggleClass("show-full");
});

//slider
if ($(".banner-slide").length > 0) {
  var varLoop = $(".banner-slide .item").length > 1;

  $(".banner-slide").owlCarousel({
    loop: varLoop,
    mouseDrag: varLoop,
    touchDrag: varLoop,
    items: 1,
    dots: false,
    autoplay: false,
    autoplayTimeout: 2700,
    autoplaySpeed: 2000,
    autoplayHoverPause: false,
    animateOut: "fadeOut"
  });
}

$(".brands-slide").owlCarousel({
  loop: true,
  margin: 24,
  nav: false,
  dots: true,
  autoplay: true,
  autoplayTimeout: 3000,
  responsive: {
    0: {
      items: 1
    },
    576: {
      margin: 24,
      items: 2
    },
    768: {
      margin: 35,
      items: 3
    },
    992: {
      margin: 60,
      items: 5
    }
  }
});

$(".blogs-slide").owlCarousel({
  loop: true,
  margin: 20,
  nav: false,
  dots: false,
  autoplay: false,
  autoplayTimeout: 3000,
  responsive: {
    0: {
      items: 1,
      dots: true
    },
    576: {
      items: 2
    },
    768: {
      items: 2
    },
    992: {
      items: 3
    }
  }
});

$(".destinations-slide").owlCarousel({
  loop: true,
  margin: 24,
  nav: false,
  dots: false,
  autoplay: false,
  autoplayTimeout: 3000,
  responsive: {
    0: {
      items: 1,
      dots: true
    },
    576: {
      items: 2
    },
    768: {
      items: 2
    },
    992: {
      items: 3
    },
    1024: {
      items: 4
    }
  }
});

if ($(".tours-detail-service-slide").length > 0) {
  var varLoop = $(".tours-detail-service-slide .item").length > 1;

  $(".tours-detail-service-slide").owlCarousel({
    loop: varLoop,
    mouseDrag: varLoop,
    touchDrag: varLoop,
    margin: 24,
    nav: false,
    dots: false,
    autoplay: false,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1,
        dots: true
      },
      576: {
        items: 2
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      },
      1024: {
        items: 4
      }
    }
  });
}

$(".ambassador-slide").owlCarousel({
  loop: true,
  margin: 24,
  nav: false,
  dots: false,
  autoplay: false,
  autoplayTimeout: 3000,
  responsive: {
    0: {
      items: 1,
      dots: true
    },
    576: {
      items: 2
    },
    768: {
      items: 2
    },
    992: {
      items: 2
    },
    1024: {
      items: 2
    }
  }
});
