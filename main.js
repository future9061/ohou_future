//1. 최상단에 banner close 버튼 누르면 사라진다.

const closeBtn = document.querySelector('.close_btn'),
  bannerTop = document.querySelector('.banner1');

closeBtn.addEventListener('click', function () {
  bannerTop.style.display = 'none';
});

//2.마우스 스크롤 내리면 main nav가 상단에 고정 된다.
let manuBar = document.querySelector('.menu-bar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    manuBar.classList.add('fixed');
  }
  if (window.scrollY < 50) {
    manuBar.classList.remove('fixed');
  }
});

//3.메인 메뉴에 마우스 올리면 sub 메뉴 바뀐다.
const mainNav = document.querySelectorAll('.top-ul-wrap ul li'),
  subNav = document.querySelectorAll('.nav2_sub');

mainNav.forEach((elem, index) => {
  elem.addEventListener('mouseover', function (e) {
    if (this === mainNav[index]) {
      subNav.forEach((a, i) => {
        a.classList.remove('z-index');
      });
      subNav[index].classList.add('z-index');
    }
  });
});

//4.인기순위 자동 1.5초마다 li의 높이만큼 ul 의 margin-top 값이 움직임
let showList = document.querySelector('.show_list_inner ul'),
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

window.addEventListener('DOMContentLoaded', function () {
  moveList();
});

//5.인기순위에 마우스 올리면 lank_wrap 나타나게
let showListWrap = document.querySelector('.show_list_wrap'),
  lankWrap = document.querySelector('.lank_wrap');

showListWrap.addEventListener('mouseover', function () {
  lankWrap.style.display = 'block';
});
lankWrap.addEventListener('mouseover', function () {
  lankWrap.style.display = 'block';
});

let upArrow = document.querySelector('.up_arrow');
upArrow.addEventListener('mouseover', function (e) {
  e.stopPropagation();
  lankWrap.style.display = 'none';
});

showListWrap.addEventListener('mouseout', function (e) {
  e.stopPropagation();
  lankWrap.style.display = 'none';
});
lankWrap.addEventListener('mouseout', function (e) {
  e.stopPropagation();
  lankWrap.style.display = 'none';
});

//6.이미지 슬라이드
let banner2Wrap = document.querySelector('.main_banner2_wrap'),
  arrowWrap = document.querySelector('.arrow_wrap');
banner2Wrap.addEventListener('mouseover', function () {
  arrowWrap.classList.remove('opacity');
});
arrowWrap.addEventListener('mouseover', function () {
  arrowWrap.classList.remove('opacity');
});
banner2Wrap.addEventListener('mouseout', function () {
  arrowWrap.classList.add('opacity');
});

const rightBtn = document.querySelector('.arrow_right'),
  slideUl = document.querySelector('.main_banner2_wrap ul');
let slideLi = document.querySelectorAll('.main_banner2_wrap ul li');
const itemWidth = slideLi[0].offsetWidth;
let marginValue = 0;

let slideLiLength = 1;
const copyLiLength = slideLi.length;
const slideUlWidth = -slideUl.offsetWidth;
currentImg = 1;

function moveSlide() {
  if (marginValue >= -1255) {
    marginValue -= itemWidth;
    slideUl.style.marginLeft = `${marginValue}px`;
  } else {
    return;
  }
}

rightBtn.addEventListener('click', moveSlide);

const leftBtn = document.querySelector('.arrow_left');

function moveSlide2() {
  if (marginValue >= 0) {
    return;
  }

  marginValue += itemWidth;
  slideUl.style.marginLeft = `${marginValue}px`;

  btnEvent();
}

leftBtn.addEventListener('click', moveSlide2);

//6-2. page가 load되면 무한으로 돌아가는 slide

//margin-left로 이동하는 함수
function moveMarginLeft() {
  slideLi = document.querySelectorAll('.main_banner2_wrap ul li');
  marginValue = -itemWidth;
  slideUl.style.marginLeft = `${marginValue}px`;
  slideUl.style['transition'] = '0.3s';
}

//reset하는 함수 setTimeout
function resetMargin() {
  setTimeout(() => {
    slideUl.style.marginLeft = 0; //초기화
    slideUl.style['transition'] = '0s';
    let cloneItem = slideLi[0].cloneNode(true);
    slideUl.appendChild(cloneItem);
    slideUl.removeChild(slideLi[0]);
  }, 300);
}

function autoslide() {
  moveMarginLeft();

  resetMargin();

  setTimeout(() => {
    autoslide();
  }, 2000);
}

setTimeout(() => {
  autoslide();
}, 2000);

//7. 하트 누른 게시글 localstorage에 paragraph 저장하기
const userHart = document.querySelectorAll('.fa-heart');
let stringArr = [];
let post = document.querySelectorAll('.section1_box');

userHart.forEach((a, i) => {
  let heartTogg = false;

  a.addEventListener('click', function (e) {
    if (e.target == a) {
      heartTogg = !heartTogg;
      if (heartTogg) {
        a.style.color = '#00bbff';

        let postTitle = post[i].querySelector('p').innerText;
        if (!stringArr.includes(postTitle)) {
          stringArr.push(postTitle);
        }
      }
      if (!heartTogg) {
        a.style.color = '#fff';
        let postTitle = post[i].querySelector('p').innerText;
        stringArr = stringArr.filter((text) => text !== postTitle);
      }
      let newStringArr = JSON.stringify(stringArr);
      localStorage.setItem('post', newStringArr);
    }
  });
});

//8. 메뉴 슬라이더
window.addEventListener('DOMContentLoaded', () => {
  const cateArrowRt = document.querySelector('.cate_arrow_right'),
    cateArrowLt = document.querySelector('.cate_arrow_left'),
    cateUl = document.querySelector('.category_inner ul'),
    trnasferBox = document.querySelector('.gradient_box');
  let itemWid = cateUl.firstElementChild.offsetWidth;

  cateArrowRt.addEventListener('click', () => {
    cateUl.style.marginLeft = `-${itemWid * 5.5}px`;
    cateArrowRt.classList.add('opacity');
    trnasferBox.classList.add('opacity');
    cateArrowLt.classList.remove('opacity');
  });

  cateArrowLt.addEventListener('click', function () {
    cateUl.style.marginLeft = `0px`;
    cateArrowLt.classList.add('opacity');
    cateArrowRt.classList.remove('opacity');
    trnasferBox.classList.remove('opacity');
  });
});

//9.json에서 상품 가져오기
let btnCount = 0;
fetch('./product.json')
  .then((res) => res.json())
  .then((data) => {
    const moreBtn = document.querySelector('.more_btn');
    const dealInner = document.querySelector('.today_deal_inner');

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
      dealInner.innerHTML = '';
      for (let i = 0; i < 4; i++) {
        dealInner.insertAdjacentHTML('beforeend', createDealItem(data[i]));
      }
    }

    dataCom();

    moreBtn.addEventListener('click', function () {
      btnCount++;

      if (btnCount % 2 !== 0) {
        dealInner.innerHTML = '';
        data.forEach((item) => {
          dealInner.insertAdjacentHTML('beforeend', createDealItem(item));
        });
      } else {
        dataCom();
      }
    });

    //10.json 자료 sort로 가격순 정렬
    const priceSelec = document.querySelector('.price_selec');
    let copyPrice = [...data];

    priceSelec.addEventListener('change', () => {
      if (priceSelec.value == '높은 가격순') {
        copyPrice.sort(function (a, b) {
          const priceA = parseInt(a.price.replace(/,/g, ''));
          const priceB = parseInt(b.price.replace(/,/g, ''));
          return priceB - priceA;
        });
        dealInner.innerHTML = '';

        copyPrice.forEach(function (item) {
          //함수로 만들어서 쓰면 좋을 것 같은데 오류 뜸
          let sortTemplete = `
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

          dealInner.insertAdjacentHTML('beforeend', sortTemplete);
        });
      } else if (priceSelec.value == '낮은 가격순') {
        copyPrice.sort(function (a, b) {
          const priceA = parseInt(a.price.replace(/,/g, ''));
          const priceB = parseInt(b.price.replace(/,/g, ''));
          return priceA - priceB;
        });
        dealInner.innerHTML = '';

        copyPrice.forEach(function (item) {
          let sortTemplete = `
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
          dealInner.insertAdjacentHTML('beforeend', sortTemplete);
        });
      }
    });

    const stringSelec = document.querySelector('.string_selec');

    stringSelec.addEventListener('change', () => {
      if (stringSelec.value == '오름차순') {
        copyPrice.sort(function (a, b) {
          a.brand - b.brand;
          return a.brand.localeCompare(b.brand);
        });

        dealInner.innerHTML = '';

        copyPrice.forEach(function (item) {
          let sortTemplete = `
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
          dealInner.insertAdjacentHTML('beforeend', sortTemplete);
        });
      } else if (stringSelec.value == '내림차순') {
        copyPrice.sort(function (a, b) {
          a.brand - b.brand;
          return b.brand.localeCompare(a.brand);
        });
        dealInner.innerHTML = '';
        copyPrice.forEach(function (item) {
          let sortTemplete = `
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
          dealInner.insertAdjacentHTML('beforeend', sortTemplete);
        });
      }
    });
  })
  .catch((error) => console.log('실패함:', error));

//11. date 객체의 instance 만들어서 24시간 카운트 하기
//하려고 하였으나......................  미완

//12.top버튼
const topBtn = document.querySelector('.top-btn');
const documentEle = document.documentElement;

window.addEventListener('scroll', () => {
  if (window.scrollY > documentEle.clientHeight) {
    topBtn.classList.remove('opacity');
  } else {
    topBtn.classList.add('opacity');
  }
});

let scrollInterval;

function scrollToTop() {
  if (window.scrollY !== 0) {
    window.scrollTo(0, window.scrollY - 55); //현재 scrollY의 값에서 -55씩 올라감
  } else {
    clearInterval(scrollInterval);
  }
}

topBtn.addEventListener('click', () => {
  if (window.scrollY !== 0) {
    scrollInterval = setInterval(scrollToTop, 10);
  }
});
