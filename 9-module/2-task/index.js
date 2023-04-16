import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let body = document.querySelector('body');
    let carouselHolder = body.querySelector('[data-carousel-holder]');
    let ribbonlHolder = body.querySelector('[data-ribbon-holder]');
    let sliderlHolder = body.querySelector('[data-slider-holder]');
    let cartIconlHolder = body.querySelector('[data-cart-icon-holder]');
    let productsGridHolder = body.querySelector('[data-products-grid-holder]');

    let promise = new Promise((resolve) => {
      let carousel = new Carousel(slides);
      carouselHolder.append(carousel.elem);

      let ribbonMenu = new RibbonMenu(categories);
      ribbonlHolder.append(ribbonMenu.elem);

      let stepSlider = new StepSlider({ steps: 5, value: 3 });
      sliderlHolder.append(stepSlider.elem);

      let cartIcon = new CartIcon();
      cartIconlHolder.append(cartIcon.elem);

      let cart = new Cart(cartIcon);

      let data;
      let productsGrid;
      async function getProductsGrid() {
        let response = await fetch('products.json');
        let responseJson = await response.json();
        data = await responseJson;

        productsGrid = new ProductsGrid(data);
        productsGridHolder.replaceChildren(productsGrid.elem);

        productsGrid.updateFilter({
          noNuts: document.getElementById('nuts-checkbox').checked,
          vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
          maxSpiciness: stepSlider.value,
          category: ribbonMenu.value,
        });
      }
      getProductsGrid();

      body.addEventListener('product-add', () => {
        let productId = event.detail;
        let product = data.find((item) => {
          if (item.id === productId) {
            return item;
          }
        });

        cart.addProduct(product);
      });

      sliderlHolder.addEventListener('slider-change', () => {
        productsGrid.updateFilter({ maxSpiciness: event.detail });
      });

      ribbonlHolder.addEventListener('ribbon-select', () => {
        productsGrid.updateFilter({ category: event.detail });
      });

      let natsCheckbox = body.querySelector('#nuts-checkbox');
      let vegetarianCheckbox = body.querySelector('#vegeterian-checkbox');

      natsCheckbox.addEventListener('change', () => {
        productsGrid.updateFilter({ noNuts: natsCheckbox.checked });
      });

      vegetarianCheckbox.addEventListener('change', () => {
        productsGrid.updateFilter({ vegeterianOnly: vegetarianCheckbox.checked });
      });

      resolve();
    });

    return promise;
  }
}
