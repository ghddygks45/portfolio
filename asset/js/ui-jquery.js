/**************************************************
 * 반응형 디바이스 체크 (모바일/PC)
 **************************************************/

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

$(function () {
  // 반응형 체크
  mql.addListener(function () {
    deviceCheck();
  });

  /**************************************************
   * 메뉴 관련
   **************************************************/

  if ($("html").hasClass("mobile")) {
    // 모바일 인 경우
    $(document).on("click", ".gnb a", function (e) {
      e.preventDefault();
      $(".gnb_wrap").removeClass("open");
      $(".header_box .menu_btn_box").removeClass("active");
      $(".menu_btn_box").find(".blind").text("메뉴 열기");
    });
  } else {
    // PC 인 경우
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

  /**************************************************
   * 스크롤 방향에 따른 헤더 show/hide
   **************************************************/

  let lastScrollTop = 0;

  $(window).on("scroll", function () {
    let st = $(this).scrollTop();

    if (st === 0) {
      // 맨 위일 때 항상 헤더 보이기
      $(".header_wrap").removeClass("up shadow down");
    } else if (st > lastScrollTop) {
      // Scroll Down 헤더 숨기기
      $(".header_wrap").removeClass("down").addClass("up");
    } else if (st < lastScrollTop) {
      // Scroll Up 헤더 보이기
      $(".header_wrap").removeClass("up").addClass("down shadow");
    } else {
      $(".header_wrap").removeClass("up down shadow");
    }

    lastScrollTop = st;
  });

  /**************************************************
   * 백그라운드 비디오 속도
   **************************************************/
  const videoEl = $(".main_bg video").get(0);
  if (videoEl) {
    videoEl.playbackRate = 0.5;
  }
  // $(".main_bg video").get(0).playbackRate = 0.5;

  /**************************************************
   * GSAP 애니메이션
   **************************************************/
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

  // 메뉴 클릭 시 해당 섹션으로 이동
  $(document).on("click", ".gnb a", function (e) {
    e.preventDefault();

    const target = $(this).attr("href");
    const offsetTop = $(target).offset().top;

    gsap.to(window, {
      duration: 2,
      scrollTo: offsetTop,
      ease: "power4.inOut",
    });
  });

  // 슬로건 타임라인 애니메이션
  const slogan_items = $(".slogan_box [class^='time_ani']");
  const slogan_tl = gsap.timeline();

  slogan_items.each(function (index, el) {
    slogan_tl.to(el, { opacity: 1, duration: 1 }).to(el, { opacity: 0, duration: 0.8, delay: 1 });
  });

  slogan_tl.to(slogan_items, {
    onStart: function () {
      $(slogan_items).css("position", "relative");
    },
    duration: 1,
    opacity: 1,
  });

  // 타이틀 애니메이션
  $(".section").each(function (index, section) {
    const $titBox = $(section).find(".tit_box");

    gsap.from($titBox, {
      scrollTrigger: {
        trigger: section,
        start: "top-=100 top",
        end: "center center",
      },
      x: -100,
      opacity: 0,
      duration: 0.5,
    });
  });

  // 각 섹션 타임라인 + scrollTrigger 애니메이션
  const AboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#About",
      start: "top-=100 top",
      end: "bottom center",
    },
  });

  const WorkTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#Work",
      start: "top-=100 top",
      end: "bottom center",
    },
  });

  const ContactTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#Contact",
      start: "top-=30 top",
      end: "bottom center",
    },
  });

  // #About 섹션 타임라인 애니메이션
  AboutTl.from(".profile_box .l", { y: 100, opacity: 0, duration: 0.5, delay: 0.5 });
  AboutTl.from(".profile_box .r", { y: 100, opacity: 0, duration: 0.5 });
  AboutTl.from(".resume_box", { x: 100, opacity: 0, duration: 1.5, delay: 0.3 });

  // #Work 섹션 타임라인 애니메이션
  WorkTl.from(".work_list a", { rotate: 720, duration: 1, opacity: 0, delay: 0.5 });
  WorkTl.from(".work_dsec", { y: 100, opacity: 0, duration: 0.5, delay: 0.5 });
  WorkTl.from(".work_btn_box", { y: 100, opacity: 0, duration: 1.5, delay: 0.3 });

  // #Contact 섹션 타임라인 + SplitText 애니메이션
  new SplitText(".footer_slogan", {
    type: "chars",
    charsClass: "char",
    reduceWhiteSpace: false,
  });

  ContactTl.from(".char", {
    y: -20,
    opacity: 0,
    duration: 0.5,
    ease: "power3.out",
    stagger: {
      each: 0.05,
      from: "start",
    },
  });

  ContactTl.from(".footer_contact", { y: 100, opacity: 0, duration: 0.3 });
  ContactTl.from(".footer_copyright", { y: 100, opacity: 0, duration: 0.1 });
  ContactTl.to(
    ".highlight .char",
    {
      y: -4 + "vw",
      scale: 1.2,
      color: "#6C5CE7",
      duration: 1,
      ease: "back.out(1.7)",
      stagger: {
        each: 0.05,
        from: "center",
      },
    },
    "+=0.3"
  );

  // #Skills 섹션 애니메이션
  gsap.from(".skill_box", {
    scrollTrigger: {
      trigger: "#Skills",
      start: "top top",
      end: "bottom center",
    },
    clipPath: "inset(50% 0 50% 0)",
    duration: 1,
    opacity: 0,
    scale: 0.9,
    ease: "power2.out",
  });

  /**************************************************
   * #Work 섹션 프로젝트 리스트 개수 설정
   **************************************************/
  function workCount() {
    const width = window.innerWidth;
    if (width < 768) return 1; // 모바일
    if (width < 1024) return 2; // 태블릿
    return 3; // 데스크탑
  }

  const items = $(".work_list>li");

  // 특정 개수만 표시
  function showWorkItems(count) {
    items.each(function (index, element) {
      if (index < count) {
        $(element).fadeIn().css("display", "flex");
      } else {
        $(element).fadeOut();
      }
    });
  }

  // 초기 로드 시
  let initialCount = workCount();
  showWorkItems(initialCount);

  // 로드 시 일부만 보여주기
  items.each((item, index) => {
    if (item < RoadworkCount) {
      $(index).fadeIn().css("display", "flex");
    }
  });

  // 더보기 버튼 클릭 시
  $(document).on("click", ".work_more_btn", function () {
    showWorkItems(items.length);
    $(this).fadeOut();
  });

  // 리사이즈 시 다시 조정 (더보기 버튼이 보일 때만)
  $(window).on("resize", function () {
    const newCount = workCount();
    if ($(".work_more_btn").is(":visible")) {
      showWorkItems(newCount);
    }
  });

  /**************************************************
   * #Skills 섹션 애니메이션
   **************************************************/
  const cursorImgBox = $(".cursor .img_box");
  const workLinks = $(".skill_list a");

  // 커서 이동시 이미지박스 함께 부드럽게 이동
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
    // 화면에 닿아있는(터치) 첫번째[0] 손가락을 의미함.
    const touch = e.originalEvent.touches[0];

    cursorImgBox.stop().css({
      top: touch.clientY + "px",
      left: touch.clientX + "px",
    });
  });

  workLinks.each(function () {
    const $target = $(this);
    const imageUrl = $target.data("img");
    const $cursorImg = $(imageUrl);

    $target.on("mouseover touchstart", function () {
      cursorImgBox.addClass("on");
      $cursorImg.addClass("on");
    });

    $target.on("mouseout touchend", function () {
      cursorImgBox.removeClass("on");
      $cursorImg.removeClass("on");
    });
  });

  /**************************************************
   * 브라우저 부드러운 스크롤
   **************************************************/
  const lenis = new Lenis(); // 스크롤 할 준비(필요한 데이터 초기화)

  function raf(time) {
    // time = 브라우저가 제공하는 현재 시간
    lenis.raf(time); // 부드러운 스크롤 한 프레임 계산
    requestAnimationFrame(raf); // raf를 무한 실행.
  }

  requestAnimationFrame(raf);
});
