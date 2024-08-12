/*******************************************************************************************************
 *                                                                                                      *
 *                                           Navbar                                                     *
 *                                                                                                      *
 *******************************************************************************************************/
/*******************************************************************************************************
 *                                                                                                      *
 *                                           Navbar                                                     *
 *                                                                                                      *
 *******************************************************************************************************/
const header = document.querySelector("header");
const navLinks = document.querySelectorAll(".nav-links li a");
const sections = document.querySelectorAll("section");

function onScroll() {
  let scrollTop = window.pageYOffset;

  if (scrollTop > 0) {
    header.classList.add("with-bg");
  } else {
    if (scrollTop === 0) {
      header.classList.remove("with-bg");
    }
  }

  // Update active nav link based on scroll position
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollTop >= sectionTop - 50 &&
      scrollTop < sectionTop + sectionHeight - 50
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active-nav");
        if (link.getAttribute("href").includes(sectionId)) {
          link.classList.add("active-nav");
        }
      });
    }
  });
}

// Function to handle click event on nav links
function onClick(event) {
  navLinks.forEach((link) => link.classList.remove("active-nav"));
  event.target.classList.add("active-nav");
}

// Attach scroll event listener
window.addEventListener("scroll", onScroll);

// Attach click event listeners to nav links
navLinks.forEach((link) => {
  link.addEventListener("click", onClick);
});

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
