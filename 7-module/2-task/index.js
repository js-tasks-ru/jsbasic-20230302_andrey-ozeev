import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.addEventListener();
  }

  render() {
    this.elem = createElement(`<div class="modal">
    <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
  </div>`);
  }

  addEventListener () {
    this.elem.addEventListener('click', this.onClick);
    document.addEventListener('keydown', this.onKeyDown);
  }

  onClick = () => {
    if (event.target.closest('.modal__close')) {
      this.close();
    }
  }

  onKeyDown = () => {
    if (event.code === 'Escape') {
      this.close();
    }
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  setBody(node) {
    this.elem.querySelector('.modal__body').innerHTML = '';
    this.elem.querySelector('.modal__body').append(node);
  }

  setTitle(text) {
    this.elem.querySelector('.modal__title').textContent = text;
  }

  close() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }

}
