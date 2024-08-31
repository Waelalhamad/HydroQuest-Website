import logo from './logo.svg';
import notFoundGallery from "./assets/download.png"
import img1 from "./assets/slider-1.jpg"
import img2 from "./assets/slider-2.jpg"
import img3 from "./assets/slider-3.jpg"
import img4 from "./assets/slider-4.jpeg"
import './App.css';

import { useEffect, useState } from 'react';
import Swiper from "swiper";

function App() {

  useEffect(() => {
    const swiper = new Swiper(".js-testimonials-slider", {
      grabCursor: true,
      spaceBetween: 50,
      breakpoints: {
        767: {
          slidesPerView: 2,
        },
      },
    });
    // Cleanup on unmount
    return () => {
      swiper.destroy(true, true);
    };
  }, []);

  const [slideActive, setSlideActive] = useState(0);
  const sliderItems = [
    {
      img: img1,
      alt: "Underwater Exploration",
      title: "Hydro Quest",
      subtitle: "Autonomous Underwater Submarine",
      description:
        "Discover the depths of the ocean with Hydro Quest, an innovative autonomous submarine by Team Hope, designed for exploration and environmental preservation.",
    },
    {
      img: img2,
      alt: "Advanced Technology",
      title: "Innovative Design",
      subtitle: "Cutting-Edge Submarine Technology",
      description:
        "Hydro Quest combines state-of-the-art technology with a commitment to sustainability, offering unparalleled exploration capabilities.",
    },
    {
      img: img3,
      alt: "Mission-Ready",
      title: "Explore the Deep",
      subtitle: "Mission-Ready for Ocean Discovery",
      description:
        "Engineered to withstand the challenges of the deep sea, Hydro Quest is your partner in scientific and environmental research.",
    },
    {
      img: img4,
      alt: "Sustainable Exploration",
      title: "Team Hope",
      subtitle: "Pioneers in Sustainable Exploration",
      description:
        "Join Team Hope in pioneering sustainable ocean exploration with Hydro Quest, a testament to innovation and environmental stewardship.",
    },
  ];

  useEffect(() => {
    const refreshInterval = setInterval(nextSlide, 6000);
    return () => clearInterval(refreshInterval);
  }, [slideActive]);

  const prevSlide = () => {
    setSlideActive((prev) => (prev - 1 + sliderItems.length) % sliderItems.length);
  };

  const nextSlide = () => {
    setSlideActive((prev) => (prev + 1) % sliderItems.length);
  };

  const showSlider = (index) => {
    setSlideActive(index);
  };



  useEffect(() => {
    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll(".nav-links li a");
    const sections = document.querySelectorAll("section");

    function onScroll() {
      let scrollTop = window.pageYOffset;

      if (scrollTop > 0) {
        header.classList.add("with-bg");
        navLinks.forEach((link) => link.classList.add("topLink"));
      } else {
        header.classList.remove("with-bg");
        navLinks.forEach((link) => link.classList.remove("topLink"));
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

    function onClick(event) {
      navLinks.forEach((link) => link.classList.remove("active-nav"));
      event.target.classList.add("active-nav");
    }

    window.addEventListener("scroll", onScroll);

    navLinks.forEach((link) => {
      link.addEventListener("click", onClick);
    });

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", onScroll);
      navLinks.forEach((link) => link.removeEventListener("click", onClick));
    };
  }, []);


  return (
<div className = "body">
  {/* Header */}
  <header>
    <div className="container">
      <a id="nav-menu" className="nav-menu">
        <ion-icon name="menu-outline" />
      </a>
      <a href="#" className="logo">
            <img src={logo} alt='logo' />
      </a>
      <nav className="main-nav">
        <ul className="nav-links">
          <li><a href="#home" className="nav-link active-nav">Home</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#gallery" className="nav-link">Gallery</a></li>
          <li><a href="#team" className="nav-link">Team</a></li>
          <li><a href="#features" className="nav-link">Features</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
      </nav>
      <div className="sign-up">
        <a href="http://localhost:3000/dashboard" className="button">Get started</a>
      </div>
    </div>
  </header>
  {/* Main Content Section */}
  <main>
    {/* Home Section */}
    <section className="home" id="home">
      <div className="slide-list">
        {sliderItems.map((item, index) => (
          <div
            key={index}
            className={`slide-item ${index === slideActive ? "active-slide" : ""}`}
          >
            <img src={item.img} alt={item.alt} className={index === slideActive ? "animate" : ""} />
            <div className="slide-content">
              <h3>
                <span>{item.title}</span>
              </h3>
              <h1>{item.subtitle}</h1>
              <p>{item.description}</p>
              <a href="#" className="btn-main">
                Get Started
              </a>
            </div>
          </div>
        ))}
      </div>
      <button
        className="slider-btn-main prev"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <ion-icon name="chevron-back-outline" />
      </button>
      <button
        className="slider-btn-main next"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <ion-icon name="chevron-forward-outline" />
      </button>
    </section>
    {/* About Section */}
    <section className="about" id="about">
      <h1 className="heading">About <span>US</span></h1>
      <div className="about-bottom container">
        <div className="row g-5">
          <div className="about-bottom--content col-lg-6 d-flex flex-column gap-3" data-aos="fade-up">
            <h2 className="mini-title align-self-start">
              <span className="actual-text">&nbsp;Design and Programming&nbsp;</span>
              <span aria-hidden="true" className="hover-text">&nbsp;Design and Programming&nbsp;</span>
            </h2>
            <p>
              The Hydro-Quest is an innovative submarine designed to address
              the challenges of exploring underwater organisms. It utilizes
              modern scanning technologies, enabling it to gather information
              from deep-sea territories that were previously inaccessible.
              This data is then analyzed using complex analytical tools,
              allowing for a detailed understanding of how underwater
              ecosystems function. Additionally, it enhances our comprehension
              and helps us protect these fragile habitats by offering an
              educational perspective on marine life.
            </p>
            {/* Animated btn-main */}
            <button className="animated-button align-self-start">
              <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
              </svg>
              <span className="text">Learn More</span>
              <span className="circle" />
              <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
              </svg>
            </button>
          </div>
          <figure className="about-bottom--img col-lg-6" data-aos="fade-up">
            <img src={notFoundGallery} alt className="img-fluid" />
          </figure>
        </div>
      </div>
    </section>
    {/* Gallery Section */}
    <section className="gallery" id="gallery">
      <div className="gallery-top">
        <h1 className="heading">Our <span>Gallery</span></h1>
      </div>
      <div className="container g-4">
        <div className="row g-4">
          <div className="col-lg-4" data-aos="zoom-in-up">
            <img src={notFoundGallery} alt />
          </div>
          <div className="col-lg-4" data-aos="zoom-in-up">
            <img src={notFoundGallery} alt />
          </div>
          <div className="col-lg-4" data-aos="zoom-in-up">
            <img src={notFoundGallery} alt />
          </div>
        </div>
      </div>
      <a href="#features" className="btn-main align-self-center" data-aos="zoom-in-up">Learn More</a>
    </section>
    {/* Team Section */}
    <section className="team" id="team">
      <h2 className="heading">Our <span>Team</span></h2>
      <div className="section testimonials">
        <div className="container">
          <div className="testimonials-content">
            <div className="swiper js-testimonials-slider">
              <div className="swiper-wrapper">
                <div className="swiper-slide testimonials-item" data-aos="fade-right">
                  <div className="info">
                    <img src={notFoundGallery} alt="Client Photo" />
                    <div className="text-box">
                      <h3 className="name">Anas Homsi</h3>
                      <span className="job">Web Developer</span>
                    </div>
                  </div>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam accusamus illo natus ab blanditiis dolorem
                    incidunt obcaecati omnis cumque dignissimos.
                    Necessitatibus quia quam labore. Quam, mollitia
                    asperiores? Ipsam, accusamus voluptas.
                  </p>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                </div>
                <div className="swiper-slide testimonials-item" data-aos="fade-left">
                  <div className="info">
                    <img src={notFoundGallery} alt="Client Photo" />
                    <div className="text-box">
                      <h3 className="name">Lana Sabakh</h3>
                      <span className="job">Programmer</span>
                    </div>
                  </div>
                  <p>
                    My name is Lana, a 15-year-old from Syria. I enjoy
                    computer activities and creating unique things. I’m
                    committed to studying neurology and will strive to achieve
                    this goal. Additionally, I have a hobby interest in
                    mechanical engineering.
                  </p>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                </div>
                <div className="swiper-slide testimonials-item">
                  <div className="info">
                    <img src={notFoundGallery} alt="Client Photo" />
                    <div className="text-box">
                      <h3 className="name">Mais Alreem</h3>
                      <span className="job">Researcher</span>
                    </div>
                  </div>
                  <p>
                    Mais Alreem Moheb Aldin is a 14-year-old student from
                    Syria currently in 8th grade. She has a passion for
                    solving puzzles and riddles and has gained programming
                    experience through participation in several programming
                    and computer courses.
                  </p>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                </div>
                <div className="swiper-slide testimonials-item">
                  <div className="info">
                    <img src="./assets/download.png" alt="Client Photo" />
                    <div className="text-box">
                      <h3 className="name">Wael</h3>
                      <span className="job">Programmer</span>
                    </div>
                  </div>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam accusamus illo natus ab blanditiis dolorem
                    incidunt obcaecati omnis cumque dignissimos.
                    Necessitatibus quia quam labore. Quam, mollitia
                    asperiores? Ipsam, accusamus voluptas.
                  </p>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                </div>
                <div className="swiper-slide testimonials-item">
                  <div className="info">
                    <img src={notFoundGallery} alt="Client Photo" />
                    <div className="text-box">
                      <h3 className="name">Leen Shehadi</h3>
                      <span className="job"> Designer </span>
                    </div>
                  </div>
                  <p>
                    My name is Leen Shehadi. I am 14 years old and from Syria,
                    currently in grade 9. I have a deep interest in reading
                    intriguing novels and a strong passion for writing short
                    stories. Writing is my favorite hobby and a cherished
                    creative outlet.
                  </p>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                </div>
                <div className="swiper-slide testimonials-item">
                  <div className="info">
                    <img src="./assets/download.png" alt="Client Photo" />
                    <div className="text-box">
                      <h3 className="name">Hadi Shrouf</h3>
                      <span className="job">coordinator</span>
                    </div>
                  </div>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam accusamus illo natus ab blanditiis dolorem
                    incidunt obcaecati omnis cumque dignissimos.
                    Necessitatibus quia quam labore. Quam, mollitia
                    asperiores? Ipsam, accusamus voluptas.
                  </p>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                </div>
                <div className="swiper-slide testimonials-item">
                  <div className="info">
                    <img src={notFoundGallery} alt="Client Photo" />
                    <div className="text-box">
                      <h3 className="name">Shahid ..</h3>
                      <span className="job">web developer</span>
                    </div>
                  </div>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquam accusamus illo natus ab blanditiis dolorem
                    incidunt obcaecati omnis cumque dignissimos.
                    Necessitatibus quia quam labore. Quam, mollitia
                    asperiores? Ipsam, accusamus voluptas.
                  </p>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                </div>
                {/* Repeat the above swiper-slide block for more testimonials */}
              </div>
              {/* Pagination */}
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Features Section */}
    <section className="features" id="features">
      <div className="features--title">
        <h2 className="heading">Our <span> Features </span></h2>
      </div>
      <div className="features--container">
        <div className="features--item__1" data-aos="fade-right">
          <div className="features--item__num">
            <h2>01</h2>
            <p>HydroQest Features</p>
            <div className="traingle" />
          </div>
          <div className="shadow" />
          <i className="fa-solid fa-house" />
          <div className="features--item__content-bottom">
            <div className="features__content--title">
              <i className="fa-solid fa-plus" />
              <h3>STEP ONE</h3>
            </div>
            <p className="features__content--para">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Deserunt, impedit beatae. Eum voluptatum placeat perspiciatis
              quo eos minima quae illo!
            </p>
          </div>
        </div>
        <div className="features--item__1 feature2" data-aos="fade-left">
          <div className="features--item__num">
            <h2>02</h2>
            <p>HydroQest Features</p>
            <div className="traingle" />
          </div>
          <i className="fa-solid fa-house" />
          <div className="shadow" />
          <div className="features--item__content-bottom">
            <div className="features__content--title">
              <i className="fa-solid fa-plus" />
              <h3>STEP ONE</h3>
            </div>
            <p className="features__content--para">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Deserunt, impedit beatae. Eum voluptatum placeat perspiciatis
              quo eos minima quae illo!
            </p>
          </div>
        </div>
        <div className="features--item__1" data-aos="fade-right">
          <div className="features--item__num">
            <h2>04</h2>
            <p>HydroQest Features</p>
            <div className="traingle" />
          </div>
          <i className="fa-solid fa-house"> </i>
          <div className="shadow" />
          <div className="features--item__content-bottom">
            <div className="features__content--title">
              <i className="fa-solid fa-plus" />
              <h3>STEP ONE</h3>
            </div>
            <p className="features__content--para">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Deserunt, impedit beatae. Eum voluptatum placeat perspiciatis
              quo eos minima quae illo!
            </p>
          </div>
        </div>
        <div className="features--item__1" data-aos="fade-left">
          <div className="features--item__num">
            <h2>03</h2>
            <p>HydroQest Features</p>
            <div className="traingle" />
          </div>
          <div className="shadow" />
          <i className="fa-solid fa-house" />
          <div className="features--item__content-bottom">
            <div className="features__content--title">
              <i className="fa-solid fa-plus" />
              <h3>STEP ONE</h3>
            </div>
            <p className="features__content--para">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Deserunt, impedit beatae. Eum voluptatum placeat perspiciatis
              quo eos minima quae illo!
            </p>
          </div>
        </div>
      </div>
    </section>
    {/* Contact Section */}
    <section className="contact" id="contact">
      <h1 className="heading">Hydro<span>Quest</span></h1>
      <div className="contact--container">
        <div className="rightSide" data-aos="fade-right">
          <div className="rightSide--title">
            <h2>Contact</h2>
            <h2>Us</h2>
          </div>
          <div className="rightSide--box" />
        </div>
        <form className="leftSide" id="contact-form" data-aos="fade-left">
          <input type="text" id="form-name" placeholder="Name" />
          <input type="email" id="form-email" placeholder="Email" />
          <textarea id="form-message" placeholder="Message" defaultValue={""} />
          <button type="submit" id="submit">Submit</button>
        </form>
      </div>
    </section>
  </main>

  <footer>
    <div className="footer-content">
      <div className="footer-col">
        <a href="#" className="logo">
        <img src={logo} alt="logo" />
        </a>
      </div>
      <div className="footer-col">
        <h2>Quick<span>links</span></h2>
        <ul>
          <li><a href="#home" className="nav-link active-nav">Home</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#gallery" className="nav-link">Gallery</a></li>
          <li><a href="#team" className="nav-link">Team</a></li>
          <li><a href="#features" className="nav-link">Features</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h2>Follow <span>Us</span></h2>
        <ul>
          <li />
          <li />
        </ul>
      </div>
      <div className="footer-col">
        <h2>News<span>letter</span></h2>
        <form>
          <input type="email" placeholder="Enter Your Email:" id="news" required />
          <button type="submit" aria-label="Submit Email">Submit</button>
        </form>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2024 <span>Team Hope</span></p>
    </div>
  </footer>

  <div id="scrollUp" className="scroll-up">
    <ion-icon name="chevron-up-outline" />
  </div>

  {/* Link Custom JS File */}
  {/* Icons Library */}
  {/* Bootsrap Library */}
  {/* Swiper Js to Team Section */}
  {/* Aos Library  */}

</div>

  );
}

export default App;
