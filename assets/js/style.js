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
  // if ($(e.target).closest(".language-dropdown").length === 0) {
  //   $(".language-dropdown").hide();
  // }

  if ($(e.target).closest(".filter-dropdown").length === 0) {
    $(".filter-dropdown").removeClass("open");
  }
});

function toggleDropdown() {
  const header = event.target.closest(".filter-header");
  const dropdown = header.closest(".filter-dropdown");
  dropdown.classList.toggle("open");
}

document.querySelectorAll(".language-selector").forEach((selector) => {
  const toggleBtn = selector.querySelector(".selected-language");
  const dropdown = selector.querySelector(".language-dropdown");

  // Toggle khi click vào nút
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    // Ẩn dropdown khác
    document.querySelectorAll(".language-dropdown").forEach((d) => {
      if (d !== dropdown) d.classList.remove("open");
    });
    dropdown.classList.toggle("open");
  });

  // Click chọn ngôn ngữ
  dropdown.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").src;
      const label = item.textContent.trim();
      toggleBtn.innerHTML = `<img src="${imgSrc}" class="flag-icon"> <span>${label}</span><i class='fa-solid fa-angle-down'></i>`;
      dropdown
        .querySelectorAll("li")
        .forEach((li) => li.classList.remove("active"));
      item.classList.add("active");
      dropdown.classList.remove("open");
    });
  });
});

// Click bên ngoài để đóng tất cả dropdown
document.addEventListener("click", () => {
  document.querySelectorAll(".language-dropdown").forEach((d) => {
    d.classList.remove("open");
  });
});

//end

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

$(".about-inner .gr-btn .btn-normal").on("click", function (e) {
  e.preventDefault();

  var $box = $(this).closest(".about-content"); // vùng chứa phần cần toggle
  var $desc = $box.find(".text");
  var $grBtn = $box.find(".gr-btn");

  $desc.toggleClass("expanded");
  $grBtn.toggleClass("show-full");
});

//toggle support
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("togglePopup");
  const popup = document.getElementById("popupBox");
  const icon = toggleBtn.querySelector("i");

  toggleBtn.addEventListener("click", function () {
    const isVisible = popup.style.display === "block";
    popup.style.display = isVisible ? "none" : "block";
    icon.classList.toggle("fa-sun", isVisible);
    icon.classList.toggle("fa-moon", !isVisible);
  });

  // Khởi tạo
  popup.style.display = "none";
  icon.classList.add("fa-sun");
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
    autoplay: true,
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
  autoplay: true,
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
  autoplay: true,
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
    autoplay: true,
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
  autoplay: true,
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

$(".others-tour-slide").owlCarousel({
  loop: true,
  margin: 20,
  nav: true,
  navText: [
    "<i class='fa-solid fa-chevron-left'></i>",
    "<i class='fa-solid fa-chevron-right'></i>"
  ],
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

$(".view-office-list").owlCarousel({
  loop: true,
  margin: 20,
  nav: true,
  navText: [
    "<i class='fa-solid fa-chevron-left'></i>",
    "<i class='fa-solid fa-chevron-right'></i>"
  ],
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
      items: 3
    },
    992: {
      items: 4
    }
  }
});

$(".box-image").each(function () {
  const $box = $(this);
  const $carousel = $box.find(".box-image-slide");
  const $current = $box.find(".controls .current");
  const $total = $box.find(".controls .total");

  $carousel.owlCarousel({
    items: 1,
    loop: true,
    nav: true, // bật nav
    dots: false,
    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>'
    ],
    onInitialized: update,
    onTranslated: update
  });

  function update(event) {
    const total = event.item.count;
    const index =
      ((event.item.index - event.relatedTarget._clones.length / 2 + total) %
        total) +
      1;
    $current.text(index);
    $total.text(total);
  }
});

function initGalleryCarousel() {
  $(".page-gallery-list").each(function () {
    const $carousel = $(this);

    if ($(window).width() < 768) {
      if (!$carousel.hasClass("owl-loaded")) {
        $carousel.addClass("owl-carousel owl-theme");
        $carousel.owlCarousel({
          items: 1,
          margin: 0,
          loop: true,
          nav: false,
          dots: true
        });
      }
    } else {
      if ($carousel.hasClass("owl-loaded")) {
        $carousel.trigger("destroy.owl.carousel");

        // Gỡ bỏ các lớp và wrap DOM Owl đã thêm
        $carousel.removeClass("owl-carousel owl-theme owl-loaded owl-theme");
        $carousel.find(".owl-stage-outer").children().unwrap();
        $carousel.find(".owl-stage").children().unwrap();
        $carousel.find(".owl-item").children().unwrap();
      }
    }
  });
}

$(document).ready(function () {
  initGalleryCarousel();

  // Dùng debounce tránh gọi liên tục khi resize
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initGalleryCarousel, 200);
  });
});

//popup detail tour
function openPopup(id) {
  document.getElementById(id).style.display = "flex";
  document.body.classList.add("ov-hidden");
}

// Hàm đóng popup
function closePopups() {
  document.querySelectorAll(".popup-overlay").forEach((popup) => {
    popup.style.display = "none";
    document.body.classList.remove("ov-hidden");
  });
}

// Gán sự kiện click
document.addEventListener("DOMContentLoaded", function () {
  var btnReserve = document.getElementById("btnReserve");
  var btnModify = document.getElementById("btnModify");

  if (btnReserve) {
    btnReserve.addEventListener("click", function () {
      openPopup("popupReserve");
      document.body.classList.add("ov-hidden");
    });
  }

  if (btnModify) {
    btnModify.addEventListener("click", function () {
      openPopup("popupModify");
      document.body.classList.add("ov-hidden");
    });
  }
});
// Đóng popup khi click vào dấu ×
document.querySelectorAll(".popup-overlay .close").forEach((btn) => {
  btn.addEventListener("click", closePopups);
});

// Đóng popup khi click ra ngoài vùng form
document.querySelectorAll(".popup-overlay").forEach((popup) => {
  popup.addEventListener("click", function (e) {
    if (e.target === this) closePopups();
  });
});

//tạo mục lục
document.addEventListener("DOMContentLoaded", function () {
  const content = document.querySelector(".blogs-detail-content");
  const tocContainer = document.getElementById("toc-container");
  const headings = content.querySelectorAll("h2, h3");

  if (headings.length === 0) return;

  let tocHTML =
    '<h3 class="toc-head" style="cursor: pointer;">Sommaire</h3><ul class="toc-list">';

  headings.forEach((heading, index) => {
    const level = heading.tagName.toLowerCase();
    const safeText = heading.innerText
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    const id = `heading-${index}-${safeText}`;
    heading.setAttribute("id", id);
    const indent = level === "h3" ? ' style="margin-left:20px;"' : "";
    tocHTML += `<li${indent}><a href="#${id}">${heading.innerText}</a></li>`;
  });

  tocHTML += "</ul>";
  tocContainer.innerHTML = tocHTML;

  // Toggle ẩn/hiện TOC list khi click vào tiêu đề
  const tocHead = document.querySelector(".toc-head");
  const tocList = document.querySelector(".toc-list");

  tocHead.addEventListener("click", function () {
    tocList.classList.toggle("hidden");
    tocHead.classList.toggle("open");
  });
});
