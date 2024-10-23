$(function () {
  AOS.init();
  // 부모에 마우스 호버 시
  $(".header_sns img").hover(
    function () {
      $(".header_sns img").not(this).css("opacity", "0.6");
      $(this).css("opacity", "1");
    },
    function () {
      $(".header_sns img").css("opacity", "1");
    }
  );
  const sec2_list = new Swiper(".main_mv", {
    slidesPerView: 1,
    speed: 1000,
    // loop: true,
    autoplay: {
      delay: 7000, // 자동 재생 대기 시간 (2500ms = 2.5초)
      disableOnInteraction: false, // 사용자가 상호작용 해도 자동 재생 유지
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: false,
    },
  });
  // ===========햄버거==========
  $("#toggle").click(function () {
    $("#toggle .bar").toggleClass("animate");
    $("#ham").toggleClass("overlay");

    // body의 overflow 속성 토글
    $("body").toggleClass("no-scroll");
  });

  // ========아티스트 버튼==========

  function initializeToggle() {
    const toggleButton = document.getElementById("toggleButton");
    const artistList = document.getElementById("artistList");
    if (toggleButton && artistList) {
      toggleButton.addEventListener("click", function () {
        if (artistList.classList.contains("expanded")) {
          artistList.classList.remove("expanded");
          toggleButton.textContent = "펼치기";
        } else {
          artistList.classList.add("expanded");
          toggleButton.textContent = "접기";
        }
      });
    } else {
    }
  }

  //===========무한로딩============
  document.addEventListener("DOMContentLoaded", initializeToggle);
  window.addEventListener("load", initializeToggle);
  let page = 1;
  const albumsPerLoad = 12;
  let loading = false;

  function loadMoreAlbums() {
    if (loading) return;
    loading = true;

    const loadingElement = document.getElementById("loading");
    if (loadingElement) loadingElement.style.display = "block";

    setTimeout(() => {
      const albumWrap = document.querySelector(".album_wrap");
      const allInners = albumWrap.querySelectorAll(".inner");
      const lastInner = allInners[allInners.length - 1];

      if (lastInner) {
        const clone = lastInner.cloneNode(true);
        albumWrap.insertBefore(clone, loadingElement);
      }

      page++;
      loading = false;
      if (loadingElement) loadingElement.style.display = "none";
    }, 1000); 
  }

  function handleScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      loadMoreAlbums();
    }
  }

  window.addEventListener("scroll", handleScroll);
});
