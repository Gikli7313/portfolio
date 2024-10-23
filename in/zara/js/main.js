$(document).ready(function () { //문서준비이벤트 시작


    //depth2
    $('.overlay').hide();

    $('.gnb').mouseenter(function () {
        $('.overlay').stop().fadeIn(100);
    });
    $('.gnb').mouseleave(function () {
        $('.overlay').stop().fadeOut(100);;
    });
$('.gnb').hover(
    function() {
        $('.login a').css({
            color:'#000',
        });
    },
    function(){
        $('.login a').css({
            color: '#fff'
        })
    }
);
/* $(".gnb").hover(
    function () {
      $(".login a").css({
        color: "red",
      });
    },
    function () {
      $(".login a").css({
        color: "white",
      });
    }
  ); */

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

    /* 
        //모달팝업
        $('.modal').hide();

        $('.btn_play').click(function(){
            $('.modal').show();
            $('body').css({'overflow':'hidden'});
        });

        $('.btn_close').click(function(){
            $('.modal').hide();
            $('body').css({'overflow':'auto'});
        });
     */

    //공지사항 슬라이드
    const notice_list = new Swiper(".slide_img_in", {
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
    });
    const vertical_img = new Swiper(".slide_img_in2", {
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
    });


    //sns 슬라이드
    const sns_list = new Swiper(".new_item_rol", {
        autoplay: {
            delay: 0, //3초
            disableOnInteraction: false,
        },
        slidesPerView: 5,
        loop: true,
        speed: 8000, //0.8초
        simulateTouch: false,
        on: {
            slideChangeTransitionStart: function () {
                this.wrapperEl.style.transitionTimingFunction = 'linear';
            },
        },
    });
    const rol_list = new Swiper(".new_item_rol_2", {
        autoplay: {
            delay: 0, //3초
            disableOnInteraction: false,
        },
        slidesPerView: 5,
        loop: true,
        speed: 8000, //0.8초
        simulateTouch: false,
        on: {
            slideChangeTransitionStart: function () {
                this.wrapperEl.style.transitionTimingFunction = 'linear';
            },
        },
    });


    //member 슬라이드
    const member_list = new Swiper(".new_slide", {

        loop: true,
        speed: 1000, //1초
        slidesPerView: 4.5,
        slidesPerGroup: 5,
    });



}); //문서준비이벤트 종료