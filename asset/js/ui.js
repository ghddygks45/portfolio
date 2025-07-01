/**************************************************
 * 반응형 디바이스 체크 (모바일/PC)
 **************************************************/

const mql = window.matchMedia("all and (min-width: 768px)");
const htmlTag = document.documentElement;

function deviceCheck() {
  if (mql.matches) {
    htmlTag.classList.remove("mobile", "ios-device");
    htmlTag.classList.add("desktop");
  } else {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
      htmlTag.classList.remove("desktop");
      htmlTag.classList.add("mobile", "ios-device");
    } else {
      htmlTag.classList.remove("desktop");
      htmlTag.classList.add("mobile");
    }
  }
}
deviceCheck();
mql.addEventListener("change", deviceCheck);

document.addEventListener("DOMContentLoaded", function () {
  /**************************************************
   * 메뉴 관련
   **************************************************/
  if (htmlTag.classList.contains("mobile")) {
    document.querySelectorAll(".gnb a").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(".gnb_wrap").classList.remove("open");
        var menuBtnBox = document.querySelector(".header_box .menu_btn_box");
        menuBtnBox.classList.remove("active");
        menuBtnBox.querySelector(".blind").textContent = "메뉴 열기";
      });
    });
  }

  document.querySelectorAll(".header_box .menu_btn_box").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var gnbWrap = document.querySelector(".gnb_wrap");
      gnbWrap.classList.toggle("open");
      this.classList.toggle("active");

      if (this.classList.contains("open")) {
        this.querySelector(".blind").textContent = "메뉴 닫기";
      } else {
        this.querySelector(".blind").textContent = "메뉴 열기";
      }
    });
  });

  /**************************************************
   * 스크롤 방향에 따른 헤더 show/hide
   **************************************************/
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    const headerWrap = document.querySelector(".header_wrap");

    if (st === 0) {
      headerWrap.classList.remove("up", "shadow", "down");
    } else if (st > lastScrollTop) {
      headerWrap.classList.remove("down");
      headerWrap.classList.add("up");
    } else if (st < lastScrollTop) {
      headerWrap.classList.remove("up");
      headerWrap.classList.add("down", "shadow");
    } else {
      headerWrap.classList.remove("up", "down", "shadow");
    }

    lastScrollTop = st;
  });

  /**************************************************
   * 백그라운드 비디오 속도
   **************************************************/
  const videoEl = document.querySelector(".main_bg video");
  if (videoEl) {
    videoEl.playbackRate = 0.5;
  }

  /**************************************************
   * GSAP 애니메이션
   **************************************************/
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

  // 메뉴 클릭 시 해당 섹션으로 이동
  document.querySelectorAll(".gnb a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute("href"));
      var offsetTop = target.offsetTop;

      gsap.to(window, {
        duration: 2,
        scrollTo: offsetTop,
        ease: "power4.inOut",
      });
    });
  });

  // 슬로건 타임라인 애니메이션
  const sloganItems = document.querySelectorAll(".slogan_box [class^='time_ani']");
  const sloganTl = gsap.timeline();

  sloganItems.forEach(function (el) {
    sloganTl.to(el, { opacity: 1, duration: 1 }).to(el, { opacity: 0, duration: 0.8, delay: 1 });
  });

  sloganTl.to(sloganItems, {
    onStart: function () {
      sloganItems.forEach(function (item) {
        item.style.position = "relative";
      });
    },
    duration: 1,
    opacity: 1,
  });

  // 타이틀 애니메이션
  document.querySelectorAll(".section").forEach(function (section) {
    const titBox = section.querySelector(".tit_box");
    if (titBox) {
      gsap.from(titBox, {
        scrollTrigger: {
          trigger: section,
          start: "top-=100 top",
          end: "center center",
        },
        x: -100,
        opacity: 0,
        duration: 0.5,
      });
    }
  });

  // #About
  const AboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#About",
      start: "top-=100 top",
      end: "bottom center",
    },
  });
  AboutTl.from(".profile_box .l", { y: 100, opacity: 0, duration: 0.5, delay: 0.5 })
    .from(".profile_box .r", { y: 100, opacity: 0, duration: 0.5 })
    .from(".resume_box", { x: 100, opacity: 0, duration: 1.5, delay: 0.3 });

  // #Work
  const WorkTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#Work",
      start: "top-=100 top",
      end: "bottom center",
    },
  });
  WorkTl.from(".work_list a", { rotate: 720, duration: 1, opacity: 0, delay: 0.5 })
    .from(".work_dsec", { y: 100, opacity: 0, duration: 0.5, delay: 0.5 })
    .from(".work_btn_box", { y: 100, opacity: 0, duration: 1.5, delay: 0.3 });

  // #Contact
  new SplitText(".footer_slogan", {
    type: "chars",
    charsClass: "char",
    reduceWhiteSpace: false,
  });

  const ContactTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#Contact",
      start: "top-=30 top",
      end: "bottom center",
    },
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
  })
    .from(".footer_contact", { y: 100, opacity: 0, duration: 0.3 })
    .from(".footer_copyright", { y: 100, opacity: 0, duration: 0.1 })
    .to(
      ".highlight .char",
      {
        y: "-4vw",
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
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  }

  const items = document.querySelectorAll(".work_list > li");

  function showWorkItems(count) {
    items.forEach(function (el, index) {
      if (index < count) {
        el.style.display = "flex";
        el.style.opacity = "1";
      } else {
        el.style.display = "none";
      }
    });
  }

  let initialCount = workCount();
  showWorkItems(initialCount);

  document.querySelector(".work_more_btn")?.addEventListener("click", function () {
    showWorkItems(items.length);
    this.style.display = "none";
  });

  window.addEventListener("resize", function () {
    const newCount = workCount();
    if (document.querySelector(".work_more_btn")?.offsetParent !== null) {
      showWorkItems(newCount);
    }
  });

  /**************************************************
   * 마우스 커서 + 이미지 연동
   **************************************************/
  const cursorImgBox = document.querySelector(".cursor .img_box");
  const workLinks = document.querySelectorAll(".skill_list a");

  document.addEventListener("mousemove", function (e) {
    cursorImgBox.style.top = e.clientY + "px";
    cursorImgBox.style.left = e.clientX + "px";
  });

  document.addEventListener("touchstart", function (e) {
    e.preventDefault();
    const touch = e.touches[0];
    cursorImgBox.style.top = touch.clientY + "px";
    cursorImgBox.style.left = touch.clientX + "px";
  });

  workLinks.forEach(function (link) {
    const imageUrl = link.getAttribute("data-img");
    const cursorImg = document.querySelector(imageUrl);

    link.addEventListener("mouseover", function () {
      cursorImgBox.classList.add("on");
      cursorImg.classList.add("on");
    });
    link.addEventListener("mouseout", function () {
      cursorImgBox.classList.remove("on");
      cursorImg.classList.remove("on");
    });

    link.addEventListener("touchstart", function () {
      cursorImgBox.classList.add("on");
      cursorImg.classList.add("on");
    });
    link.addEventListener("touchend", function () {
      cursorImgBox.classList.remove("on");
      cursorImg.classList.remove("on");
    });
  });

  /**************************************************
   * 브라우저 부드러운 스크롤
   **************************************************/
  const lenis = new Lenis();
  requestAnimationFrame(function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  });
});
