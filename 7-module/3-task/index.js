import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.render();
    this.addEventListeners();
  }

  render() {
    let sliderSteps = [];
    for (let i = 0; i < this.steps; i++) {
      sliderSteps.push('<span></span>');
    }

    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
        ${sliderSteps.join('')}
        </div>
      </div>
    `);

    return this.elem;
  }

  addEventListeners() {
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderValue = this.elem.querySelector('.slider__value');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let sliderSteps = this.elem.querySelectorAll('.slider__steps span');
    let segments = this.steps - 1;

    sliderSteps[0].classList.add('slider__step-active');
    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let approximateValue = leftRelative * segments;

      this.value = Math.round(approximateValue);
      let valuePercents = (this.value / segments) * 100;

      sliderValue.textContent = this.value;
      sliderThumb.style.left = `${valuePercents}%`;
      sliderProgress.style.width = `${valuePercents}%`;
      sliderSteps.forEach((sliderStep) => {
        sliderStep.classList.remove('slider__step-active');
      });
      sliderSteps[this.value].classList.add('slider__step-active');

      this.elem.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true,
        })
      );
    });
  }
}
