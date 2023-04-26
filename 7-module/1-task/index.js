import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render(categories);
    this.ribbonIner = this.elem.querySelector('.ribbon__inner');
    this.ribbonArrowNext = this.elem.querySelector('.ribbon__arrow_right');
    this.ribbonArrowPrev = this.elem.querySelector('.ribbon__arrow_left');
    this.ribbonArrows();
    this.ribbonArrowNext.addEventListener('click', () => this.scrollToNext());
    this.ribbonArrowPrev.addEventListener('click', () => this.scrollToPrevios());
    this.elem.addEventListener('click', (event) => this.currentRibbonItem(event));
  }

  render(carousel) {
    let ribbon = document.createElement('div');
    ribbon.classList.add('ribbon');
    ribbon.innerHTML =
      `<button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner"></nav>
      <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>`;

    let ribbonIner = ribbon.querySelector('.ribbon__inner');
    let ribbonElem = this.categories.map(category =>`<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`).join('');
    ribbonIner.innerHTML = ribbonElem;

    return ribbon;
  }

  ribbonArrows () {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let arrows = this.elem.querySelectorAll('.ribbon__arrow');
    let ribbonArrowToNext = this.elem.querySelector('.ribbon__arrow_right');
    let ribbonArrowToPrev = this.elem.querySelector('.ribbon__arrow_left');
    ribbonArrowToNext.classList.add('ribbon__arrow_visible');
    ribbonArrowToPrev.classList.remove('ribbon__arrow_visible');

    for (let arrow of arrows) {
      arrow.addEventListener('click', function() {
        let scrollLeft = ribbonInner.scrollLeft;
        let clientWidth = ribbonInner.clientWidth;
        let scrollWidth = ribbonInner.scrollWidth;
        let scrollRight = scrollWidth - scrollLeft - clientWidth;

        if (scrollLeft == 0) {
          ribbonArrowToPrev.classList.toggle('ribbon__arrow_visible');
        }

        if (scrollRight == 0) {
          ribbonArrowToNext.classList.toggle('ribbon__arrow_visible');
        }

      });
    }
  }

  currentRibbonItem(event) {
    let elems = this.elem.querySelectorAll('.ribbon__item');
    Array.from(elems).map(elem => {
      elem.classList.remove('ribbon__item_active');
      event.preventDefault();
      event.target.classList.add('ribbon__item_active');

      this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: event.target.dataset.id,
        bubbles: true
      }));
    });
  }

  scrollToNext() {
    this.ribbonIner.scrollBy(350, 0);
  }

  scrollToPrevios() {
    this.ribbonIner.scrollBy(-350, 0);
  }
}
