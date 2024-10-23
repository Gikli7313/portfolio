$(function () {
  const sec2_list = new Swiper(".sec2_swiper", {
    slidesPerView: 1,
    speed: 1000, // 1초
    spaceBetween: 40,
    allowTouchMove: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var sec2Container = document.querySelector(".sec2_swiper");

  // 마우스 움직임 이벤트 리스너 추가
  sec2Container.addEventListener("mousemove", function (event) {
    var rect = sec2Container.getBoundingClientRect();
    var mouseX = event.clientX - rect.left; // Swiper 영역 내에서 마우스 X 좌표
    var centerX = rect.width / 2; // Swiper 영역의 중앙 X 좌표

    if (mouseX > centerX) {
      // 마우스가 중앙 오른쪽에 있을 때
      sec2Container.style.cursor = "url(image/arrow2.png), auto"; // 오른쪽 커서 스타일
    } else {
      // 마우스가 중앙 왼쪽에 있을 때
      sec2Container.style.cursor = "url(image/arrow1.png), auto"; // 오른쪽 커서 스타일
    }
  });
  // ==========헤드스크롤===========
  let lastScrollTop = 0;

  $(window).on("scroll", function () {
    let currentScroll = $(this).scrollTop();

    if (currentScroll > lastScrollTop) {
      $("#header .menu_bar").fadeOut();
    } else {
      $("#header .menu_bar").slideDown();
    }

    lastScrollTop = currentScroll;
  });
  // =============gnb=========
  $(".depth3, .depth3_bg").hide();

  // 마우스를 gnb > ul > li에 올렸을 때
  $(".gnb > li").on("mouseenter", function () {
    $(this).find(".depth3").stop(true, true).show(); // li 내부의 depth3 슬라이드 다운
    $(".depth3_bg").stop(true, true).show(); // 외부에 있는 depth3_bg 슬라이드 다운
  });

  // 마우스를 뗐을 때
  $(".gnb  > li").on("mouseleave", function () {
    $(this).find(".depth3").stop(true, true).hide();
    $(".depth3_bg").stop(true, true).hide();
  });
  // 클릭 이벤트 리스너 추가
  sec2Container.addEventListener("click", function (event) {
    var rect = sec2Container.getBoundingClientRect();
    var mouseX = event.clientX - rect.left; // Swiper 영역 내에서 마우스 X 좌표
    var centerX = rect.width / 2; // Swiper 영역의 중앙 X 좌표

    if (mouseX > centerX) {
      // 마우스가 중앙 오른쪽에 있을 때
      sec2_list.slideNext(); // 다음 슬라이드로 이동
    } else {
      // 마우스가 중앙 왼쪽에 있을 때
      sec2_list.slidePrev(); // 이전 슬라이드로 이동
    }
  });

  const sec4_list = new Swiper(".sec4_swiper", {
    /* autoplay: {
        delay: 3000, // 3초
        disableOnInteraction: false,
    }, */
    slidesPerView: 4,
    speed: 1000, // 1초
    spaceBetween: 20,
    slidesPerGroup: 3,
    loop: true,
  });

  // =========사이드메뉴=========
  const list = document.querySelectorAll(".list");
  list.forEach((item) => {
    item.addEventListener("mouseover", () => {
      list.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    });

    item.addEventListener("mouseout", () => {
      item.classList.remove("active");
    });
  });

  // =======탭메뉴===========
  $(".sec3_tap li a").on("click", function (e) {
    e.preventDefault(); // 기본 앵커 동작 막기

    // 모든 탭의 "on" 클래스 제거
    $(".sec3_tap li a").removeClass("on");

    // 클릭한 탭에 "on" 클래스 추가
    $(this).addClass("on");

    // 모든 콘텐츠 숨기기
    $(".sec3_intxt").removeClass("active");

    // 클릭한 탭에 해당하는 콘텐츠만 보여주기
    const target = $(this).data("target");
    $("#" + target).addClass("active");
  });

  // ======햄버거============

  const menuActive = (elButton, elMenu) => {
    const button = elButton;
    const menu = elMenu;

    button.addEventListener("click", () => {
      button.classList.toggle("is-active");
      menu.classList.toggle("is-active");
    });
  };

  menuActive(
    document.getElementById("MenuButton"),
    document.getElementById("MenuWrap")
  );
  //   =========햄버거 메뉴============
  const $firstSubMenu = $(".menu-nav__item.on").data("target");
  $("#" + $firstSubMenu)
    .show()
    .addClass("active");

  $(".menu-nav__item > a").on("mouseenter", function () {
    const $item = $(this).parent();
    const target = $item.data("target");
    const $targetSubMenu = $("#" + target);

    $(".depth2").hide().removeClass("active");

    $targetSubMenu.show().addClass("active");
  });

  $(".menu-nav").on("mouseleave", function () {
    const $activeSubMenu = $(".depth2.active");
    $activeSubMenu.show();
  });

  //   =====검색======

  $(".search").each(function () {
    var self = $(this);
    var div = self.children(".field");
    var placeholder = div.children("input").attr("placeholder");
    var placeholderArr = placeholder.split(/ +/);
    if (placeholderArr.length) {
      var spans = $("<div />");
      $.each(placeholderArr, function (index, value) {
        spans.append($("<span />").html(value + "&nbsp;"));
      });
      div.append(spans);
    }
    self.click(function () {
      self.addClass("open");
      setTimeout(function () {
        self.find("input").focus();
        self.find("input").on("keyup", function () {
          self.toggleClass(
            "loading",
            self.find("input").val().toString().length > 3
          );
        });
      }, 750);
    });
    $(document).click(function (e) {
      if (!$(e.target).is(self) && !jQuery.contains(self[0], e.target)) {
        self.removeClass("open loading");
        setTimeout(function () {
          self.find("input").val("");
        }, 400);
      }
    });
  });
});
