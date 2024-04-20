import React, { Component } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../Firebase';
import { Slider } from "../components/slider";
import { store, addToCart } from "../components/cart_functions";
// import MetaTags from "react-meta-tags";
import CHECK from "../assets/svg/check";

class Keyring extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      item: {},
      addCartText: "Add to Cart",
      addCartTick: 'none'
    };
  }

  fetchItems = async () => {
    let keyring = {};
    const link = window.location.pathname.replace('/store/', '');
    const q = query(collection(db, 'items'),
      where('id', '==', link));
    const snap = await getDocs(q);
    if (snap) {
      snap.forEach((doc) => {
        keyring = {
          ...doc.data()
        }
      })
    }
    this.setState({
      item: keyring
    });
  }

  addCart(name, price, image) {
    store.dispatch(addToCart(name, 1, price, image));
    this.setState({ addCartText: "Added ", addCartTick: 'inline-block' });
  }

  componentDidMount() {
    this.fetchItems()
  }

  render() {
    return (
      <section>
        <div className="product-view-container z-depth-3">
          {this.state.item?.images && this.state.item?.price ?
            <div className="container">

              {/* <MetaTags>
                <title>{this.state.item?.name} || Lil Fimo Creations</title>
                <meta
                  name="description"
                  content="Have a look here at where Fimo Creations is going to be in the coming months"
                />
              </MetaTags> */}
              <div className="row">
                <div className="col-md-6 slider-col">
                  <Slider images={this.state.item?.images} />
                </div>
                <div className="col-md-6">
                  <h2 className="h3">{this.state.item?.name}</h2>
                  <p className="inner-product-description" dangerouslySetInnerHTML={{
                    __html: this.state.item?.description
                  }}
                  />
                  <p>
                    Price: £{this.state.item?.price.toFixed(2)}
                  </p>

                  <p
                    tooltip="£2.80 delivery to United Kingdom"
                    className="plus-shipping shipping-tooltip"
                  >
                    Plus Shipping
                  </p>
                  <div className="product-bottom-btns">
                    <button
                      className="btn add-cart-btn"
                      onClick={() =>
                        this.addCart(
                          this.state.item?.name,
                          this.state.item?.price,
                          this.state.item?.images
                        )
                      }

                    >{this.state.addCartText} <CHECK display={this.state.addCartTick}></CHECK></button>
                    <Link to="/store">
                      <button className="btn btn-default product-back-btn">
                        Back
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            :
            ""
          }

        </div>
        <Link to="/store"><div className="modal-background" /></Link>
      </section>
    );
  }
}

export default Keyring;
