function initCarousel() {
  let slider = document.querySelector('[data-carousel-holder]');
  const carouselArrowPre = document.querySelector('.carousel__arrow_left');
  const carouselArrowNext = document.querySelector('.carousel__arrow_right');

  let slide = slider.querySelector('.carousel__inner');
  let amountSlides = 4;
  let currentSlideNumber = 0;

  moveSlide();

  function moveSlide() {
    let offset = -slide.offsetWidth * currentSlideNumber;
    slide.style.transform = `translateX(${offset}px)`;

    if (currentSlideNumber == amountSlides - 1) {
      carouselArrowNext.style.display = 'none';
    } else {
      carouselArrowNext.style.display = '';
    }

    if (currentSlideNumber == 0) {
      carouselArrowPre.style.display = 'none';
    } else {
      carouselArrowPre.style.display = '';
    }
  }

  function toNextSlide() {
    currentSlideNumber++;
    moveSlide();
  }
  function toPrevSlide() {
    currentSlideNumber--;
    moveSlide();
  }
  slider.addEventListener('click', function(event) {
    if (event.target.closest('.carousel__arrow_right')) {
      toNextSlide();
    } else if (event.target.closest('.carousel__arrow_left')) {
      toPrevSlide();
    }
  });
}
