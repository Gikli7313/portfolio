$(document).ready(function () {
    
  $('.depth2,.depth2_bg').hide();
  $('.gnb > li').mouseenter(function(){
      $('.depth2,.depth2_bg').stop().slideDown();
  });
  $('.gnb > li').mouseleave(function(){
      $('.depth2,.depth2_bg').stop().slideUp();
  });

  window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 0) {
        header.style.transform = 'translateY(0)';
    } else {
        header.style.transform = 'translateY(-100%)';
    }
});


/* window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 0) {
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // 스크롤 시 배경이 나타남
  } else {
      header.style.backgroundColor = 'transparent'; // 최상단에서는 배경이 투명
  }
}); */



/*   window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 0) {
        header.style.backgroundColor = 'transparent'; // 스크롤 시 배경이 투명해짐
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // 최상단에서 배경 색상 복원
    }
}); */





/* swiper */
const swiper = new Swiper('.main_visual', {
    // Optional parameters
    /* direction: 'vertical', */
    autoplay: {
  delay: 5000,
},
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  
    /* effect: 'fade' */
  });
  
  /* sns 슬라이드 */
  const sns_list = new Swiper(".event_swiper", {
    autoplay: {
        Delay: 2500, //3초
        disableOnInteraction: false,
      },
      loop: true,
      speed: 1500, //1초
      slidesPerView: 3,
      spaceBetween: 50,
      
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // spaceBetween : 20,
  });
  const gall = new Swiper(".gallery_slide", {
    autoplay: {
        Delay: 2500, //3초
        disableOnInteraction: false,
      },
      loop: true,
      speed: 1000, //1초
      slidesPerView: 2,
      spaceBetween: 20,
      simulateTouch: false,
      
    // spaceBetween : 20,
  });
})