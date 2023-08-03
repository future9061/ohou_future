# 🎇목차

1. [💻프로젝트 소개](#-프로젝트-소개)
2. [✍ 주요 기능 소개](#-주요-기능-소개)
   - [sub menu event](#sub-menu-event)
   - [무한 루프 인기 순위](#무한-루프-인기-순위)
   - [무한 루프 이미지 슬라이드](#무한-루프-이미지-슬라이드)
   - [상품 선택 기능](#상품-선택-기능)
   - [Json data 가져와서 정렬](#json-data-가져와서-정렬)
   - [scroll Top btn](#scroll-top-btn)
3. [🧾 code review](#-code-review)

   <br />

## 💻 프로젝트 소개

<div align="center">
  
   <img src="https://github.com/future9061/ohou_future/assets/132829711/763b526a-74b1-40a1-9740-72d196808230" width="50%">

//url 넣기

   <p align="start">
     오늘의 집을 클론 코딩한 프로젝트 입니다. vanilla javascript로 슬라이드 및 인기순위 애니메이션, json 데이터를 가져와 필터, 정렬 등을 해보았습니다.<br />
    반응형 아직 안함
      
   </p>
</div>

<br />

## ✍ 주요 기능 소개

- ### sub menu event

<img src="https://github.com/future9061/ohou_future/assets/132829711/69b4842f-26cd-4929-9744-e3d012ffdc0a" width="50%">

<br />

메인 메뉴에 마우스를 올리면 하단의 sub menu가 바뀌는 이벤트입니다.  
전에는 메인메뉴와 서브 메뉴의 id를 비교하는 방식을 주로 썼었으나, <br />
이번에는 id 없이 forEach에서 this와 submenu를 비교해 클라스를 추가했습니다. <br />

#### [코드 보기](#sub-menu)

<br />
<br />

- ### 무한 루프 인기 순위

setInterval이 아닌 setTimeout로 만든 인기순위입니다.
인기 순위 함수 내에서 재귀호출로 무한이 인기순위가 돌아갑니다.

#### [코드 보기](#인기-순위)

  <br />
  <img src="https://github.com/future9061/ohou_future/assets/132829711/541b7a41-fec4-497d-9ea4-58f0b7b6747f" width="50%">

<br />
<br />

- ### 무한 루프 이미지 슬라이드

  dom load가 끝나면 무한으로 돌아가는 이미지 슬라이드입니다.
  btn 클릭 시에도 이동하도록 만들었습니다.

#### [코드 보기](#img-slide)

<br />

<br />
<br />

- ### 상품 선택 기능

상품에 있는 하트를 클릭하면 상품명이 LocalStolage에 저장되는 기능입니다.
toggle 형식으로 두번 클릭하면 localSrolage에서 상품명이 사라집니다.

#### [코드 보기](#상품-선택)

<br />
  <img src="https://github.com/future9061/ohou_future/assets/132829711/188bd7a9-2860-4760-bca5-aacb94fddff5" width="40%">

<br />
<br />

- ### Json data 가져와서 정렬
  fetch로 data를 가져와서 string으로 만든 html에 적용해 상품 박스를 만들었습니다.
  sort로 가격순정렬, 글자순정렬도 가능하고 글자 정렬은 brand명 기준입니다.

#### [코드 보기](#json-data)

<br />
  <img src="https://github.com/future9061/ohou_future/assets/132829711/86766a7d-a2f9-439b-ba62-6ab76dfd02a8" width="30%" height="100px">

<br />
<br />

- ### scroll top btn
  사용자의 vh보다 scrollY의 값이 커지면 top 버튼이 나타납니다.<br />
  버튼 클릭 시에는 interval로 scrollY가 -55px씩 올라가며 scrollY가 0이 되면 clear 됩니다.

#### [코드 보기](#top-btn)

<br />

<br />
<br />

## 🧾 code review

<br />

#### sub menu

```javascript
const mainNav = document.querySelectorAll(".main-menu li");
const subNav = document.querySelectorAll(".sub-menu li");

mainNav.forEach((elem, index) => {
  elem.addEventListener("mouseover", function () {
    if (this === mainNav[index]) {
      subNav.forEach((a) => {
        a.classList.remove("z-index");
      });
      subNav[index].classList.add("z-index");
    }
  });
});


//css
.z-index{
  z-index : 3
}
```

<br />

#### 인기 순위

```javascript
const showList = document.querySelector(".show_list_inner ul"); //container인 ul이 margin top으로 이동
let listItemHeight = showList.firstElementChild.offsetHeight; //이동값은 li의 height값 (첫번째 li는 지속적으로 바뀌기 때문에 let)
let marginTop = 0; //이동할 margin 값을 저장할 변수 생성

function moveList() {
  marginTop -= listItemHeight;
  showList.style.marginTop = `${marginTop}px`;

  showList.appendChild(showList.firstElementChild.cloneNode(true)); //li 첫번째를 복사해 append
  showList.removeChild(showList.firstElementChild); // 그리고 올라간 첫번째 li는 삭제
  marginTop += listItemHeight; // 새로운 li 만들어졌으니 리셋함. mt값이 무한이 증가하지 않게 한다.
  showList.style.marginTop = `${marginTop}px`;

  setTimeout(moveList, 1500); //moveList 내에서 함수를 또 실행(재귀호출)
}

window.addEventListener("DOMContentLoaded", function () {
  moveList(); //dom 로드가 끝나면 moveList 함수 실행
});
```

<br />

#### Img slide

버튼 클릭시 이동하는 이미지 슬라이드

```javascript
const rightBtn = document.querySelector(".arrow_right");
const leftBtn = document.querySelector(".arrow_left");
const next = false; //버튼을 구분할 변수 생성
const pre = true;
const slideUl = document.querySelector(".main_banner2_wrap ul"); //margin 값으로 움직일 slide container
let slideLi = document.querySelectorAll(".main_banner2_wrap ul li"); //li는 무한 루프에서 계속 변경되기 때문에 let으로 선언
const itemWidth = slideLi[0].offsetWidth; //container가 움직일 margin 값
const totalValue = -(slideLi.length - 1) * itemWidth;
let marginValue = 0;

function moveSlide(btn) {
  if (!btn && marginValue > totalValue) {
    marginValue -= itemWidth;
    console.log(marginValue, totalValue, btn);
    slideUl.style.marginLeft = `${marginValue}px`;
  }

  if (btn && marginValue !== 0) {
    marginValue += itemWidth;
    slideUl.style.marginLeft = `${marginValue}px`;
  }
}

rightBtn.addEventListener("click", () => moveSlide(next));
leftBtn.addEventListener("click", () => {
  moveSlide(pre);
});
```

무한 루프 이미지 슬라이드

1. ul이 marginLeft로 이동한다
2. 첫 번째 슬라이드를 복사해서 ul에 append한 후 첫번째 li를 삭제한다.
3. reset : marginLeft 값을 초기화한다.
4. 여기서 중요한 부분은 reset하는 과정이 보인다는 점이다. 때문에 이동하는 함수와 초기화 함수를 별도로 만들고 초기화 함수에서는 transition을 0으로 설정했다.

```javascript
//margin-left로 이동하는 함수
function moveMarginLeft() {
  slideLi = document.querySelectorAll(".main_banner2_wrap ul li"); //변경된 li로 업데이트
  marginValue = -itemWidth;
  slideUl.style.marginLeft = `${marginValue}px`;
  slideUl.style["transition"] = "0.3s"; //transition을 별도로 주는 이유는 reset 될 때 transition을 0으로 해야하기 때문
}

//reset하는 함수 setTimeout
function resetMargin() {
  setTimeout(() => {
    slideUl.style.marginLeft = 0; //초기화
    slideUl.style["transition"] = "0s";
    let cloneItem = slideLi[0].cloneNode(true);
    slideUl.appendChild(cloneItem);
    slideUl.removeChild(slideLi[0]);
  }, 300);
}

function autoslide() {
  moveMarginLeft();

  resetMargin();

  setTimeout(() => {
    autoslide(); //재귀 호출
  }, 2000);
}

autoslide();
```

<br />

#### 상품 선택

1. 하트를 클릭하면 배열에 넣어서 localStolage에 넣는다.
2. 두 번 클릭하면 filter로 클릭한 요소만 제외하고 배열을 반환해서 localstolage에 넣는다.

```javascript
const userHart = document.querySelectorAll(".fa-heart");
const post = document.querySelectorAll(".section1_box");
let stringArr = []; //localStolage에 넣을 배열 선언

userHart.forEach((a, i) => {
  let heartTogg = false;

  a.addEventListener("click", function (e) {
    heartTogg = !heartTogg;

    if (e.target == a) {
      //하트를 한번 클릭했을 때
      if (heartTogg) {
        a.style.color = "#00bbff";
        const postTitle = post[i].querySelector("p").innerText;
        if (!stringArr.includes(postTitle)) {
          //이미 저장된 상품명인지 확인
          stringArr.push(postTitle);
        }
      }
      //하트를 두번 클릭했을 때
      if (!heartTogg) {
        a.style.color = "#fff";
        postTitle = post[i].querySelector("p").innerText;
        stringArr = stringArr.filter((text) => text !== postTitle); //클릭한 상품명 제외하고 return
      }
      let newStringArr = JSON.stringify(stringArr); //local에 넣기 위해 string으로 변환
      localStorage.setItem("post", newStringArr);
    }
  });
});
```

<br />

#### Json data

json data 가져오기

1. fatch로 data를 가져온다.
2. html을 문자로 만들어서 data를 적용한다.
3. 처음 페이지가 로드됐을 때는 상품이 4개만 보이게 for문으로 만든다.
4. 더 보기 버튼을 누르면 container 초기화 후 모든 상품을 보여준다.
5. 버튼은 토글 형태로 짝수로 클릭했을 때만 모든 상품이 보이고 홀수로 클릭하면 상품이 4개만 보인다.

```javascript

let btnCount = 0; //상품 더보기 버튼의 클릭 횟수 카운트

function createDealItem(image, small, p, b) {
  return `
    <div class="today_deal_item cr">
      <div class="img_wrap relative">
        <img src="${image}" alt="">
        <div class="today_timer">00:00:00 남음</div>
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
```

<br />

가격순 정렬

1. data를 spread operator으로 카피 본을 만든다.
2. copyData를 sort로 정렬한다.
3. 상품 보여줄 공간을 초기화한다.
4. sort에서 정렬되어 return된 데이터를 만들어둔 html에 적용하여 상품을 보여준다.

```javascript

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
    });

```

낮은 가격순과 글자 정렬도 같은 방법으로 만들었습니다. <br />
글자 정렬시에는 localeCompare 문자열 메서드로 문자를 비교했습니다.

<br />

#### top btn

1. clientHeight으로 스크롤Y 값이 사용자의 vh 값보다 커지면 탑 버튼이 나타난다.
2. top 버튼을 클릭하면 setInterval로 scrollY에서 -55px씩 위로 올라간다.
3. scrollY가 0이 되면 clearInterval로 interval을 종료한다.

```javascript
//top 버튼 나타나는 함수
const topBtn = document.querySelector(".top-btn");
const documentEle = document.documentElement;

window.addEventListener("scroll", () => {
  if (window.scrollY > documentEle.clientHeight) {
    topBtn.classList.remove("opacity");
  } else {
    topBtn.classList.add("opacity");
  }
});

//scroll 올라가는 함수
let scrollInterval;

function scrollToTop() {
  if (window.scrollY !== 0) {
    window.scrollTo(0, window.scrollY - 55); //현재 scrollY의 값에서 -55씩 올라감
  } else {
    clearInterval(scrollInterval);
  }
}

topBtn.addEventListener("click", () => {
  if (window.scrollY !== 0) {
    scrollInterval = setInterval(scrollToTop, 10);
  }
});
```
