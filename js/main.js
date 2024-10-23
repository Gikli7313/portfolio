$(document).ready(function () {
  // ----------------반딧불-----------
  (function () {
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame;

    var canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "lighter";

    var particles = [];
    var frameId;
    var params;

    function Particle(size) {
      this.x = canvas.width * Math.random();
      this.y = canvas.height * Math.random();
      this.vx = 0;
      this.vy = 0;
      this.r = getRandom(-360, 360);
      this.gravity = getRandom(0.05, 0.1);
      this.life = 0;
      this.maxlife = 500;
      this.degree = getRandom(-360, 360);
      this.size = Math.floor(getRandom(size * 0.1, size / 2));
    }

    Particle.prototype.draw = function () {
      this.degree += getRandom(-2, 2);
      this.vx = Math.cos((this.degree * Math.PI) / this.r) * 2 * this.gravity;
      this.vy = Math.sin((this.degree * Math.PI) / this.r) * 2 * this.gravity;

      this.x += this.r < 0 ? this.vx : -this.vx;
      this.y += this.r < 0 ? this.vy : -this.vy;

      if (
        this.x < 0 ||
        this.x > canvas.width ||
        this.y < 0 ||
        this.y > canvas.height
      ) {
        return true;
      }

      var grd = ctx.createRadialGradient(
        this.x + this.size / 2,
        this.y + this.size / 2,
        0,
        this.x + this.size / 2,
        this.y + this.size / 2,
        this.size / 2
      );
      grd.addColorStop(0, "rgba(234, 255, 255, 1)");
      grd.addColorStop(0, "rgba(234, 255, 79, 0.9)");
      grd.addColorStop(0.8, "rgba(204, 255, 79, 0.1)");
      grd.addColorStop(1, "rgba(204, 255, 79, 0)");
      ctx.fillStyle = grd;
      ctx.globalAlpha = Math.abs(
        Math.sin((this.life * Math.PI) / (Math.abs(this.r / 4) + 30))
      );
      ctx.beginPath();
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.closePath();
      ctx.fill();
      this.life++;

      if (this.life >= this.maxlife) {
        return true;
      }
      return false;
    };

    function setGUI() {
      params = {
        amount: 1,
        bg_color: "#000337",
        size: 20,
      };
    }
    setGUI();

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 1 / (15 - params.amount)) {
        particles.push(new Particle(params.size));
      }

      for (var i = particles.length - 1; i >= 0; i--) {
        if (particles[i].draw()) {
          particles.splice(i, 1);
        }
      }

      frameId = requestAnimationFrame(loop);
    }

    loop();

    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }
  })();

  // -----스와이프-------
  const sw_txt = new Swiper(".swiper_txt", {
    speed: 1000,
    loop: true,
    effect: "fade",
    allowTouchMove: false,

    fadeEffect: {
      crossFade: true,
    },

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const sw_img = new Swiper(".web_img", {
    speed: 1000,
    loop: true,
    allowTouchMove: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // -------이미지 슬라이드
  function applyHoverEffect() {
    $(".case a")
      .off("mouseenter mouseleave")
      .on("mouseenter", function () {
        let imgH = $(this).find("img").height();
        let caseH = $(this).height();
        $(this)
          .find("img")
          .css({
            top: -(imgH - caseH),
          });
        sw_txt.autoplay.stop();
        sw_img.autoplay.stop();
      })
      .on("mouseleave", function () {
        $(this).find("img").css({
          top: 0,
        });
        sw_txt.autoplay.start();
        sw_img.autoplay.start();
      });
  }

  applyHoverEffect();

  sw_txt.on("slideChange", function () {
    applyHoverEffect();
  });

  // ---프로필 박스 뷰포트----------
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".profile_box").addClass("show");
    } else {
      $(".profile_box").removeClass("show");
    }
    if ($(this).scrollTop() > 800) {
      $(".content_up").addClass("show");
    } else {
      $(".content_up").removeClass("show");
    }
    if ($(this).scrollTop() > 1300) {
      $(".swipers").addClass("show");
    } else {
      $(".swipers").removeClass("show");
    }
    if ($(this).scrollTop() > 900) {
      $("#gotop").css({
        display: "block",
      });
    } else {
      $("#gotop").css({
        display: "none",
      });
    }
  });

  // ----------- 이메일 복사-------------
  var copyButton = document.querySelector(".copy-button");
  var textElement = document.getElementById("text-to-copy");

  copyButton.addEventListener("click", function () {
    var textToCopy = textElement.innerText;
    copyToClipboard(textToCopy, copyButton);
  });

  function copyToClipboard(text, buttonElement) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    buttonElement.innerText = "Copied!";
    setTimeout(function () {
      buttonElement.innerText = "Copy";
    }, 2000);
  }
  // -------------버튼----------------
  let buttons = document.querySelectorAll(".btn");

  function addSpans(btn) {
    var span1 = document.createElement("span");
    span1.className = "span1";

    var span2 = document.createElement("span");
    span2.className = "span2";

    btn.appendChild(span1);
    btn.appendChild(span2);

    return { span1, span2 };
  }

  function mouseEnter(span) {
    span.style.opacity = "1";
  }

  function mouseLeave(span) {
    span.style.opacity = "0";
  }

  function mouseDown(span) {
    span.style.transition = "box-shadow .6s";
    span.style.boxShadow =
      "0 0 10rem 4rem hsl(0, 0%, 94%), inset 0 0 1rem hsl(0, 0%, 94%)";
    span.style.width = "2rem";
    span.style.height = "2rem";
  }

  function mouseUp(span) {
    span.style.transition = "box-shadow 0s";
    span.style.boxShadow =
      "0 0 0 0 hsl(0, 0%, 94%), inset 0 0 1rem hsl(0, 0%, 94%)";
    span.style.width = "0";
    span.style.height = "0";
  }

  function mouseMove(span, e) {
    span.style.top = e.offsetY + "px";
    span.style.left = e.offsetX + "px";
  }

  buttons.forEach((btn) => {
    const { span1, span2 } = addSpans(btn);

    // Mouse events for span1
    if (window.navigator.userAgent.indexOf("Edge") === -1) {
      btn.addEventListener("mouseenter", function () {
        mouseEnter(span1);
      });
      btn.addEventListener("mouseleave", function () {
        mouseLeave(span1);
      });
      btn.addEventListener("mousemove", function (e) {
        mouseMove(span1, e);
      });
    } else {
      span1.style.display = "none";
    }

    // Mouse events for span2
    btn.addEventListener("mouseleave", function () {
      mouseUp(span2);
    });
    btn.addEventListener("mousemove", function (e) {
      mouseMove(span2, e);
    });
    btn.addEventListener("mousedown", function () {
      mouseDown(span2);
    });
    btn.addEventListener("mouseup", function () {
      mouseUp(span2);
    });
  });
  // ========프레임워크버튼------------
  $(".frame_btn a").click(function (e) {
    e.preventDefault();
    $(".frame_btn a").removeClass("active");
    $(this).addClass("active");
    if ($(this).hasClass("react-btn")) {
      $(".frame_react").show();
      $(".frame_vue").hide();
    } else {
      $(".frame_react").hide();
      $(".frame_vue").show();
    }
  });
  // ------------마우스0-----------
  // declares variables for big circle and small circle in cursor
  /* var cursorBig = document.querySelector('.big');
var cursorSmall = document.querySelector('.small');
var a = document.querySelectorAll('a');

// positions the two circles in a desired placement
document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursorBig.style.transform = `translate3d(${x - cursorBig.offsetWidth / 2}px, ${y - cursorBig.offsetHeight / 2}px, 0)`;
  cursorSmall.style.left = x + 'px';
  cursorSmall.style.top = y + 'px';
});

// adds class when cursor clicks
document.addEventListener('mousedown', function(){
  cursorBig.classList.add('click');
  cursorSmall.classList.add('hover__small');
});

// removes class when cursor stops clicking
document.addEventListener('mouseup', function(){
  cursorBig.classList.remove('click');
  cursorSmall.classList.remove('hover__small');
});

// adds and removes class when mouse hovers and stops hovering
a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursorBig.classList.add('hover__big');
    cursorSmall.classList.add('hover__small');
  });
  item.addEventListener('mouseleave', () => {
    cursorBig.classList.remove('hover__big');
    cursorSmall.classList.remove('hover__small');
  });
});
 */
});
