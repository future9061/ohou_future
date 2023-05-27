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

//인기순위 자동 1.5초마다 li의 높이만큼 ul 의 margin-top 값이 움직임

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
//margin-left 값이 li의 너비 *  li.length 의 값 보다 같거나 작아지면 버튼 사라져라->length값이 감소돼서 맘대로 안되넹?
//그렇다면 바뀌지 않는 length값이 필요해 확장성을 고려해서~~~~
//기존의 length값을 저장 하는 변수 만들어

//클릭할때마다 1씩 증가되고 length값 이상이 되면 멈춰!

const rightBtn = document.querySelector(".arrow_right"),
  slideUl = document.querySelector(".main_banner2_wrap ul"),
  slideLi = document.querySelectorAll(".main_banner2_wrap ul li"),
  itemWidth = slideLi[0].offsetWidth;
let marginValue = 0;

const slideNum = document.querySelector(".slide_num");
let slideLiLength = 1;
const copyLiLength = slideLi.length;

function btnEvent() {
  if (marginValue <= -(itemWidth * (copyLiLength - 1))) {
    rightBtn.classList.add("opacity");
  } else {
    rightBtn.classList.remove("opacity");
  }
}

function moveSlide() {
  marginValue -= itemWidth;
  slideUl.style.marginLeft = `${marginValue}px`;

  slideLiLength++;

  slideNum.innerHTML = `${slideLiLength}/7  +`;
  btnEvent();
}

rightBtn.addEventListener("click", moveSlide);

const leftBtn = document.querySelector(".arrow_left");

function moveSlide2() {
  if (marginValue >= 0) {
    return;
  }

  marginValue += itemWidth;
  slideUl.style.marginLeft = `${marginValue}px`;

  slideLiLength--;
  slideNum.innerHTML = `${slideLiLength}/7  +`;

  btnEvent();
}

leftBtn.addEventListener("click", moveSlide2);

//page가 load되면 무한으로 돌아가는 slide
function autoSlide() {
  // marginValue
}

window.addEventListener("DOMContentLoaded", () => {
  autoSlide();
});

//하트 클릭하면 색깔 변하게, ************로컬 스토리지에  p문구 들어가게(배열로)
const userHart = document.querySelectorAll(".fa-heart");
// let postName = document.querySelectorAll(".");

userHart.forEach((a) => {
  let count = 0;

  a.addEventListener("click", function (e) {
    //색깔 바뀌는 이벤트 끝
    count++;
    if (e.target == a) {
      this.style.color = "#00bbff";
    }
    if (count % 2 == 0) {
      this.style.color = "#fff";
    }

    //로컬 스토리지에 게시물 이름 저장
    // localStorage.setItem
  });
});

//카테고리 버튼 이벤트

window.addEventListener("DOMContentLoaded", () => {
  const cateArrowRt = document.querySelector(".cate_arrow_right"),
    cateArrowLt = document.querySelector(".cate_arrow_left"),
    cateUl = document.querySelector(".category_inner ul"),
    trnasferBox = document.querySelector(".gradient_box");
  let itemWid = cateUl.firstElementChild.offsetWidth;

  cateArrowRt.addEventListener("click", () => {
    cateUl.style.marginLeft = `-${itemWid * 4.5}px`;
    cateArrowRt.classList.add("opacity");
    trnasferBox.classList.add("opacity");
    cateArrowLt.classList.remove("opacity");
  });

  cateArrowLt.addEventListener("click", function () {
    cateUl.style.marginLeft = `0px`;
    cateArrowLt.classList.add("opacity");
    cateArrowRt.classList.remove("opacity");
    trnasferBox.classList.remove("opacity");
  });
});

//json
let btnCount = 0;
fetch("./product.json")
  .then((res) => res.json())
  .then((data) => {
    const moreBtn = document.querySelector(".deal_btn:last-child");
    const dealInner = document.querySelector(".today_deal_inner");

    function createDealItem(item) {
      return `
        <div class="today_deal_item cr">
          <div class="img_wrap relative">
            <img src="${item.img}" alt="">
            <div class="today_timer">00:00:00 남음</div>
          </div>
          <small>${item.brand}</small>
          <p>${item.paragraph}</p>
          <b><span>7%</span>${item.price}</b>
          <div class="deal_btn_wrap2">
            <button class="cr">무료배송</button>
            <button class="cr">특가</button>
          </div>
        </div>
      `;
    }

    function dataCom() {
      dealInner.innerHTML = "";
      for (let i = 0; i < 4; i++) {
        dealInner.insertAdjacentHTML("beforeend", createDealItem(data[i]));
      }
    }

    dataCom();

    moreBtn.addEventListener("click", function () {
      btnCount++;

      if (btnCount % 2 !== 0) {
        dealInner.innerHTML = "";
        data.forEach((item) => {
          dealInner.insertAdjacentHTML("beforeend", createDealItem(item));
        });
      } else {
        dataCom();
      }
    });

    //json으로 가져온 자료로 오름차순 내림차순 으로 정렬 sort 조건대로 정렬하는 문법
    //1.가져온 data 의 복사본을 만듦 2.price keyword로 가격 정렬함
    // const stringSlec = document.querySelector(".string_selec");
    // let copyDate = data;
    // stringSlec.addEventListener("change", () => {
    //   if (stringSlec.value == "오름차순") {
    //     console.log(
    //       copyDate.sort((a, b) => {
    //         return parseInt(a.price) - parseInt(b.price);
    //       })
    //     );
    //   }
    // });

    const priceSelec = document.querySelector(".price_selec");
    let copyData = [...data];

    priceSelec.addEventListener("change", () => {
      if (priceSelec.value == "높은 가격순") {
        console.log(
          copyData.sort((a, b) => {
            return parseInt(a.price) - parseInt(b.price);
          })
        );
      } else if (priceSelec.value == "낮은 가격순") {
        console.log(
          copyData.sort((a, b) => {
            return parseInt(b.price) - parseInt(a.price);
          })
        );
      }
    });
  })
  .catch((error) => console.log("실패함:", error));

//top버튼

const topBtn = document.querySelector(".top-btn"),
  documentEle = document.documentElement,
  documentHeight = documentEle.offsetHeight;
let scrollPos = 0;
console.log(topBtn, documentEle, documentHeight);

function scrollUp() {}

topBtn.addEventListener("click", () => {
  scrollUp();
});
