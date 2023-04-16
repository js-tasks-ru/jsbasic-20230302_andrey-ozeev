import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      let cartItem;
      let find = this.cartItems.find((item) => {
        if (item.product == product) {
          return item.product;
        }
      });
      if (find) {
        find.count++;
      } else {
        cartItem = {
          product,
          count: 1,
        };
        this.cartItems.push(cartItem);
      }
      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    this.cartItems.find((cartItem) => {
      if (cartItem) {
        if (cartItem.product.id == productId) {
          cartItem.count += amount;
          this.onProductUpdate(cartItem);

          if (cartItem.count === 0) {
            let index = this.cartItems.indexOf(cartItem);
            this.cartItems.splice(index, 1);
            return;
          }
        }
      }
      return;
    });
  }

  isEmpty() {
    if (this.cartItems.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  getTotalCount() {
    let count = 0;

    this.cartItems.find((item) => {
      count += item.count;
    });
    return count;
  }

  getTotalPrice() {
    let price = 0;

    this.cartItems.find((item) => {
      price += item.product.price * item.count;
    });
    return price;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();

    this.body = document.createElement('div');
    for (let i = 0; i < this.cartItems.length; i++) {
      let product = this.cartItems[i].product;
      let count = this.cartItems[i].count;

      let item = this.renderProduct(product, count);

      this.body.append(item);
    }
    this.body.append(this.renderOrderForm());

    this.body.addEventListener('click', (evt) => {
      if (evt.target.closest('.cart-counter__button_minus')) {
        this.cartItem = evt.target.closest('.cart-product');
        this.id = this.cartItem.dataset.productId;
        this.updateProductCount(this.id, -1);
      }
      if (evt.target.closest('.cart-counter__button_plus')) {
        this.cartItem = evt.target.closest('.cart-product');
        this.id = this.cartItem.dataset.productId;
        this.updateProductCount(this.id, 1);
      }
    });

    this.form = this.body.querySelector('.cart-form');
    this.form.addEventListener('submit', () => {
      this.onSubmit(event);
    });

    this.modal.setTitle('Your order');
    this.modal.setBody(this.body);
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.querySelector('body').classList.contains('is-modal-open')) {
      let productId = cartItem.product.id;
      let modalBody = this.body;

      let product = modalBody.querySelector(`[data-product-id="${productId}"]`);
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = `${cartItem.count}`;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (cartItem.count === 0) {
        product.remove();
      }

      if (this.getTotalCount() === 0) {
        this.modal.close();
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();

    let btn = this.form.querySelector('button[type="submit"]');
    btn.classList.add('is-loading');

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(this.form),
    }).then((response) => {
      if (response.ok) {
        let successBody = createElement(`
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
        `);

        this.modal.setTitle('Success!');
        this.cartItems.length = 0;
        this.cartIcon.update(this);
        this.modal.setBody(successBody);
        return;
      } else {
        return;
      }
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

