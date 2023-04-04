import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.rendering();
  }

  rendering() {
    this.elem = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon" />
      </div>
      <div class="carousel__inner"></div>
    </div>
    `);

    let slides = this.slides.map(item => createElement(`
    <div class="carousel__slide" data-id="${item.id}">
      <img
        src="/assets/images/carousel/${item.image}"
        class="carousel__img"
        alt="slide"
      />
      <div class="carousel__caption">
        <span class="carousel__price">€${item.price.toFixed(2)}</span>
        <div class="carousel__title">${item.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon" />
        </button>
      </div>
    </div>
    `));

    this.elem.querySelector('.carousel__inner').append(...slides);
    this.currentSlideNumber = 0;
    this.amountSlides = this.elem.querySelectorAll('.carousel__slide').length;
    this.carouselInnerElem = this.elem.querySelector('.carousel__inner');
    this.slide = this.elem.querySelector('.carousel__slide');
    this.carouselArrowNext = this.elem.querySelector('.carousel__arrow_right');
    this.carouselArrowPre = this.elem.querySelector('.carousel__arrow_left');
    this.moveSlide();
    this.elem.addEventListener('click', this.onClick);

    return this.elem;
  }

  onClick = (event) => {
    if (event.target.closest('.carousel__arrow_right')) {
      this.currentSlideNumber++;
      this.moveSlide();
    } else if (event.target.closest('.carousel__arrow_left')) {
      this.currentSlideNumber--;
      this.moveSlide();
    }

    let btn = event.target.closest('.carousel__button');
    let slide = event.target.closest('.carousel__slide');
    if (btn) {
      let customEvent = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
        detail: slide.dataset.id, // Уникальный идентификатора товара из объекта товара
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      });

      this.elem.dispatchEvent(customEvent);
    }
  }
  moveSlide = () => {
    let offset = -this.carouselInnerElem.offsetWidth * this.currentSlideNumber;
    this.carouselInnerElem.style.transform = `translateX(${offset}px)`;

    if (this.currentSlideNumber == this.amountSlides - 1) {
      this.carouselArrowNext.style.display = 'none';
    } else {
      this.carouselArrowNext.style.display = '';
    }

    if (this.currentSlideNumber == 0) {
      this.carouselArrowPre.style.display = 'none';
    } else {
      this.carouselArrowPre.style.display = '';
    }
  };
}
