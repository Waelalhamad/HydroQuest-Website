/*******************************************************************************************************
 *                                                                                                      *
 *                                           Slider                                                     *
 *                                                                                                      *
 *******************************************************************************************************/

const sliderItems = document.querySelectorAll(".home .slide-list .slide-item");
const sliderPrev = document.querySelector(".slider-btn.prev");
const sliderNext = document.querySelector(".slider-btn.next");

let sliderCount = sliderItems.length;
let slideActive = 0;

let refreshIntervel = setInterval(function () {
  nextSlide();
}, 6000);

function prevSlide() {
  slideActive = slideActive - 1;
  if (slideActive < 0) {
    slideActive = sliderCount - 1;
  }
  showSLider();
}

function nextSlide() {
  slideActive = slideActive + 1;
  if (slideActive >= sliderCount) {
    slideActive = 0;
  }
  showSLider();
}

function showSLider() {
  let slideActiveOld = document.querySelector(
    ".home .slide-list .active-slide"
  );

  slideActiveOld.classList.remove("active-slide");
  sliderItems[slideActive].classList.add("active-slide");

  clearInterval(refreshIntervel);
  refreshIntervel = setInterval(function () {
    nextSlide();
  }, 6000);

  // Reset Animation
  sliderItems[slideActive].querySelector("img").style.animation = "none";
  sliderItems[slideActive].querySelector("img").offsetHeight;
  sliderItems[slideActive].querySelector("img").style.animation = "";
}
