$(function () {
  let lastScrollTop = 0;

  $(window).on('scroll', function() {
    let currentScroll = $(this).scrollTop();

    if (currentScroll > lastScrollTop) {
      $('#header').fadeOut(); 
    } else {
      $('#header').slideDown(); 
    }

    lastScrollTop = currentScroll;
  });

  const tap = new Swiper(".tap_menu", {
    slidesPerView: 4.5,
    speed: 1000, // 1초
    spaceBetween:10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  // =========사이드메뉴=========
  const list = document.querySelectorAll('.list');
  list.forEach(item => {
    item.addEventListener('mouseover', () => {
      list.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
    });

    item.addEventListener('mouseout', () => {
      item.classList.remove('active');
    });
  });

  // =======탭메뉴===========
  $('.swiper-slide').first().addClass('on');
  $('.info > li').first().addClass('active');

  $('.swiper-slide').on('click', function () {

      $('.swiper-slide').removeClass('on');
      $(this).addClass('on');

      $('.info > li').removeClass('active');
      const target = $(this).data('target');
      console.log('Target content ID:', target);
      $('#' + target).addClass('active');
  });
  // ======햄버거============

  const menuActive = (elButton, elMenu) => {
    const button = elButton;
    const menu = elMenu;

    button.addEventListener('click', () => {
      button.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
  };

  menuActive(document.getElementById('MenuButton'), document.getElementById('MenuWrap'));
  //   =========햄버거 메뉴============
    const $firstSubMenu = $('.menu-nav__item.on').data('target');
    $('#' + $firstSubMenu).show().addClass('active');

$('.menu-nav__item > a').on('mouseenter', function() {
    const $item = $(this).parent();
    const target = $item.data('target');
    const $targetSubMenu = $('#' + target);

    $('.depth2').hide().removeClass('active');

    $targetSubMenu.show().addClass('active');
});

$('.menu-nav').on('mouseleave', function() {
    const $activeSubMenu = $('.depth2.active');
    $activeSubMenu.show();
});


  //   =====검색======
  
  $('.search').each(function() {
    var self = $(this);
    var div = self.children('.field');
    var placeholder = div.children('input').attr('placeholder');
    var placeholderArr = placeholder.split(/ +/);
    if(placeholderArr.length) {
        var spans = $('<div />');
        $.each(placeholderArr, function(index, value) {
            spans.append($('<span />').html(value + '&nbsp;'));
        });
        div.append(spans);
    }
    self.click(function() {
        self.addClass('open');
        setTimeout(function() {
            self.find('input').focus();
            self.find('input').on('keyup', function() {
                self.toggleClass('loading', (self.find('input').val().toString().length > 3));
            });
        }, 750);
    });
    $(document).click(function(e) {
        if(!$(e.target).is(self) && !jQuery.contains(self[0], e.target)) {
            self.removeClass('open loading');
            setTimeout(function() {
                self.find('input').val('');
            }, 400);
        }
    });
});


});