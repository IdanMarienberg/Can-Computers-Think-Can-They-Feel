// スクロール
$(function() {
  $('a[href^=#]').click(function() {
    var speed = 400;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - 0;
    $('html,body').animate({
      scrollTop: position
    }, speed, 'swing');
    return false;
  });
});

// アニメーション
$(function() {
  $('.fadeUp').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $(this).stop().addClass('fadeInUp');
    } else {
      $(this).stop().removeClass('');
    }
  });
});

jQuery(function($) {

  /******************************************
  init
  ******************************************/

  /******************************************
  window load
  ******************************************/
  $(window).on('load', function() {
    $('.fadein_up').waypoint(function(direction) {
      var activePoint = $(this.element);
      //scroll down
      if (direction === 'down') {
        activePoint.addClass('fadeInUp');
      } else {
        activePoint.removeClass('');
      }
    }, {
      offset: '80%'
    });
    $('.effect').waypoint(function(direction) {
      var activePoint = $(this.element);
      //scroll down
      if (direction === 'down') {
        activePoint.addClass('show'),
          setTimeout(function() {
            activePoint.addClass("show2")
          }, 400);
      } else {
        activePoint.removeClass('');
      }
    }, {
      offset: '80%'
    });

  });

  /******************************************
  window resize
  ******************************************/
  $(window).on('resize', function() {

  });

  /******************************************
  window scroll
  ******************************************/
  $(window).on('scroll', function() {


  });

});



// 画像切り替え
$(function() {
  var $elem = $('.switch');
  var sp = '_sp.';
  var pc = '_pc.';
  var replaceWidth = 768;

  function imageSwitch() {
    var windowWidth = parseInt($(window).width());
    $elem.each(function() {
      var $this = $(this);
      if (windowWidth >= replaceWidth) {
        $this.attr('src', $this.attr('src').replace(sp, pc));
      } else {
        $this.attr('src', $this.attr('src').replace(pc, sp));
      }
    });
  }
  imageSwitch();

  var resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      imageSwitch();
    }, 200);
  });
});



// 電話番号リンク付与
if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)) {
  $(function() {
    $('.tel').each(function() {
      var str = $(this).html();
      if ($(this).children().is('img')) {
        $(this).html($('<a>').attr('href', 'tel:' + $(this).children().attr('alt').replace(/-/g, '')).append(str + '</a>'));
      } else {
        $(this).html($('<a>').attr('href', 'tel:' + $(this).text().replace(/-/g, '')).append(str + '</a>'));
      }
    });
  });
}



/*--------------------------------------------------------------------------*
 *
 *  SmoothScroll JavaScript Library V2
 *
 *  MIT-style license.
 *
 *  2007-2011 Kazuma Nishihata
 *  http://www.to-r.net
 *
 *--------------------------------------------------------------------------*/

new function() {

  var attr = "data-tor-smoothScroll"; //for html5 , if you can't use html5 , this value change "class"
  var attrPatt = /noSmooth/;
  var d = document; //document short cut

  /*
   *add Event
    -------------------------------------------------*/
  function addEvent(elm, listener, fn) {
    try { // IE
      elm.addEventListener(listener, fn, false);
    } catch (e) {
      elm.attachEvent(
        "on" + listener,
        function() {
          fn.apply(elm, arguments)
        }
      );
    }
  }

  /*
   *Start SmoothScroll
    -------------------------------------------------*/
  function SmoothScroll(a) {
    if (d.getElementById(a.rel.replace(/.*\#/, ""))) {
      var e = d.getElementById(a.rel.replace(/.*\#/, ""));
    } else {
      return;
    }

    //Move point
    var end = e.offsetTop
    var docHeight = d.documentElement.scrollHeight;
    var winHeight = window.innerHeight || d.documentElement.clientHeight
    if (docHeight - winHeight < end) {
      var end = docHeight - winHeight;
    }

    //Current Point
    var start = window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop || 0;


    end += -0;
    var flag = (end < start) ? "up" : "down";

    function scrollMe(start, end, flag) {
      setTimeout(
        function() {
          if (flag == "up" && start >= end) {
            start = start - (start - end) / 20 - 1;
            window.scrollTo(0, start)
            scrollMe(start, end, flag);
          } else if (flag == "down" && start <= end) {
            start = start + (end - start) / 20 + 1;
            window.scrollTo(0, start)
            scrollMe(start, end, flag);
          } else {
            scrollTo(0, end);
          }
          return;
        }, 10
      );

    }

    scrollMe(start, end, flag);

  }

  /*
   *Add SmoothScroll
    -------------------------------------------------*/
  addEvent(window, "load", function() {
    var anchors = d.getElementsByTagName("a");
    for (var i = 0, len = anchors.length; i < len; i++) {
      if (!attrPatt.test(anchors[i].getAttribute(attr)) &&
        anchors[i].href.replace(/\#[a-zA-Z0-9_]+/, "") == location.href.replace(/\#[a-zA-Z0-9_]+/, "")) {
        anchors[i].rel = anchors[i].href;
        anchors[i].href = "javascript:void(0)";
        anchors[i].onclick = function() {
          SmoothScroll(this)
        }
      }
    }
  });
}
