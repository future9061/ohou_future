//닫기 버튼 누르면 배너 사라짐

const closeBtn = document.querySelector(".close_btn"),
  bannerTop = document.querySelector(".banner1");

closeBtn.addEventListener("click", function () {
  bannerTop.style.display = "none";
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

//하트 클릭하면 색깔 변하게, 로컬 스토리지에  p문구 들어가게(배열로)
const userHart = document.querySelectorAll(".fa-heart");
console.log(userHart);
