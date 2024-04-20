import React, { Component } from "react";
import { store, deleteFromCart } from "./cart_functions";
import SHOPPINGCART from "../assets/svg/cart";
import RUBISHBIN from "../assets/svg/rubish_bin";
// import PaypalCheckout from "./paypal_checkout";
import "../styles/view_cart.scss";


class ViewCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      showCart: "",
      showCartOverlay: ""
    };
  }
  componentDidMount() {
    store.subscribe(() => {
      let viewCart = store.getState();
      this.setState({
        items: viewCart.shoppingCart.cart
      });
    });
  }


  deleteProduct(name) {
    store.dispatch(deleteFromCart(name));
  }

  toggle() {
    this.setState(
      this.state.showCart === "view-cart-box-show"
        ? {
          showCart: "",
          showCartOverlay: ""
        }
        : {
          showCart: "view-cart-box-show",
          showCartOverlay: "show-cart-overlay"
        }
    );
  }

  hideCart = () => {
    this.setState({ showCart: "", showCartOverlay: "" })
  }

  cartTotal() {
    this.total = this.state.items
      .reduce((a, b) => a + b.price * b.quantity, 0)
      .toFixed(2);
    return parseFloat(this.total);
  }

  addOne(name, quantity) {
    this.state.items.map((item) => {
      if (item.product === name) {
        item.quantity = quantity + 1;
        this.forceUpdate();
      }
    });
  }

  removeOne(name, quantity) {
    if (quantity - 1 < 1) {
      this.deleteProduct(name);
      if (this.state.items.length < 2) {
        this.hideCart()
      }
    }
    this.state.items.map((item) => {
      if (item.product === name) {
        item.quantity = quantity - 1;
        this.forceUpdate();
      }
    });
  }

  render() {
    return (
      <section>
        {this.state.items.length > 0 && <div
          className="view-cart-btn"
          id="view-cart-btn"
          onClick={this.toggle.bind(this)}
        >
          <SHOPPINGCART />
          <div id="cart-length-wrapper">{this.state.items.length}</div>
        </div>}
        <div className={`view-cart-box z-depth-2 ${this.state.showCart}`}>
          <div className="container">
            <button
              type="button"
              className="close"
              onClick={this.toggle.bind(this)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="clearfix">&nbsp;</div>
            {this.state.items.map((item, index) => (
              <div key={index}>
                <div className="clearfix">&nbsp;</div>
                <div className="row">
                  <div className="col-4">
                    <img src={item.images[0]} alt={item.name} className="img-fluid" />
                  </div>
                  <div className="col-8">
                    <div>
                      <span className="view-cart-product">{item.product}</span>
                      <br />
                      <button
                        className="btn btn-default quantity-btn"
                        onClick={() =>
                          this.removeOne(item.product, item.quantity)
                        }
                      >
                        -
                      </button>
                      &nbsp;&nbsp;
                      <span className="view-cart-quantity">
                        {item.quantity}
                      </span>
                      &nbsp;&nbsp;
                      <button
                        className="btn btn-default quantity-btn"
                        onClick={() => this.addOne(item.product, item.quantity)}
                      >
                        +
                      </button>
                      <br />
                      <span className="view-cart-product">
                        £{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <button
                      className="btn btn-info view-cart-delete"
                      onClick={() => this.deleteProduct(item.product)}
                    >
                      <RUBISHBIN />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="view-cart-total">
              <div className="clearfix">&nbsp;</div>
              <p>Total: £{this.cartTotal().toFixed(2)}</p>
              <div className="paypal-btn">
                {/* <PaypalCheckout items={this.state.items} total={this.cartTotal()}></PaypalCheckout> */}

              </div>
            </div>
          </div>
        </div>
        <div id="cart-overlay" className={this.state.showCartOverlay} onClick={this.hideCart.bind(this)}></div>
      </section>
    );
  }
}

export default ViewCart;