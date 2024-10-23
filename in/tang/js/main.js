$(document).ready(function () { //문서준비이벤트 시작


    //depth2

    $('.depth2,.depth2_bg').hide();
    $('.gnb > li').mouseenter(function () {
        $('.depth2,.depth2_bg').stop().slideDown();
    });
    $('.gnb > li').mouseleave(function () {
        $('.depth2,.depth2_bg').stop().slideUp();
    });

    //메인비주얼 슬라이드
    const mv = new Swiper(".main_visual", {
        autoplay: {
            delay: 5000, //5초
            disableOnInteraction: false,
        },
        loop: true,
        speed: 1000, //1초

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    const mvv = new Swiper(".mySwiper", {
        autoplay: {
            delay: 5000, //5초
            disableOnInteraction: false,
        },
        loop: true,
        speed: 1000, //1초

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });





    /*     const notice_list = new Swiper(".slide_img_in", {
            autoplay: {
                delay: 0, //3초

                disableOnInteraction: false,
            },
            direction: 'vertical',
            slidesPerView: 2,
            loop: true,
            speed: 3000, //0.8초
            simulateTouch: false,
            on: {
                slideChangeTransitionStart: function () {
                    this.wrapperEl.style.transitionTimingFunction = 'linear';
                },
            },
        }); */
    /*     const vertical_img = new Swiper(".slide_img_in2", {
            autoplay: {
                delay: 0, //3초
                reverseDirection: true,
                disableOnInteraction: false,
            },
            direction: 'vertical',
            slidesPerView: 2,
            loop: true,
            speed: 3000, //0.8초
            simulateTouch: false,
            on: {
                slideChangeTransitionStart: function () {
                    this.wrapperEl.style.transitionTimingFunction = 'linear';
                },
            },
        }); */


    const sns_list = new Swiper(".sec1_in", {
        autoplay: {
            delay: 3000, //3초
            disableOnInteraction: false,
        },
        slidesPerView: 4.2,
        loop: true,
        speed: 1000, //0.8초
        spaceBetween: 40,
        /* on: {
            slideChangeTransitionStart: function () {
                this.wrapperEl.style.transitionTimingFunction = 'linear';
            },
        }, */
    });
    //-----------------여기서부터 gnb--------------

    const indicator = document.querySelector('.nav-indicator');
    const items = document.querySelectorAll('.nav-item');

    function handleIndicator(el) {
        items.forEach(item => {
            item.classList.remove('is-active');
            item.removeAttribute('style');
        });

        indicator.style.width = `${el.offsetWidth}px`;
        indicator.style.left = `${el.offsetLeft}px`;
        indicator.style.backgroundColor = el.getAttribute('active-color');

        el.classList.add('is-active');
        el.style.color = el.getAttribute('active-color');
    }

    items.forEach((item, index) => {
        item.addEventListener('mouseover', (e) => {
            handleIndicator(e.target)
        });
        item.classList.contains('is-active') && handleIndicator(item);
    });


    // -----------여기서부터 슬라이딩----------------
    var swiper = new Swiper(".slide_btn", {
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,

    });
    var swiper21 = new Swiper(".sec2_slide", {
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        thumbs: {
            swiper: swiper,
        },
    });
}); //문서준비이벤트 종료