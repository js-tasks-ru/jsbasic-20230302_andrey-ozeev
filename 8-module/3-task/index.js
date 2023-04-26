export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    return this.cartItems.length <= 0;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

