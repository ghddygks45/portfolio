var mql = window.matchMedia("all and (min-width: 768px)");

// 디바이스 체크
function deviceCheck() {
  if (mql.matches) {
    $("html").removeClass("mobile").addClass("desktop");
  } else {
    var varUA = navigator.userAgent.toLowerCase();
    if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
      $("html").removeClass("desktop").addClass("mobile ios-device");
    } else {
      $("html").removeClass("desktop").addClass("mobile");
    }
  }
}
deviceCheck();

// 초기 보여줄 개수 판단 함수
function workCount() {
  const width = window.innerWidth;
  if (width < 768) return 1; // 모바일
  if (width < 1024) return 2; // 태블릿
  return 3; // 데스크탑
}

$(function () {
  // 반응형 체크
  mql.addListener(function () {
    deviceCheck();
  });

  if ($("html").hasClass("mobile")) {
    // 모바일 일때
    $(document).on("click", ".gnb a", function (e) {
      e.preventDefault();
      $(".gnb_wrap").removeClass("open");
      $(".header_box .menu_btn_box").removeClass("active");
      $(".menu_btn_box").find(".blind").text("메뉴 열기");
    });
  } else {
    // PC 일때
  }

  $(document).on("click", ".header_box .menu_btn_box", function () {
    $(".gnb_wrap").toggleClass("open");
    $(this).toggleClass("active");
    if ($(this).hasClass("open")) {
      $(this).find(".blind").text("메뉴 닫기");
    } else {
      $(this).find(".blind").text("메뉴 열기");
    }
  });

  let lastScrollTop = 0;

  $(window).on("scroll", function () {
    let st = $(this).scrollTop();

    if (st === 0) {
      // 맨 위일 때 항상 헤더 보이기
      $(".header_wrap").removeClass("up shadow down");
    } else if (st > lastScrollTop) {
      // Scroll Down → 헤더 숨기기
      $(".header_wrap").removeClass("down").addClass("up");
    } else if (st < lastScrollTop) {
      // Scroll Up → 헤더 보이기
      $(".header_wrap").removeClass("up").addClass("down shadow");
    } else {
      $(".header_wrap").removeClass("up down shadow");
    }

    lastScrollTop = st;
  });

  // 백그라운드 비디오 속도
  $(".main_bg video").get(0).playbackRate = 0.5;
  // $(".work_bg video").get(0).playbackRate = 0.5;

  // gsap
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

  $(document).on("click", ".gnb a", function (e) {
    e.preventDefault(); // 기본 앵커 동작 방지

    const target = $(this).attr("href");
    const offsetTop = $(target).offset().top;

    gsap.to(window, {
      duration: 2,
      scrollTo: offsetTop,
      ease: "power4.inOut",
    });
  });

  // let tl = gsap.timeline();

  // tl.to(".profile", {x:600, duration: 2});
  // tl.to(".resume_box", {x:300, duration: 1});

  // 슬로건 애니메이션
  const slogan_items = $(".slogan_box [class^='time_ani']");
  const slogan_tl = gsap.timeline();

  slogan_items.each((index, el) => {
    slogan_tl.to(el, { opacity: 1, duration: 1 }).to(el, { opacity: 0, duration: 0.8, delay: 1 }); // 1초 유지 후 사라짐
  });

  slogan_tl.to(slogan_items, {
    onStart: () => {
      $(slogan_items).css("position", "relative");
    },
    duration: 1,
    opacity: 1,
  });

  // slogan_tl.to(slogan_items, { duration: 1, opacity: 1 });

  // tl.to(".slogan_box .time_ani1", { duration: 1, opacity: 1 })
  //   .to(".slogan_box .time_ani1", { duration: 0.8, opacity: 0, delay: 1 }) // 1초 유지 후 사라짐

  //   .to(".slogan_box .time_ani2", { duration: 1, opacity: 1 })
  //   .to(".slogan_box .time_ani2", { duration: 0.8, opacity: 0, delay: 1 })

  //   .to(".slogan_box .time_ani3", { duration: 1, opacity: 1 })
  //   .to(".slogan_box .time_ani3", { duration: 0.8, opacity: 0, delay: 1 })

  //   .to(".slogan_box .time_ani4", { duration: 1, opacity: 1 })
  //   .to(".slogan_box .time_ani4", { duration: 0.8, opacity: 0, delay: 1 });

  // GSAP 애니메이션

  const items = $(".work_list>li");

  // 초기 표시
  let RoadworkCount = workCount();

  // 로드 시 일부만 보여주기
  items.each((item, index) => {
    if (item < RoadworkCount) {
      $(index).fadeIn(); // display: block
    }
  });

  // 더보기 클릭 시 전체 보여주기
  $(document).on("click", ".work_more_btn", function () {
    items.each((item, index) => {
      $(index).fadeIn();
    });
    $(".work_more_btn").fadeOut();
  });

  $(window).on("resize", function () {
    const newCount = workCount(); // 현재 뷰포트 크기에 맞는 개수

    if ($(".work_more_btn").is(":visible")) {
      items.each(function (i) {
        if (i < newCount) {
          $(this).fadeIn();
        } else {
          $(this).fadeOut();
        }
      });
    }
  });

  // wroksection

  // 프로젝트 호버시 마우스 이미지 변경
  let cursorImgBox = $(".cursor .img_box");
  let workLinks = $(".skill_list a");

  // 커서 이동시 이미지박스 함께 이동
  $(document).on("mousemove", function (e) {
    cursorImgBox.stop().css({
      top: e.clientY + "px",
      left: e.clientX + "px",
    });
    cursorImgBox.stop().animate(
      {
        top: e.clientY,
        left: e.clientX,
      },
      2000
    );
  });

  // 모바일에서 터치 되었을 때 이미지 박스 이동
  $(document).on("touchstart", function (e) {
    e.preventDefault();
    let touch = e.originalEvent.touches[0];

    cursorImgBox.stop().css({
      top: touch.clientY + "px",
      left: touch.clientX + "px",
    });
  });

  workLinks.each(function () {
    const $target = $(this); // a를 반환
    const imageUrl = $target.data("img"); // data-img 속성 값
    const $cursorImg = $(imageUrl); // 선택자 문자열로 요소 찾기

    $target.on("mouseover touchstart", function () {
      cursorImgBox.addClass("on");
      $cursorImg.addClass("on");
    });

    $target.on("mouseout touchend", function () {
      cursorImgBox.removeClass("on");
      $cursorImg.removeClass("on");
    });
  });

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
});
