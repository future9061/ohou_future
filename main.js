//top sale banner

const closeBtn = document.querySelector(".close_btn"),
  bannerTop = document.querySelector(".banner1");

closeBtn.addEventListener("click", function () {
  bannerTop.style.display = "none";
});

//마우스 스크롤 내리면 main nav 고정
let manuBar = document.querySelector(".menu-bar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    manuBar.classList.add("fixed");
  }
  if (window.scrollY < 50) {
    manuBar.classList.remove("fixed");
  }
});

//메인 메뉴에 마우스 올리면 sub 메뉴 바뀜

const mainNav = document.querySelectorAll(".top-ul-wrap ul li"),
  subNav = document.querySelectorAll(".nav2_sub");

mainNav.forEach((elem, index) => {
  elem.addEventListener("mouseover", function (e) {
    if (this === mainNav[index]) {
      subNav.forEach((a, i) => {
        a.classList.remove("z-index");
      });
      subNav[index].classList.add("z-index");
    }
  });
});

//1초마다 margin-top 30px씩 ul이 움직이게,,
let showList = document.querySelectorAll(".show_list_inner");

window.addEventListener("load", () => {
  showList.forEach((showList) => {
    setInterval(function () {
      let currentMarginTop = parseInt(
        showList.querySelector("ul").style.marginTop || 0
      );
      showList.querySelector("ul").style.marginTop = "-30px";
    }, 1000);
  });
});

//이미지 슬라이드**************************************************

//무한 슬라이드를 위해 start, end 슬라이드 복사하기
const slideImg = document.querySelectorAll(".main_banner2_wrap img");

const firstImg = slideImg[0];
const lastImg = slideImg[slideImg.length - 1];

//생성
const copyFirst = document.createElement(firstImg.tagName);
const copyLast = document.createElement(lastImg.tagName);

//생성한 태그에 클라스 이름 복사
// firstImg.classList.forEach((c) => {
//   copyFirst.classList.add(c);
// });
// copyLast.classList.forEach((c) => {
//   copyLast.classList.add(c);
// });근데 나는 클라스 이름이 애초에 없기 때문에 상관없어서 주석처리

//생성한 태그에 내용복사
copyFirst.innerHTML = firstImg.innerHTML;
copyLast.innerHTML = lastImg.innerHTML;

//복사한 엘리먼트를 위치시키기
firstImg.before(copyLast);
lastImg.after(copyFirst);
console.log(copyLast);
// let arr = [];
// arr = slideImg;
// console.log(arr);

// 이제 img들을 요소의  width 만큼씩 이동하기 setAttribute 이용
// slideImg

//하트 클릭하면 색깔 변하게, ************로컬 스토리지에  p문구 들어가게(배열로)
const userHart = document.querySelectorAll(".fa-heart");

userHart.forEach((a) => {
  let count = 0;

  a.addEventListener("click", function () {
    count++;
    if (this == a) {
      this.style.color = "#00bbff";
    }
    if (count % 2 == 0) {
      this.style.color = "#fff";
    }
  });
});
