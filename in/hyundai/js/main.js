$(function () {
  $(".gnb > li").hover(
    function () {
      var depth2 = $(this).find(".depth2");
      var depth2Height = depth2.outerHeight(true);
      $(".depth_bg").stop(true, true).css("height", depth2Height).show();
      depth2.css("display", "flex").stop(true, true).show();
    },
    function () {
      $(this).find(".depth2").css("display", "none");
      $(".depth_bg").stop(true, true).hide();
    }
  );

  $(".depth2 , .depth_bg").css("display", "none");
  const squareImage = document.getElementById("square-image");
  const squareDate = document.getElementById("square-date");
  const squareTitle = document.getElementById("square-title");
  const squareBox = $(".square-box");
  const squareBg = $(".square_box_bg");

  let currentIndex = 0;
  let eventSwiper, brandSwiper;

  function updateSquareBox(slide, direction) {
    if (!slide || !slide.dataset) {
      return;
    }

    const {
      image: newImage,
      date: newDate,
      title: newTitle,
      backgroundColor: newBackgroundColor,
    } = slide.dataset;

    const slideClass = direction === "left" ? "slide-left" : "slide-right";
    squareBox.addClass(slideClass);

    setTimeout(() => {
      if (squareImage) squareImage.src = newImage;
      if (squareDate) squareDate.textContent = newDate;
      if (squareTitle) squareTitle.textContent = newTitle;
      if (newBackgroundColor)
        squareBg.css("background-color", newBackgroundColor);

      squareBox.removeClass("slide-left slide-right");
      squareBox.addClass(direction === "left" ? "slide-right" : "slide-left");
    }, 250);
  }

  const eventSlides = document.querySelectorAll(".event .swiper-slide");
  const brandSlides = document.querySelectorAll(".brand .swiper-slide");

  if (eventSlides.length > 0 && brandSlides.length > 0) {
    const sec2_list = new Swiper(".event", {
      slidesPerView: 1.2,
      speed: 1000,
      loop: true,
      spaceBetween: 30,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        500: {
          spaceBetween: 10,
          slidesPerView: 1.2,
        },
        640: {
          spaceBetween: 20,
          slidesPerView: 2,
        },
        1024: {
          spaceBetween: 30,
          slidesPerView: 3,
        },
        1250: {
          spaceBetween: 30,
          slidesPerView: 4,
        },
      },
    });

    const sec_list = new Swiper(".brand", {
      slidesPerView: 3,
      speed: 1000,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        500: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
      on: {
        init: function () {
          updateSquareBox(this.slides[this.activeIndex], "right");
        },
        slideChange: function () {
          updateSquareBox(
            this.slides[this.realIndex],
            this.activeIndex > this.previousIndex ? "left" : "right"
          );
        },
      },
    });
  }

  // ======달력======

  let currentDate = new Date();
  let selectedDate = null;

  // .calendar 요소가 존재할 경우에만 캘린더 스크립트 실행
  const calendarElement = document.querySelector(".calendar");
  if (calendarElement) {
    function generateCalendar(year, month) {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDay = firstDay.getDay();

      const monthNames = [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ];

      const currentMonthElement = document.getElementById("currentMonth");
      if (currentMonthElement) {
        currentMonthElement.textContent = `${year}년 ${monthNames[month]}`;
      }

      const calendarBody = document.querySelector(".calendar-table");
      if (calendarBody) {
        // 캘린더 테이블이 존재할 경우에만 실행
        while (calendarBody.rows.length > 1) {
          calendarBody.deleteRow(1);
        }

        let date = 1;
        for (let i = 0; i < 6; i++) {
          const row = calendarBody.insertRow();
          for (let j = 0; j < 7; j++) {
            const cell = row.insertCell();
            if (i === 0 && j < startingDay) {
              cell.textContent = "";
            } else if (date > daysInMonth) {
              cell.textContent = "";
            } else {
              cell.textContent = date;

              if (cell) {
                // cell이 존재할 경우에만 이벤트 리스너 추가
                cell.addEventListener(
                  "click",
                  (function (day) {
                    return function () {
                      selectDate(year, month, day);
                    };
                  })(date)
                );
              }

              const today = new Date();
              if (
                date === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
              ) {
                cell.classList.add("current-date");
              }

              if (
                selectedDate &&
                date === selectedDate.getDate() &&
                month === selectedDate.getMonth() &&
                year === selectedDate.getFullYear()
              ) {
                cell.classList.add("selected-date");
              }

              date++;
            }
          }
        }
      }
    }

    function selectDate(year, month, day) {
      selectedDate = new Date(year, month, day);
      updateCalendar();
    }

    function updateCalendar() {
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }

    const prevButton = document.querySelector(".prev-month");
    const nextButton = document.querySelector(".next-month");

    // 이전 달 버튼이 존재할 경우에만 이벤트 리스너 추가
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        selectedDate = null;
        updateCalendar();
      });
    }

    // 다음 달 버튼이 존재할 경우에만 이벤트 리스너 추가
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        selectedDate = null;
        updateCalendar();
      });
    }

    // 캘린더 초기화
    updateCalendar();
  } else {
    console.warn(".calendar 요소가 존재하지 않습니다."); // 경고 메시지
  }

  // ============배경==========
});
