//1. 최상단에 banner close 버튼 누르면 사라진다.

const closeBtn = document.querySelector('.close_btn'),
  bannerTop = document.querySelector('.banner1');

closeBtn.addEventListener('click', function () {
  bannerTop.classList.add('none')
});

//2.마우스 스크롤 내리면 main nav가 상단에 고정 된다.
const manuBar = document.querySelector('.menu-bar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    manuBar.classList.add('fixed');
  }
  if (window.scrollY < 50) {
    manuBar.classList.remove('fixed');
  }
}); //다음번에는 sticky를 이용하기로..

//3.메인 메뉴에 마우스 올리면 sub 메뉴 바뀐다.
const mainNav = document.querySelectorAll('.top-ul-wrap ul li');
const subNav = document.querySelectorAll('.nav2_sub');

mainNav.forEach((elem, index) => {
  elem.addEventListener('mouseover', function () {
    if (this === mainNav[index]) {
      subNav.forEach((a) => {
        a.classList.remove('z-index');
      });
      subNav[index].classList.add('z-index');
    }
  });
});

//4.인기순위 자동 1.5초마다 li의 높이만큼 ul 의 margin-top 값이 움직임
const showList = document.querySelector('.show_list_inner ul');
let listItemHeight = showList.firstElementChild.offsetHeight; //첫번째 요소는 계속 삭제되기 때문에 let으로 선언
let marginTop = 0;

function moveList() {
  marginTop -= listItemHeight;
  showList.style.marginTop = `${marginTop}px`;

  showList.appendChild(showList.firstElementChild.cloneNode(true));
  showList.removeChild(showList.firstElementChild);
  marginTop += listItemHeight;
  showList.style.marginTop = `${marginTop}px`;

  setTimeout(moveList, 1500);
}

window.addEventListener('DOMContentLoaded', function () {
  moveList();
});

//5.인기순위에 마우스 올리면 lank_wrap 나타나게
const showListWrap = document.querySelector('.show_list_wrap');
const lankWrap = document.querySelector('.lank_wrap');
const upArrow = document.querySelector('.up_arrow');

showListWrap.addEventListener('mouseover', function () {
  lankWrap.style.display = 'block';
});

lankWrap.addEventListener('mouseover', function () {
  lankWrap.style.display = 'block';
});

lankWrap.addEventListener('mouseout', function (e) {
  lankWrap.style.display = 'none';
});

//6.버튼 클릭 이미지 슬라이드


const banner2Wrap = document.querySelector('.main_banner2_wrap');
const arrowWrap = document.querySelector('.arrow_wrap');

banner2Wrap.addEventListener('mouseover', function () {
  arrowWrap.classList.remove('opacity');
});
arrowWrap.addEventListener('mouseover', function () {
  arrowWrap.classList.remove('opacity');
});
banner2Wrap.addEventListener('mouseout', function () {
  arrowWrap.classList.add('opacity');
});

const rightBtn = document.querySelector('.arrow_right');
const leftBtn = document.querySelector('.arrow_left');
const next = false;
const pre = true;
const slideUl = document.querySelector('.main_banner2_wrap ul');//
let slideLi = document.querySelectorAll('.main_banner2_wrap ul li');
const itemWidth = slideLi[0].offsetWidth;
const totalValue = -(slideLi.length - 1) * itemWidth
let marginValue = 0;


function moveSlide(btn) {
  if (!btn && marginValue > totalValue) {
    marginValue -= itemWidth;
    console.log(marginValue, totalValue, btn)
    slideUl.style.marginLeft = `${marginValue}px`;
  }

  if (btn && marginValue !== 0) {
    marginValue += itemWidth
    slideUl.style.marginLeft = `${marginValue}px`;
  }
}

rightBtn.addEventListener('click', () => moveSlide(next));
leftBtn.addEventListener('click', () => moveSlide(pre));

// //6-2. page가 load되면 무한으로 돌아가는 slide

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
  }, 200);
}

function autoslide() {
  moveMarginLeft();

  resetMargin();

  setTimeout(() => {
    autoslide();
  }, 2000);
}


autoslide();


//7. 하트 누른 게시글 localstorage에 상품명 저장하기
const userHart = document.querySelectorAll('.fa-heart');
const post = document.querySelectorAll('.section1_box');
let stringArr = [];


userHart.forEach((a, i) => {
  let heartTogg = false;

  a.addEventListener('click', function (e) {
    if (e.target == a) {
      heartTogg = !heartTogg;
      //하트를 한번 클릭했을 때
      if (heartTogg) {
        a.style.color = '#00bbff';
        const postTitle = post[i].querySelector('p').innerText;
        if (!stringArr.includes(postTitle)) { //이미 저장된 상품명인지 확인
          stringArr.push(postTitle);
        }
      }
      if (!heartTogg) {
        a.style.color = '#fff';
        postTitle = post[i].querySelector('p').innerText;
        stringArr = stringArr.filter((text) => text !== postTitle); //클릭한 상품명 제외하고 return
      }
      let newStringArr = JSON.stringify(stringArr); //local에 넣기 위해 string으로 변환
      localStorage.setItem('post', newStringArr);
    }
  });
});

//8. 메뉴 슬라이더
window.addEventListener('DOMContentLoaded', () => {
  const cateArrowRt = document.querySelector('.cate_arrow_right');
  const cateArrowLt = document.querySelector('.cate_arrow_left');
  const cateUl = document.querySelector('.category_inner ul');
  const trnasferBox = document.querySelector('.gradient_box');
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

function createDealItem(image, small, p, b) {
  return `
    <div class="today_deal_item cr">
      <div class="img_wrap relative">
        <img src="${image}" alt="">
      </div>
      <small>${small}</small>
      <p>${p}</p>
      <b><span>7%</span>${b}</b>
      <div class="deal_btn_wrap2">
        <button class="cr">무료배송</button>
        <button class="cr">특가</button>
      </div>
    </div>
  `;
}

fetch('./product.json')
  .then((res) => res.json())
  .then((data) => {
    const moreBtn = document.querySelector('.more_btn');
    const dealInner = document.querySelector('.today_deal_inner');

    function dataCom() {
      dealInner.innerHTML = '';
      for (let i = 0; i < 4; i++) {
        const { img, brand, paragraph, price } = data[i];
        dealInner.insertAdjacentHTML('beforeend', createDealItem(img, brand, paragraph, price));
      }
    }

    dataCom();

    moreBtn.addEventListener('click', function () {
      btnCount++;

      if (btnCount % 2 !== 0) {
        dealInner.innerHTML = '';
        data.forEach((item) => {
          const { img, brand, paragraph, price } = item;
          dealInner.insertAdjacentHTML('beforeend', createDealItem(img, brand, paragraph, price));
        });
      } else {
        dataCom();
      }
    });

    //10.json 자료 sort로 가격순 정렬
    const priceSelec = document.querySelector('.price_selec');
    const copyPrice = [...data];

    priceSelec.addEventListener('change', () => {

      if (priceSelec.value == '높은 가격순') {
        copyPrice.sort(function (a, b) {
          const priceA = parseInt(a.price.replace(/,/g, ''));
          const priceB = parseInt(b.price.replace(/,/g, ''));
          return priceB - priceA;
        });

        dealInner.innerHTML = '';

        copyPrice.forEach(function (item) {
          const { img, brand, paragraph, price } = item
          dealInner.insertAdjacentHTML('beforeend', createDealItem(img, brand, paragraph, price));
        });

      } else if (priceSelec.value == '낮은 가격순') {
        copyPrice.sort(function (a, b) {
          const priceA = parseInt(a.price.replace(/,/g, ''));
          const priceB = parseInt(b.price.replace(/,/g, ''));
          return priceA - priceB;
        });
        dealInner.innerHTML = '';

        copyPrice.forEach(function (item) {
          const { img, brand, paragraph, price } = item
          dealInner.insertAdjacentHTML('beforeend', createDealItem(img, brand, paragraph, price));
        });
      }
    });

    const stringSelec = document.querySelector('.string_selec');

    stringSelec.addEventListener('change', () => {
      if (stringSelec.value == '오름차순') {
        copyPrice.sort(function (a, b) {
          return a.brand.localeCompare(b.brand); //문자열 메서드로, 두 문자열을 비교하여 정렬 순서를 결정
        });

        dealInner.innerHTML = '';

        copyPrice.forEach(function (item) {
          const { img, brand, paragraph, price } = item
          dealInner.insertAdjacentHTML('beforeend', createDealItem(img, brand, paragraph, price));
        })
      } else if (stringSelec.value == '내림차순') {
        copyPrice.sort(function (a, b) {
          return b.brand.localeCompare(a.brand);
        });
        dealInner.innerHTML = '';
        copyPrice.forEach(function (item) {
          const { img, brand, paragraph, price } = item
          dealInner.insertAdjacentHTML('beforeend', createDealItem(img, brand, paragraph, price));
        });
      }
    });
  })

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
