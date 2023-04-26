import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.filteredProducts;

    this.render();
    this.updateFilter();
  }

  render() {
    this.elem = createElement(`
			<div class="products-grid">
				<div class="products-grid__inner">
				</div>
			</div>
    `);
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    let final = () => {
      let array = [];

      this.products.filter((product) => {
        if (this.filters.noNuts && product.nuts) {
          return product;
        }
        if (this.filters.vegeterianOnly && !product.vegeterian) {
          return product;
        }
        if ((this.filters.maxSpiciness || this.filters.maxSpiciness === 0) && (this.filters.maxSpiciness < product.spiciness)) {
          return product;
        }
        if (this.filters.category) {
          if (product.category !== this.filters.category) {
            return product;
          }
        }

        array.push(product);
      });

      return array;
    };
    let result = final();

    this.#showProducts(result);
    Object.assign(this.filters, '');
  }

  #showProducts(array) {
    this.elem.querySelector('.products-grid__inner').replaceChildren();
    for (let product of array) {
      let item = new ProductCard(product);

      this.elem.querySelector('.products-grid__inner').append(item.elem);
    }
  }

  #final() {
    let array = [];

    this.products.filter((product) => {
      if (this.filters.noNuts && product.nuts) {
        return product;
      }
      if (this.filters.vegeterianOnly && !product.vegeterian) {
        return product;
      }
      if ((this.filters.maxSpiciness || this.filters.maxSpiciness === 0) && (this.filters.maxSpiciness < product.spiciness)) {
        return product;
      }
      if (this.filters.category) {
        if (product.category !== this.filters.category) {
          return product;
        }
      }

      array.push(product);
    });

    return array;
  }
}
