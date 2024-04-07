import React, { Component, useState } from "react";
// import MetaTags from "react-meta-tags";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../Firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../styles/store.scss";
import MagGlass from "../assets/svg/mag_glass";


function scrollTop() {
  window.scrollTo(0, 0);
}



class Store extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      items: [],
      visible: 6,
      error: false,
      searchItem: "",
      type: "keyring"
    };
    this.loadMore = this.loadMore.bind(this);
  }

  fetchItems = async () => {
    let keyrings = [];
    const q = query(collection(db, 'items'));
    const snap = await getDocs(q);
    if (snap) {
      snap.forEach((doc) => {
        keyrings.push({
          ...doc.data()
        })
      })
    }
    this.setState({
      items: keyrings
    });
  }

  componentDidMount() {
    this.fetchItems()
  }

  searchStore(event) {
    let keyword = event.target.value;
    if (keyword.length > 2 || keyword.length == 0) this.setState({ searchItem: keyword.toLowerCase() });
  }

  loadMore() {
    this.setState(prev => {
      return { visible: prev.visible + 6 };
    });
  }

  changeCategory(category) {
    this.setState({ type: category });
  }

  handleImageLoaded(image) {
    image.target.closest(".product-card-container").style.opacity = 1;
  }

  render() {
    return (
      <div className="container ">
        {/* <MetaTags>
          <title>Store || Lil Fimo Creations</title>
          <meta
            name="description"
            content="Browse through all the Lil Fimo Creations."
          />
        </MetaTags> */}
        <nav id="store-nav">
          <div
            className="nav-category"
            id="category-keyring"
            onClick={e => this.changeCategory("keyring")}
          >
            KEYRINGS
          </div>
          <div
            className="nav-category"
            id="category-necklace"
            onClick={e => this.changeCategory("necklace")}
          >
            NECKLACES
          </div>
          <br />
          <br />
          <div className="nav-category"><MagGlass></MagGlass> SEARCH:</div>
          <input
            className="form-group"
            id="searchStore"
            onChange={this.searchStore.bind(this)}
          />
        </nav>

        <div className="row" id="product-container">
          {this.state.items
            .filter(item => item.type === this.state.type)
            .filter(item =>
              item.name.toLowerCase().includes(this.state.searchItem)
            )
            .slice(0, this.state.visible)
            .map((item, index) => {
              return (
                <div key={index} className="col-sm-6 col-md-4 product-card-container">
                  <div className="card product-card z-depth-3">
                    <Link className="thumbnail" to={`/store/${item.id}`}>
                      <img
                        onClick={scrollTop}
                        src={item.images[0]}
                        alt="{item.name}"
                        className="img-fluid"
                        onLoad={this.handleImageLoaded.bind(this)}
                      />
                    </Link>
                    <div className="card-text">
                      <h2 className="product-title h4">{item.name}</h2>
                      <p>£{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {this.state.visible < this.state.items.length && (
          <button
            onClick={this.loadMore}
            type="button"
            className="btn btn-info load-more mx-auto d-block"
          >
            Load more
          </button>
        )}
      </div>
    );
  }
}

export default Store;
