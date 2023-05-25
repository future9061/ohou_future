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

//1.5초마다 li의 높이만큼 ul 의 margin-top 값이 움직임

let showList = document.querySelector(".show_list_inner ul"),
  listItemHeight = showList.firstElementChild.offsetHeight,
  marginTop = 0;

function moveList() {
  marginTop -= listItemHeight;
  showList.style.marginTop = `${marginTop}px`;

  if (marginTop <= -listItemHeight) {
    showList.appendChild(showList.firstElementChild.cloneNode(true));
    showList.removeChild(showList.firstElementChild);
    marginTop += listItemHeight;
    showList.style.marginTop = `${marginTop}px`;
  }

  setTimeout(moveList, 1500);
}

window.addEventListener("DOMContentLoaded", function () {
  moveList();
});

//인기순위에 마우스 올리면 lank_wrap 나타나게
let showListWrap = document.querySelector(".show_list_wrap"),
  lankWrap = document.querySelector(".lank_wrap");

showListWrap.addEventListener("mouseover", function () {
  lankWrap.style.display = "block";
});
lankWrap.addEventListener("mouseover", function () {
  lankWrap.style.display = "block";
});

let upArrow = document.querySelector(".up_arrow");
upArrow.addEventListener("mouseover", function (e) {
  e.stopPropagation();
  lankWrap.style.display = "none";
});

showListWrap.addEventListener("mouseout", function (e) {
  e.stopPropagation();
  lankWrap.style.display = "none";
});
lankWrap.addEventListener("mouseout", function (e) {
  e.stopPropagation();
  lankWrap.style.display = "none";
});
//이미지 슬라이드**************************************************

//버튼 나타나기
let banner2Wrap = document.querySelector(".main_banner2_wrap"),
  arrowWrap = document.querySelector(".arrow_wrap");
banner2Wrap.addEventListener("mouseover", function () {
  arrowWrap.classList.remove("opacity");
});
arrowWrap.addEventListener("mouseover", function () {
  arrowWrap.classList.remove("opacity");
});
banner2Wrap.addEventListener("mouseout", function () {
  arrowWrap.classList.add("opacity");
});

//오른쪽 버튼을 누르면 li의 너비만큼 margin-left 이동하되,
//margin-left 값이 li의 너비 *  li.length 의 값 보다 같거나 작아지면 버튼 사라져라

//클릭할때마다 1씩 증가되고 length값 이상이 되면 멈춰!

const rightBtn = document.querySelector(".arrow_right"),
  slideUl = document.querySelector(".main_banner2_wrap ul"),
  slideLi = document.querySelectorAll(".main_banner2_wrap ul li"),
  itemWidth = slideLi[0].offsetWidth;
let marginValue = 0;

const slideNum = document.querySelector(".slide_num");
let slideLiLength = 1;

function moveSlide() {
  marginValue -= itemWidth;
  slideUl.style.marginLeft = `${marginValue}px`;

  if (marginValue <= -(itemWidth * (slideLi.length - 1))) {
    rightBtn.classList.add("opacity");
  }

  slideLiLength++;
  console.log(slideLiLength);
  slideNum.innerHTML = `${slideLiLength}/7  +`;
}

rightBtn.addEventListener("click", moveSlide);

//왼쪽도 li의 너비만큼 margin-right 이동하면서

const leftBtn = document.querySelector(".arrow_left");

// //slideUl = document.querySelector(".main_banner2_wrap ul"),
// slideLi = document.querySelectorAll(".main_banner2_wrap ul li"),
// itemWidth = slideLi[0].offsetWidth;
// let marginValue = 0;
let marginValue2 = 0;
// let slideLiLength2 = 1;

function moveSlide2() {
  marginValue2 += itemWidth;
  slideUl.style.marginLeft = `${marginValue2}px`;

  // slideLiLength2--;
  // slideNum.innerHTML = `${slideLiLength2}/7  +`;
}

leftBtn.addEventListener("click", moveSlide2);

//하트 클릭하면 색깔 변하게, ************로컬 스토리지에  p문구 들어가게(배열로)
const userHart = document.querySelectorAll(".fa-heart");

userHart.forEach((a) => {
  let count = 0;

  a.addEventListener("click", function (e) {
    count++;
    if (e.target == a) {
      this.style.color = "#00bbff";
    }
    if (count % 2 == 0) {
      this.style.color = "#fff";
    }
  });
});
